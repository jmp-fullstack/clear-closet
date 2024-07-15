import torch
from PIL import Image as Img
import cv2
import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

# 이미지 리사이즈 with cv2
def maintain_proportion_and_resize_by_cv2(image_path, size=(416, 416)):

    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"이미지를 열 수 없습니다: {image_path}")

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    original_height, original_width = image.shape[:2]

    ratio = min(size[0] / original_width, size[1] / original_height)
    new_width = int(original_width * ratio)
    new_height = int(original_height * ratio)

    resized_image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)

    new_image = np.full((size[1], size[0], 3), (255, 255, 255), dtype=np.uint8)  
    x_offset = (size[0] - new_width) // 2
    y_offset = (size[1] - new_height) // 2
    new_image[y_offset:y_offset + new_height, x_offset:x_offset + new_width] = resized_image

    return new_image



# 이미지 리사이즈 with pillow
def maintain_proportion_and_resize_by_pil(image, size=(416, 416)):

    original_width, original_height = image.size

    ratio = min(size[0] / original_width, size[1] / original_height)
    new_width = int(original_width * ratio)
    new_height = int(original_height * ratio)

    resized_image = image.resize((new_width, new_height))

    new_image = Img.new("RGB", size, (255, 255, 255))  
    x_offset = (size[0] - new_width) // 2
    y_offset = (size[1] - new_height) // 2
    new_image.paste(resized_image, (x_offset, y_offset))

    return new_image



# 사진 가운데 부분 추출 함수
def extract_center_50_percent(cropped_img):
    width, height = cropped_img.size

    new_width = width // 2
    new_height = height // 2

    center_x = width // 2
    center_y = height // 2

    left = center_x - new_width // 2
    right = center_x + new_width // 2
    top = center_y - new_height // 2
    bottom = center_y + new_height // 2

    cropped_center_img = cropped_img.crop((left, top, right, bottom))

    return cropped_center_img


# 색상 문자열 추출 함수
def get_color_name(rgb_value):
    color_ranges = {
    "어두운 빨강": ((64, 0, 0), (127, 63, 63)),
    "빨강": ((128, 0, 0), (191, 63, 63)),
    "밝은 빨강": ((192, 64, 64), (255, 127, 127)),
    "어두운 초록": ((0, 64, 0), (63, 127, 63)),
    "초록": ((0, 128, 0), (63, 191, 63)),
    "밝은 초록": ((64, 192, 64), (127, 255, 127)),
    "어두운 파랑": ((0, 0, 64), (63, 63, 127)),
    "파랑": ((0, 0, 128), (63, 63, 191)),
    "밝은 파랑": ((64, 64, 192), (127, 127, 255)),
    "어두운 노랑": ((128, 128, 0), (191, 191, 63)),
    "노랑": ((192, 192, 0), (255, 255, 63)),
    "밝은 노랑": ((255, 255, 64), (255, 255, 127)),
    "어두운 자홍": ((64, 0, 64), (127, 63, 127)),
    "자홍": ((128, 0, 128), (191, 63, 191)),
    "밝은 자홍": ((192, 64, 192), (255, 127, 255)),
    "어두운 청록": ((0, 64, 64), (63, 127, 127)),
    "청록": ((0, 128, 128), (63, 191, 191)),
    "밝은 청록": ((64, 192, 192), (127, 255, 255)),
    "어두운 주황": ((128, 64, 0), (191, 127, 63)),
    "주황": ((192, 96, 0), (255, 159, 63)),
    "밝은 주황": ((255, 160, 64), (255, 191, 127)),
    "어두운 보라": ((64, 0, 64), (127, 63, 127)),
    "보라": ((96, 0, 96), (159, 63, 159)),
    "밝은 보라": ((160, 64, 160), (191, 127, 191)),
    "어두운 분홍": ((128, 0, 64), (191, 63, 127)),
    "분홍": ((192, 64, 96), (255, 127, 159)),
    "밝은 분홍": ((255, 128, 192), (255, 191, 255)),
    "어두운 라임": ((0, 128, 0), (63, 191, 63)),
    "라임": ((64, 255, 64), (127, 255, 127)),
    "밝은 라임": ((192, 255, 192), (191, 255, 191)),
    "어두운 갈색": ((64, 32, 0), (127, 63, 31)),
    "갈색": ((96, 48, 0), (159, 79, 47)),
    "밝은 갈색": ((160, 80, 64), (191, 127, 95)),
    "어두운 회색": ((64, 64, 64), (127, 127, 127)),
    "회색": ((128, 128, 128), (191, 191, 191)),
    "밝은 회색": ((192, 192, 192), (223, 223, 223)),
    "검정": ((0, 0, 0), (63, 63, 63)),
    "흰색": ((224, 224, 224), (255, 255, 255))
    }

    for color_name, (lower_bound, upper_bound) in color_ranges.items():
        if all(lower_bound[i] <= rgb_value[i] <= upper_bound[i] for i in range(3)):
            return color_name
    return "UNKNOWN"


# 소분류에 맵핑되는 대분류를 찾는 함수
def find_category(sub, categories):
    for main, subs in categories.items():
        if sub in subs:
            return main
        

# effnet 소분류 결과 맵핑
classes_composition_list = ['니트','후드','맨투맨','셔츠블라우스','긴소매티셔츠','반소매티셔츠','민소매티셔츠','카라티셔츠','베스트','데님팬츠','슬랙스','트레이닝조거팬츠','숏팬츠','코튼팬츠','레깅스','후드집업','바람막이',
    '코트','롱패딩','숏패딩','패딩베스트','블루종','레더자켓','무스탕','트러커자켓','블레이저','가디건','뽀글이후리스','사파리자켓','미니원피스','미디원피스','롱원피스','미니스커트','미디스커트','롱스커트']

cls_labels = {i : cls for i, cls in enumerate(classes_composition_list)}


# yolo 대분류 결과 맵핑
main_category = {'top' : '상의','bottom' : '하의','outer' : '아우터','skirt' : '스커트','dress' : '원피스'}


# 카테고리 정리
categories = {
    '상의' : ['니트', '후드', '맨투맨','셔츠블라우스','긴소매티셔츠','반소매티셔츠','민소매티셔츠','카라티셔츠','베스트'],
    '하의' : ['데님팬츠', '슬랙스','트레이닝조거팬츠','숏팬츠','코튼팬츠','레깅스'],
    '아우터' : ['후드집업', '바람막이', '코트', '롱패딩', '숏패딩', '패딩베스트', '블루종',
                '레더자켓', '무스탕', '트러커자켓', '블레이저', '가디건','뽀글이후리스','사파리자켓'],
    '원피스' : ['미니원피스', '미디원피스', '롱원피스'],
    '스커트' : ['미니스커트', '미디스커트', '롱스커트']
        }


# effnet 중간 출력 계층 변환용
softmax = torch.nn.Softmax(dim=1)

# 브랜드와 세부카테고리를 원핫인코딩 하기 
all_data = pd.read_csv('/clear-closet/apps/predictionapp/load_ai_models/pt_files/all_data.csv')

# 세부 카테고리 원핫인코딩하기
bottom_df = pd.DataFrame({'bottom_category': list(set(all_data['bottom_category']))})
bottom_encoder = OneHotEncoder()  # 희소 행렬 대신 밀집 행렬 사용
bottom_encoder.fit(bottom_df)


# 브랜드 원핫인코딩하기
brand_df = pd.DataFrame({'brand': list(set(all_data['brand']))})
brand_encoder = OneHotEncoder()  # 희소 행렬 대신 밀집 행렬 사용
brand_encoder.fit(brand_df)


# 브랜드, 세부카테고리 문자열 입력 -> 원핫인코딩 결과값을 반환하는 함수
def find_encoding(name, encoder, column_name):

    input_df = pd.DataFrame({column_name: [name]})

    encoded = encoder.transform(input_df)

    nonzero_indices = encoded.nonzero()
    
    return list(zip(nonzero_indices[0], nonzero_indices[1]))

def find_brand_encoding(brand_name):
    return find_encoding(brand_name, brand_encoder, 'brand')

def find_bottom_encoding(bottom_category):
    return find_encoding(bottom_category, bottom_encoder, 'bottom_category')


# 상품 상태 정수 인코딩하기
state_matcher = {'사용감 있는 깨끗한 상품': 1,
                  '사용흔적이 많이 있는 상품': 2,
                  '새 상품': 3,
                  '새 상품(미개봉)': 4,
                  '거의 새상품': 5}


# 가격 예측 모델의 반환값으로 가격 범위를 반환하기 위한 딕셔너리
inverse_price_matcher = {
    0: (0, 3000),
    1: (0, 3000),
    2: (3000, 6000),
    3: (6000, 9000),
    4: (9000, 12000),
    5: (12000, 15000),
    6: (15000, 18000),
    7: (18000, 21000),
    8: (21000, 24000),
    9: (24000, 27000),
    10: (27000, 30000),
    11: (30000, 33000),
    12: (33000, 36000),
    13: (36000, 39000),
    14: (39000, 42000),
    15: (42000, 45000),
    16: (45000, 48000),
    17: (48000, 51000),
    18: (51000, 54000),
    19: (54000, 57000),
    20: (57000, 60000),
    21: (60000, 65000),
    22: (65000, 70000),
    23: (70000, 75000),
    24: (75000, 80000),
    25: (80000, 85000),
    26: (85000, 90000),
    27: (90000, 95000),
    28: (95000, 100000),
    29: (100000, 110000),
    30: (110000, 120000),
    31: (120000, 130000),
    32: (130000, 140000),
    33: (140000, 160000),
    34: (160000, 180000),
    35: (180000, 200000),
    36: (200000, 300000),
    37: (300000, 400000),
    38: (400000, 500000),
    39: (500000, 600000),
    40: (600000, 800000),
    41: (800000, 1000000),
    42: (1000000, 'exceed')  # 100만원 이상은 예측 불가 또는 100만원 이상
}

