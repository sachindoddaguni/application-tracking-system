from flask import jsonify, request, send_file
from flask_cors import cross_origin
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import json
from datetime import datetime, timedelta
import hashlib
import uuid
from backend.run import app
from backend.app.models import Users
from backend.app.middleware import MiddleWare
from backend.app.models import get_new_user_id, get_new_application_id


@app.route("/")
@cross_origin()
def health_check():
    return jsonify({"message": "Server up and running"}), 200


@app.route("/users/signup", methods=["POST"])
def sign_up():
    """
    Creates a new user profile and adds the user to the database and returns the message

    :return: JSON object
    """
    try:
        # print(request.data)
        data = json.loads(request.data)
        print(data)
        try:
            _ = data["username"]
            _ = data["password"]
            _ = data["fullName"]
        except:
            return jsonify({"error": "Missing fields in input"}), 400

        username_exists = Users.objects(username=data["username"])
        if len(username_exists) != 0:
            return jsonify({"error": "Username already exists"}), 400
        password = data["password"]
        password_hash = hashlib.md5(password.encode())
        user = Users(
            id=get_new_user_id(),
            fullName=data["fullName"],
            username=data["username"],
            password=password_hash.hexdigest(),
            authTokens=[],
            applications=[],
        )
        user.save()
        return jsonify(user.to_json()), 200
    except:
        return jsonify({"error": "Internal server error"}), 500


@app.route("/users/login", methods=["POST"])
def login():
    """
    Logs in the user and creates a new authorization token and stores in the database

    :return: JSON object with status and message
    """
    try:
        try:
            data = json.loads(request.data)
            _ = data["username"]
            _ = data["password"]
        except:
            return jsonify({"error": "Username or password missing"}), 400
        password_hash = hashlib.md5(data["password"].encode()).hexdigest()
        user = Users.objects(
            username=data["username"], password=password_hash
        ).first()
        if user is None:
            return jsonify({"error": "Wrong username or password"})
        token = str(user["id"]) + "." + str(uuid.uuid4())
        expiry = datetime.now() + timedelta(days=1)
        expiry_str = expiry.strftime("%m/%d/%Y, %H:%M:%S")
        auth_tokens_new = user["authTokens"] + [
            {"token": token, "expiry": expiry_str}
        ]
        user.update(authTokens=auth_tokens_new)
        return jsonify({"token": token, "expiry": expiry_str})
    except:
        return jsonify({"error": "Internal server error"}), 500


@app.route("/users/logout", methods=["POST"])
def logout():
    """
    Logs out the user and deletes the existing token from the database

    :return: JSON object with status and message
    """
    try:
        userid = MiddleWare.get_userid_from_header()
        user = Users.objects(id=userid).first()
        auth_tokens = []
        incoming_token = MiddleWare.get_token_from_header()
        for token in user["authTokens"]:
            if token["token"] != incoming_token:
                auth_tokens.append(token)
        user.update(authTokens=auth_tokens)

        return jsonify({"success": ""}), 200

    except:
        return jsonify({"error": "Internal server error"}), 500


# search function
# params:
#   -keywords: string
@app.route("/search")
def search():
    """
    Searches the web and returns the job postings for the given search filters

    :return: JSON object with job results
    """
    keywords = (
        request.args.get("keywords")
        if request.args.get("keywords")
        else "random_test_keyword"
    )
    salary = request.args.get("salary") if request.args.get("salary") else ""
    keywords = keywords.replace(" ", "+")
    if keywords == "random_test_keyword":
        return json.dumps({"label": str("successful test search")})
    # create a url for a crawler to fetch job information
    if salary:
        url = (
                "https://www.google.com/search?q="
                + keywords
                + "%20salary%20"
                + salary
                + "&ibp=htl;jobs"
        )
    else:
        url = "https://www.google.com/search?q=" + keywords + "&ibp=htl;jobs"

    # webdriver can run the javascript and then render the page first.
    # This prevent websites don't provide Server-side rendering
    # leading to crawlers cannot fetch the page
    chrome_options = Options()
    # chrome_options.add_argument("--no-sandbox") # linux only
    chrome_options.add_argument("--headless")
    user_agent = (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/71.0.3578.98 Safari/537.36 "
    )
    chrome_options.add_argument(f"user-agent={user_agent}")
    driver = webdriver.Chrome(
        ChromeDriverManager().install(), chrome_options=chrome_options
    )
    driver.get(url)
    content = driver.page_source
    driver.close()
    soup = BeautifulSoup(content)

    # parsing searching results to DataFrame and return
    df = pd.DataFrame(columns=["jobTitle", "companyName", "location"])
    mydivs = soup.find_all("div", {"class": "PwjeAc"})
    for i, div in enumerate(mydivs):
        df.at[i, "jobTitle"] = div.find("div", {"class": "BjJfJf PUpOsf"}).text
        df.at[i, "companyName"] = div.find("div", {"class": "vNEEBe"}).text
        df.at[i, "location"] = div.find("div", {"class": "Qk80Jf"}).text
        df.at[i, "date"] = div.find_all("span", class_="SuWscb", limit=1)[0].text
    return jsonify(df.to_dict("records"))


# get data from the CSV file for rendering root page
@app.route("/applications", methods=["GET"])
def get_data():
    """
    Gets user's applications data from the database

    :return: JSON object with application data
    """
    try:
        userid = MiddleWare.get_userid_from_header()
        user = Users.objects(id=userid).first()
        applications = user["applications"]
        return jsonify(applications)
    except:
        return jsonify({"error": "Internal server error"}), 500


@app.route("/applications", methods=["POST"])
def add_application():
    """
    Add a new job application for the user

    :return: JSON object with status and message
    """
    try:
        userid = MiddleWare.get_userid_from_header()
        try:
            request_data = json.loads(request.data)["application"]
            _ = request_data["jobTitle"]
            _ = request_data["companyName"]
        except:
            return jsonify({"error": "Missing fields in input"}), 400

        user = Users.objects(id=userid).first()
        current_application = {
            "id": get_new_application_id(userid),
            "jobTitle": request_data["jobTitle"],
            "companyName": request_data["companyName"],
            "date": request_data.get("date"),
            "jobLink": request_data.get("jobLink"),
            "location": request_data.get("location"),
            "status": request_data.get("status", "1"),
        }
        applications = user["applications"] + [current_application]

        user.update(applications=applications)
        return jsonify(current_application), 200
    except:
        return jsonify({"error": "Internal server error"}), 500


@app.route("/applications/<int:application_id>", methods=["PUT"])
def update_application(application_id):
    """
    Updates the existing job application for the user

    :param application_id: Application id to be modified
    :return: JSON object with status and message
    """
    try:
        userid = MiddleWare.get_userid_from_header()
        try:
            request_data = json.loads(request.data)["application"]
        except:
            return jsonify({"error": "No fields found in input"}), 400

        user = Users.objects(id=userid).first()
        current_applications = user["applications"]

        if len(current_applications) == 0:
            return jsonify({"error": "No applications found"}), 400
        else:
            updated_applications = []
            app_to_update = None
            application_updated_flag = False
            for application in current_applications:
                if application["id"] == application_id:
                    app_to_update = application
                    application_updated_flag = True
                    for key, value in request_data.items():
                        application[key] = value
                updated_applications += [application]
            if not application_updated_flag:
                return jsonify({"error": "Application not found"}), 400
            user.update(applications=updated_applications)

        return jsonify(app_to_update), 200
    except:
        return jsonify({"error": "Internal server error"}), 500


@app.route("/applications/<int:application_id>", methods=["DELETE"])
def delete_application(application_id):
    """
    Deletes the given job application for the user

    :param application_id: Application id to be modified
    :return: JSON object with status and message
    """
    try:
        userid = MiddleWare.get_userid_from_header()
        user = Users.objects(id=userid).first()

        current_applications = user["applications"]

        application_deleted_flag = False
        updated_applications = []
        app_to_delete = None
        for application in current_applications:
            if application["id"] != application_id:
                updated_applications += [application]
            else:
                app_to_delete = application
                application_deleted_flag = True

        if not application_deleted_flag:
            return jsonify({"error": "Application not found"}), 400
        user.update(applications=updated_applications)
        return jsonify(app_to_delete), 200
    except:
        return jsonify({"error": "Internal server error"}), 500


@app.route("/resume", methods=["POST"])
def upload_resume():
    """
    Uploads resume file or updates an existing resume for the user

    :return: JSON object with status and message
    """
    try:
        userid = MiddleWare.get_userid_from_header()
        try:
            file = request.files["file"].read()
        except:
            return jsonify({"error": "No resume file found in the input"}), 400

        user = Users.objects(id=userid).first()
        if not user.resume.read():
            # There is no file
            user.resume.put(file)
            user.save()
            return jsonify({"message": "resume successfully uploaded"}), 200
        else:
            # There is a file, we are replacing it
            user.resume.replace(file)
            user.save()
            return jsonify({"message": "resume successfully replaced"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500


@app.route("/resume", methods=["GET"])
def get_resume():
    """
    Retrieves the resume file for the user

    :return: response with file
    """
    try:
        userid = MiddleWare.get_userid_from_header()
        try:
            user = Users.objects(id=userid).first()
            if len(user.resume.read()) == 0:
                raise FileNotFoundError
            else:
                user.resume.seek(0)
        except:
            return jsonify({"error": "resume could not be found"}), 400

        response = send_file(
            user.resume,
            mimetype="application/pdf",
            attachment_filename="resume.pdf",
            as_attachment=True,
        )
        response.headers["x-filename"] = "resume.pdf"
        response.headers["Access-Control-Expose-Headers"] = "x-filename"
        return response, 200
    except:
        return jsonify({"error": "Internal server error"}), 500
