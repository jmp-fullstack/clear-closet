import requests

# 로그인
login_url = 'http://15.165.147.231/api/accounts/login/'
data = {
    'email': 'test1@ejuhh3.io',
    'password': '1234512345'
}
res = requests.post(login_url, data=data)
print(res.status_code)
ac_token = res.json()['access']


# 파일 (최대 5개까지만 가능함.)
upload_url = "http://15.165.147.231/api/images/upload/product/"
headers = {
    'Authorization': f'Bearer {ac_token}',
}
file_path1 = 'image/image1.jpg'
file_path2 = 'image/image2.jpg'
files = [
    ('images', open(file_path1, 'rb')),
    ('images', open(file_path2, 'rb'))
]
response = requests.post(upload_url, headers=headers, files=files)

if response.status_code != 201:
    print(response.status_code)
    print(response.json())
    raise Exception("Image upload failed")

url = "http://15.165.147.231/api/articles/"
headers = {
    'Authorization': f'Bearer {ac_token}',
}
image_urls = [img['image_url'] for img in response.json()['uploaded_images']]



# 게시글 생성
article_url = "http://15.165.147.231/api/articles/"
for i in range(100):
    data = {
        "title": f"테스트{i}번",
        "content": f"테스트{i}번",
        "product": {
            "option": {"size":"M", "color":"블랙"},
            "category": {"top_category":"상의","bottom_category":"맨투맨"},
            "price": i*500,
            "product_type": 1,
            'product_status': '새상품',
            "image_urls": image_urls  # image_urls를 product 안에 포함
        }
    }
    response = requests.post(article_url, headers=headers, json=data)
    print(response.status_code)
    print(response.json())