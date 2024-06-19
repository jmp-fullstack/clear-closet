import requests

# signup
url = 'http://127.0.0.1:8000/api/accounts/signup/'
data = {
    "username": "test1",
    "password": "password",
    "nickname": "test1",
    "email": "test1@example.com",
    "phone_number": "test1",
    "profile_image": None
}

response = requests.post(url, json=data)

print(response.status_code)

# --------------------------------------------------------------------

# login
url = 'http://127.0.0.1:8000/api/accounts/login/'
data = {
    "username": "test1",
    "password": "password"
}

headers = {"Content-Type": "application/json"}

response = requests.post(url, json=data, headers=headers)

print(response.status_code)
print(response.json())