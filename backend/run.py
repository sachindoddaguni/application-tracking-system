from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS
import yaml
# from backend.app import views


def create_app():
    """
    Creates a server hosted on localhost

    :return: Flask object
    """
    app = Flask(__name__)
    # make flask support CORS
    CORS(app)
    # app.register_blueprint()
    app.config["CORS_HEADERS"] = "Content-Type"

    return app


app = create_app()
with open("application.yml") as f:
    info = yaml.load(f, Loader=yaml.FullLoader)
    username = info["username"]
    password = info["password"]
    app.config["MONGODB_SETTINGS"] = {
        "db": "job_database",
        "host": "127.0.0.1",
    }
db = MongoEngine()
db.init_app(app)

import backend.app.views

if __name__ == "__main__":
    app.run(debug=False)
