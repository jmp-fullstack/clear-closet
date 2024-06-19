import requests

# signup
# url = 'http://127.0.0.1:8000/api/accounts/signup/'
# data = {
#     "user_id": "test6",
#     "password": "password",
#     "nickname": "test6",
#     "email": "test6@example.com",
#     "phone_number": "test6",
#     "profile_image": None
# }

# response = requests.post(url, json=data)

# print(response.status_code)

# --------------------------------------------------------------------

# login
url = 'http://127.0.0.1:8000/api/accounts/login/'
data = {
    "user_id": "test6",
    "password": "password"
}

headers = {"Content-Type": "application/json"}

response = requests.post(url, json=data, headers=headers)

print(response.status_code)
print(response.json())