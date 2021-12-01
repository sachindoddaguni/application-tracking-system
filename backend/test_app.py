import hashlib

import pytest
import json
import datetime
from flask_mongoengine import MongoEngine
import yaml
from app import create_app, Users, get_new_user_id

# Pytest fixtures are useful tools for calling resources
# over and over, without having to manually recreate them,
# eliminating the possibility of carry-over from previous tests,
# unless defined as such.
# This fixture receives the client returned from create_app
# in app.py
@pytest.fixture
def client():
    app = create_app()
    with open('application.yml') as f:
        info = yaml.load(f, Loader=yaml.FullLoader)
        username = info['username']
        password = info['password']
        app.config['MONGODB_SETTINGS'] = {
            'db': 'appTracker',
            'host': f'mongodb+srv://{username}:{password}@applicationtracker.287am.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        }
    db = MongoEngine()
    db.disconnect()
    db.init_app(app)
    client = app.test_client()
    yield client
    db.disconnect()


@pytest.fixture
def user(client):
    # print(request.data)
    data = {'username': 'testUser', 'password': 'test', 'fullName': 'fullName'}

    user = Users.objects(username=data['username'])
    user.first()['applications'] = []
    user.first().save()
    rv = client.post('/users/login', json=data)
    jdata = json.loads(rv.data.decode("utf-8"))
    header = {'Authorization': 'Bearer ' + jdata['token']}
    yield user.first(), header
    user.first()['applications'] = []
    user.first().save()


# 1. testing if the flask app is running properly
def test_alive(client):
    rv = client.get('/')
    assert rv.data.decode("utf-8") == '{"message":"Server up and running"}\n'


# 2. testing if the search function running properly
def test_search(client):
    rv = client.get('/search')
    jdata = json.loads(rv.data.decode("utf-8"))["label"]
    assert jdata == 'successful test search'


# 3. testing if the application is getting data from database properly
def test_get_data(client, user):
    user, header = user
    user['applications'] = []
    user.save()
    # without an application
    rv = client.get('/applications', headers=header)
    print(rv.data)
    assert rv.status_code == 200
    assert json.loads(rv.data) == []

    # with data
    application = {'jobTitle': 'fakeJob12345', 'companyName': 'fakeCompany', 'date': str(datetime.date(2021, 9, 23)),
                   'status': '1'}
    user['applications'] = [application]
    user.save()
    rv = client.get('/applications', headers=header)
    print(rv.data)
    assert rv.status_code == 200
    assert json.loads(rv.data) == [application]


# 4. testing if the application is saving data in database properly
def test_add_application(client, mocker, user):
    mocker.patch(
        # Dataset is in slow.py, but imported to main.py
        'app.get_new_user_id',
        return_value=-1
    )
    user, header = user
    user['applications'] = []
    user.save()
    # mocker.patch(
    #     # Dataset is in slow.py, but imported to main.py
    #     'app.Users.save'
    # )
    rv = client.post('/applications', headers=header, json={'application': {
        'jobTitle': 'fakeJob12345', 'companyName': 'fakeCompany', 'date': str(datetime.date(2021, 9, 23)), 'status': '1'
    }})
    assert rv.status_code == 200
    jdata = json.loads(rv.data.decode("utf-8"))["jobTitle"]
    assert jdata == 'fakeJob12345'


# 5. testing if the application is updating data in database properly
def test_update_application(client, user):
    user, auth = user
    application = {"id": 3,'jobTitle': 'test_edit', 'companyName': 'test_edit', 'date': str(datetime.date(2021, 9, 23)),
                   'status': '1'}
    user['applications'] = [application]
    user.save()
    new_application = {'id':3, 'jobTitle':'fakeJob12345', 'companyName':'fakeCompany', 'date':str(datetime.date(2021, 9, 22))}

    rv = client.put('/applications/3', json={'application': new_application }, headers=auth)
    assert rv.status_code == 200
    jdata = json.loads(rv.data.decode("utf-8"))["jobTitle"]
    assert jdata == 'fakeJob12345'


# 6. testing if the application is deleting data in database properly
def test_delete_application(client, user):
    user, auth = user

    application = {'id': 3, 'jobTitle': 'fakeJob12345', 'companyName': 'fakeCompany', 'date': str(datetime.date(2021, 9, 23)),
                   'status': '1'}
    user['applications'] = [application]
    user.save()


    rv = client.delete('/applications/3', headers=auth)
    jdata = json.loads(rv.data.decode("utf-8"))["jobTitle"]
    assert jdata == 'fakeJob12345'


# 8. testing if the flask app is running properly with status code
def test_alive_status_code(client):
    rv = client.get('/')
    assert rv.status_code == 200

# Testing logging out does not return error
def test_logout(client, user):
    user, auth = user
    rv = client.post('/users/logout', headers=auth)
    # assert no error occured
    assert rv.status_code == 200

