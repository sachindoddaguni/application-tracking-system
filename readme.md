https://user-images.githubusercontent.com/89501363/144725439-5d9191f8-df13-4814-aa15-99cd752ab0cc.mp4

[![GitHub license](https://img.shields.io/github/license/kingan1/application-tracking-system)](https://github.com/kingan1/application-tracking-system/blob/main/LICENSE)
[![DOI](https://zenodo.org/badge/705451434.svg)](https://zenodo.org/doi/10.5281/zenodo.10023570)
[![codecov](https://codecov.io/gh/kingan1/application-tracking-system/branch/main/graph/badge.svg)](https://codecov.io/gh/kingan1/application-tracking-system)
![GitHub issues](https://img.shields.io/github/issues/kingan1/application-tracking-system)
![GitHub issues](https://img.shields.io/github/issues-closed/kingan1/application-tracking-system)
![GitHub top language](https://img.shields.io/github/languages/top/kingan1/application-tracking-system)

[![Build and Deploy Frontend](https://github.com/kingan1/application-tracking-system/actions/workflows/frontend_CI_CD.yml/badge.svg)](https://github.com/kingan1/application-tracking-system/actions/workflows/frontend_CI_CD.yml)
[![Super Linter](https://github.com/kingan1/application-tracking-system/actions/workflows/super-linter.yml/badge.svg)](https://github.com/kingan1/application-tracking-system/actions/workflows/super-linter.yml)

#      J-Tracker 2.0 - Your Job Tracking Assistant

https://github.com/sachindoddaguni/application-tracking-system/assets/28365724/05c9b3a1-2487-4249-b160-7eeb24a1ec81

The process of applying for jobs and internships is not a cakewalk. Managing job applications is a time-consuming process. Due to the referrals and deadlines, the entire procedure can be stressful. Our application allows you to track and manage your job application process, as well as regulate it, without the use of cumbersome Excel spreadsheets.


Our application keeps track of the jobs you've added to your wish list. It also keeps track of the companies you've already applied to and keeps a list of any rejections. Rather than having the user browse each company's site for potential prospects, our application allows the applicant to search for them directly using basic keywords. Any prospective work offers can then be added to the applicant's wishlist.


## Table of contents

- [Basic Design](#basic-design)
- [Demo](#demo)
- [Improvements](#improvements)
    + [Resume Builder](#resume-builder)
    + [Dockerization](#dockerization)
    + [Email Notification for Job Application Deadlines](#Email-Notification-for-Job-Application-Deadlines)
- [Roadmap](#roadmap)
- [Successful Usecase](#successful-usecase)
- [Future Scope](#future-scope)
- [Explanation](#explanation)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
    + [Requirements](#requirements)
    + [Strongly Recommended](#strongly-recommended)
- [Troubleshooting](#Troubleshooting)
- [Getting Started](#getting-started)
    + [Boot](#boot)
    + [Shutdown](#shutdown)
- [Hosting the Database](#hosting-the-database)
    + [Local MongoDB](#local-mongodb)
    + [Hosted database with MongoDB Atlas](#hosted-database-with-mongodb-atlas)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Team Members](#team-members)



## Basic Design:
![Basic Design](https://github.com/prithvish-doshi-17/application-tracking-system/blob/main/resources/Overall%20Design.PNG)

## Samples:

### Login Page / Signup Page

The introductory visual interface displayed from which a user is able to register and log into the application.

<p align="center"><img width="700" src="./resources/login.png"></p>


### HomeScreen

The introductory visual interface displayed from which a user is able to access different cards - Waitlisted applications, Waiting for Refereals, Applied Jobs, Application Status.The user can also add cards through this screen.

<p align="center"><img width="700" src="./resources/home_screen.png"></p>


### SearchPage

The interface through which a user is able to search for specific jobs and add them to Waitlisted Applications.

1. Navigate to Job search page, search for particular Job.
2. Click on Add button. Fill in the Details.
3. Click on Create buttop.
4. The application will then be saved as per the selected category.

<p align="center"><img width="700" src="./resources/search.png"></p>
<p align="center"><img width="700" src="./resources/newjobdetails1.PNG"></p>


### SearchPage with Salary filter

The interface through which a user is able to search for specific jobs based on the salary range selected.

1. Navigate to Job search page, search for particular Job and select the salary range from the dropdown.
2. Click on Search button.

<p align="center"><img width="700" src="./resources/salaryfilter1.png"></p>

### ResumePage

1. Navigate to resume Section
2. Upload any resume file with .PDF extension by selecting the file from local storage. Click Upload.
3. Click on download button to Download the uploaded file.

<p align="center"><img width="700" src="./resources/resume.png"></p>

## Improvements

### Resume Builder

Introducing a powerful new feature! Users can now create a stunning and ATS-friendly resume with minimal effort. The Automatic Resume Builder simplifies the process by providing a user-friendly form for basic information input. The best part? Your resume is generated as an editable Word document, offering full customization to suit your preferences and style.

Key Features:
- **Effortless Data Entry**: Quickly provide your basic information, education, skills, and more.
- **ATS-Friendly**: Ensure compatibility with modern hiring systems.
- **Customization**: Tailor your resume to your preferences.
- **Time-Saving**: Automate the formatting and editing process.

![image](https://github.com/sachindoddaguni/application-tracking-system/assets/28365724/9849abd8-6636-4a18-a63e-ee18b5f223bd)



### Dockerization

We are thrilled to introduce a powerful new feature to JTracker 2.0 – Dockerization! This enhancement brings a multitude of advantages, making your experience with JTracker even better.

#### Why Dockerize JTracker 2.0?

- **Simplified Setup**: With JTracker Dockerized, you no longer need to spend time configuring and installing various dependencies. It's as simple as running a single command.
- **Consistent Environment**: Docker ensures that JTracker runs consistently across different systems. Say goodbye to the "It works on my machine" problem. Now, your application will work seamlessly for everyone.
- **Easy Deployment**: Sharing your tool with others becomes effortless. Docker containers can be distributed and executed on any platform with Docker support, making collaboration and deployment hassle-free.
- **Version Control**: Docker allows you to version your JTracker 2.0 containers. This means you can easily switch between different versions or update to the latest release without compatibility concerns.
- **Isolation**: Docker containers provide isolation, keeping your tool and its dependencies separate from the host system. This enhances security and minimizes conflicts with other applications.
- **Scalability**: Docker makes it easy to scale JTracker based on your needs. You can manage multiple containers and even orchestrate them for complex applications using tools like Docker Compose or Kubernetes.
- **Dependency Management**: All JTracker 2.0 dependencies are defined in code within the Docker container. You won't have to worry about the hassle of managing dependencies on your local system anymore.
- **Faster Development**: The docker compose file has defined profiles for ui and api development. This simplifies the process to setup environment required for local development.

### Email Notification for Job Application Deadlines

We are excited to introduce a game-changing enhancement to J-Tracker 2.0 - the Email Notification feature! Keeping track of upcoming job application deadlines is now more effortless than ever.

#### How It Works 
- Set your job application deadlines within the application.
- J-Tracker 2.0 will automatically send you email notifications as your application deadlines approach.
- Stay organized and never miss an important application deadline again.

#### Benefits
- **Efficiency:** Receive timely reminders, allowing you to prepare and submit your applications promptly.
- **Reduced Stress:** No more worrying about missed deadlines or last-minute rushes.
- **Enhanced Productivity:** Focus on your job search while J-Tracker 2.0 handles the scheduling.

This new feature is designed to streamline your job application process further, making J-Tracker 2.0 your ultimate Job Tracking Assistant. With email notifications for upcoming job application deadlines, you can confidently manage your job search and secure your dream job.

#### Version 1.1

- Add headless feature for selenium
- Fix shutdown.sh
- Login frontend
- Add resume storage for users
- Updated reloading issues
- Fix linting issues

#### Version 1.0.3

- Updated badges for repository
- Users database implementation
- Add logout endpoint and update middleware
- Implementing search based on salary functionality
- Login frontend for login and signup functionality
- Search custom date



## Roadmap:
![Roadmap](https://github.com/prithvish-doshi-17/application-tracking-system/blob/main/resources/Roadmap%20-%202.PNG)

## Successful Usecases

### Case Study 1: Improving Job Search Efficiency with J-Tracker 2.0

**Background:**
Aditya, a recent college graduate from NCSU, had been struggling with his job search. He was applying to numerous positions across different companies, but it was challenging to keep track of each application's status and deadlines. He often missed application deadlines and forgot which companies he had applied to.

**The Problem:**
Aditya was becoming frustrated and stressed due to the chaotic job application process. He needed a way to streamline his job search and stay organized.

**The Solution:**
Aditya started using J-Tracker 2.0 to manage his job applications. He added all the jobs he was interested in to his wishlist, tracked their status, and set application deadlines. The Email Notification feature kept him informed about approaching deadlines, ensuring he never missed an important application date.

**The Outcome:**
With J-Tracker 2.0, Aditya regained control over his job search. He received timely reminders of application deadlines and improved his overall efficiency. Within a few weeks, he secured an interview with a company he had been targeting for a while, and the company was impressed with his organized approach. Ultimately, he got the job and credited J-Tracker 2.0 for helping him achieve his goal.

### Case Study 2: Seamless Collaboration in a University Job Fair

**Background:**
The career services department at NCSU was organizing a large job fair with participation from multiple companies. Managing the fair's logistics and helping students connect with potential employers was a complex task.

**The Problem:**
Coordinating the event, scheduling interviews, and keeping track of student applications was a logistical challenge. They needed a solution to streamline the job fair operations.

**The Solution:**
The career services department at NCSU decided to use J-Tracker 2.0 to manage the job fair. They created profiles for each participating company and added job opportunities. Students could easily browse and add these opportunities to their wishlists, track their application status, and set reminders for interviews.

**The Outcome:**
J-Tracker 2.0 simplified the job fair coordination. Companies could see how many students were interested in their positions, and students had a clear overview of their job applications. This led to better communication between students and employers. As a result, more students secured internships and job offers during the job fair, and companies found the event well-organized and efficient. J-Tracker 2.0 played a crucial role in fostering a successful and collaborative job fair experience for all participants.

## Future Scope: 
* Include deadline reminders for the application and interview.
* Add a feature that allows users to attach these reminders to their Google calendar.
* Incorporate notifications for upcoming deadlines. 
* Add a storage option for resumes and cover letters so they can be saved for future use.
* Include a direct link to the company's application site when the wishlist item is clicked.
* Include a link to the university’s career fair page. 
* Direct connection to Linkedin, allowing for the addition of job opportunities to the wishlist.
* Improve keyword search to improve specifications such as pay range, employment location, and so on.
* An option to maintain separate profiles for job tracking.


## Explanation:

Currently, we have four fundamental steps in our project:


1. The position for which you have applied
2. The job you want to apply for, without a referral
3. The job at which you have faced rejection, and
4. The job you're waiting for a referral.


Any details in any table can be modified at any time during the process.

## Technologies Used:

* Python
* Node.Js
* Flask
* MongoDB

## Installation:
### Requirements:
* [Python](https://www.python.org/downloads/) (recommended >= 3.8)
* [pip](https://pip.pypa.io/en/stable/installation/) (Latest version 21.3 used as of 11/3)
* [npm](https://nodejs.org/en/) (Latest version 6.14.4 used as of 11/3)
### Strongly Recommended:
* A terminal environment capable of handling bash scripts.

To install all required packages, while within the context of project root directory, run:
```
./setup.sh
```
This will handle all npm and pip package installations required for both the front and backend.

*If the script says "command not found" or something similar, run chmod +x ./setup.sh. This grants the script execution privileges. Depending on your setup, this may occur for the boot_dockerless files, amongst others. The same command will fix the issue.*

## Troubleshooting

If you encounter issues while using J-Tracker 2.0, here are some common problems and their solutions:

### Problem 1: Unable to Start the Application

**Symptoms:** The application doesn't start, or you encounter an error when trying to run it.

**Solution:**
1. Ensure you have met the installation requirements mentioned in the README.
2. Double-check that you have the required versions of Python and npm installed.
3. Make sure you have executed the setup script using `./setup.sh` to install necessary packages.
4. Check for any error messages in the console output and address them accordingly.

### Problem 2: Database Connection Issue

**Symptoms:** The application fails to connect to the database, whether local or hosted on MongoDB Atlas.

**Solution:**
1. Verify that you have followed the instructions for hosting the database correctly, depending on whether you're using a local MongoDB or MongoDB Atlas.
2. Double-check the connection string in your `app.py` file and ensure it's correct.
3. If you're using MongoDB Atlas, ensure that you've created an `application.yml` file with the correct credentials.
4. If you're experiencing issues with repository secrets for CI, make sure they are correctly added in the repository settings.

### Problem 3: Dockerization Issues

**Symptoms:** Problems with Dockerizing the application.

**Solution:**
1. Ensure you have Docker installed and running.
2. Check the Docker setup instructions in the README and follow them carefully.
3. If you encounter issues with containerization, check for any specific error messages and research them or seek help from the project's community.

### Problem 4: Email Notifications Not Working

**Symptoms:** You're not receiving email notifications for job application deadlines.

**Solution:**
1. Make sure you've set your job application deadlines within the application.
2. Confirm that your email notification settings are correctly configured.
3. Check your spam folder for any misplaced notifications.
4. If you're still facing issues, refer to the project's documentation for the email notification feature or seek help from the project's community.

## Getting Started:
### Boot:
To run a testing environment, run:
```
./startup.sh
```
This will run flask and npm simultaneously, booting both the front and backend. Note - npm takes substantially longer to boot compared to flask.
### Shutdown:
To ensure that flask is no longer occupying a port, run:
```
./shutdown.sh
```
This will search for any active process containing "flask" and kill the process.

## Hosting the Database:
### Local MongoDB:
1. Download [MongoDB Community Server](https://docs.mongodb.com/manual/administration/install-community/)
2. Follow the [Installion Guide](https://docs.mongodb.com/guides/server/install/)
3. In  ```app.py```  set  ```'host'```  string to  ```'localhost'```
4. Run the local database: 
``` 
mongod 
```
* Recommended: Use a GUI such as [Studio 3T](https://studio3t.com/download/) to more easily interact with the database


### Hosted database with MongoDB Atlas:
1. [Create account](https://account.mongodb.com/account/register) for MongoDB
 
** ___If current MongoDB Atlas owner adds your username/password to the cluster, skip to step 4___ **

2. Follow MongoDB Atlas [Setup Guide](https://docs.atlas.mongodb.com/getting-started/) to create a database collection for hosting applications
3. In  ```app.py```  set  ```'host'```  string to your MongoDB Atlas connection string
4. Create an  ```application.yml```  file in the /backend directory with the specifications:
```
username: <MongoDB Atlas cluster username>
password: <MongoDB Atlas cluster password>
```
5. For testing through CI to function as expected, repository secrets will need to be added through the settings. Create individual secrets with the following keys/values:
```
MONGO_USER: <MongoDB Atlas cluster username>
MONGO_PASS: <MongoDB Atlas cluster password>
```
## License
The project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license. 


## How to Contribute?
Please see our CONTRIBUTING.md for instructions on how to contribute to the repository and assist us in improving the project.

## Have Questions or Need Assistance?

If you have any questions, need help, or want to provide feedback about the J-Tracker 2.0, feel free to contact us at aditya.a.chitlangia@gmail.com. We're here to assist you and make your resume creation experience as smooth as possible.

Your inquiries and suggestions are always welcome!

## Team Members
- Amogh Mahesh
- Aditya Chitlangia
- Abhishek Arun Sheth
- Sachin Rudrappa Doddaguni

