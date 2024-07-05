import requests


login_url = 'http://15.165.147.231/api/accounts/login/'
data = {
    'email': 'sujeong25@ejuhh3.io',
    'password': '12345423456'
}

res = requests.post(login_url, data=data)
print(res.status_code)
ref_cookies = res.cookies
ac_token = res.json()['access']


url = "http://15.165.147.231/api/articles/"

headers = {
    'Authorization': f'Bearer {ac_token}',
}

for i in range(100):

    data = {
        "title": f"테스트{i}",
        "content": f"테스트{i}",
        "product": {
            "option": {"size":"M", "color":"블루"},
            "category": {"top_category":"하의","bottom_category":"슬랙스"},
            "price": i*500,
            "product_type": 1,
            "product_image": [f"https://example.com/image{i}.jpg", f"https://example.com/image{i}.jpg"
            ],
            'product_status': '사용감 있는 새상품'
        }
    }

    response = requests.post(url, headers=headers, json=data)
    print(response.status_code)
    response.text