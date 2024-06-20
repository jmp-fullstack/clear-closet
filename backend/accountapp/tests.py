# 회원가입 post
import requests

url = 'http://127.0.0.1:8000/api/accounts/signup/'
data = {
    'username' : 'test1',
    'password' : '12345678910', # 10자이상
    'phone_number' : '123456789',
    'nickname' : 'erfrgjgr',
    'email' : 'eiohjf@ejuhh.io', # emailfield
    "profile_image": None,
}
res = requests.post(url, data=data)

res.status_code
print(res)
