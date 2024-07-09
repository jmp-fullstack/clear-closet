import cv2
import numpy as np
from io import BytesIO
from PIL import Image
import requests

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

def maintain_proportion_and_resize_by_cv2(image_url, size=(416, 416)):
    response = requests.get(image_url)
    if response.status_code == 200:
        image_data = BytesIO(response.content)
        image = Image.open(image_data)
        image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    else:
        raise ValueError(f"이미지를 열 수 없습니다: {image_url}")
    
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

def extract_center_50_percent(cropped_img):
    cropped_img = Image.fromarray(cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB))
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

def get_color_name(rgb_value):
    for color_name, (lower_bound, upper_bound) in color_ranges.items():
        if all(lower_bound[i] <= rgb_value[i] <= upper_bound[i] for i in range(3)):
            return color_name
    return "기타색상"