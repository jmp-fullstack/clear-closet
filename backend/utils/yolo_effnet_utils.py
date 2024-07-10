import torch
from PIL import Image as Img
import extcolors
import torchvision.transforms as transforms
from torchvision import transforms 

# 이미지 리사이즈
def maintain_proportion_and_resize_by_pil(image, size=(416, 416)):

    original_width, original_height = image.size

    ratio = min(size[0] / original_width, size[1] / original_height)
    new_width = int(original_width * ratio)
    new_height = int(original_height * ratio)

    resized_image = image.resize((new_width, new_height), Img.ANTIALIAS)

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
        

# main 함수 
# 현재 : 대분류, 소분류, 색깔을 추출
# 최종 : 대분류, 소분류, 색깔, effnet의 중간계층(가격 예측 모델을 위해서)
def extract_main_sub_color_effnet_layer(image_path, yolov5_model, effnet_v2_s_model, device) :


    classes_composition_list = ['니트','후드','맨투맨','셔츠블라우스','긴소매티셔츠','반소매티셔츠','민소매티셔츠','카라티셔츠','베스트','데님팬츠','슬랙스','트레이닝조거팬츠','숏팬츠','코튼팬츠','레깅스','와이드팬츠','후드집업','바람막이',
    '코트','롱패딩','숏패딩','패딩베스트','블루종','레더자켓','무스탕','트러커자켓','블레이저','가디건','뽀글이후리스','사파리자켓','미니원피스','미디원피스','투피스','롱원피스', '점프수트','미니스커트','미디스커트','롱스커트']

    cls_labels = {cls : i for i, cls in enumerate(classes_composition_list)}
    cls_labels = {v:k for k, v in cls_labels.items()}

    main_category = {'top' : '상의','bottom' : '하의','outer' : '아우터','skirt' : '스커트','dress' : '원피스'}

    categories = {
        '상의' : ['니트', '후드', '맨투맨','셔츠블라우스','긴소매티셔츠','반소매티셔츠','민소매티셔츠','카라티셔츠','베스트'],
        '하의' : ['데님팬츠', '슬랙스','트레이닝조거팬츠','숏팬츠','코튼팬츠','레깅스'],
        '아우터' : ['후드집업', '바람막이', '코트', '롱패딩', '숏패딩', '패딩베스트', '블루종',
                    '레더자켓', '무스탕', '트러커자켓', '블레이저', '가디건','뽀글이후리스','사파리자켓'],
        '원피스' : ['미니원피스', '미디원피스', '롱원피스'],
        '스커트' : ['미니스커트', '미디스커트', '롱스커트']
        }


    resized_img_for_cropping = maintain_proportion_and_resize_by_pil(image_path, (416, 416))
    resized_img = maintain_proportion_and_resize_by_pil(image_path, (416, 416))


    result = yolov5_model(resized_img)


    if len(result.xyxy[0]) == 1 :


        xmin, ymin, xmax, ymax = map(int, result.xyxy[0][0][:4])


        cls = int(result.xyxy[0][0][5])
        class_name = result.names[cls]
        main = main_category[class_name]


        cropped_img = resized_img_for_cropping[ymin:ymax, xmin:xmax]
        cropped_img = Img.fromarray(cropped_img, 'RGB')

        cropped_center_img = extract_center_50_percent(cropped_img)

        colors, pixel_count = extcolors.extract_from_image(cropped_center_img)
        main_color = get_color_name(colors[0][0])

        image_to_tensor = transforms.Compose([transforms.ToTensor()])

        effnet_input_image = maintain_proportion_and_resize_by_pil(cropped_img, (224, 224))
        resized_image = image_to_tensor(effnet_input_image)
        resized_imgae = resized_image.unsqueeze(0).to(device)


        with torch.no_grad():
            outputs = effnet_v2_s_model(resized_imgae)

            max_value, max_index  = torch.max(outputs, 1)
            sub = cls_labels[max_index.item()]


        if sub in categories[main] :
            print(f'{image_path}는 탐지 성공 가능성 높음 - 1개 탐지')
        else :
            print(f'{image_path}는 소분류로 대분류를 역으로 매칭 - 1개 탐지')
            main = find_category(sub, categories)

        return main, sub, main_color


    elif len(result.xyxy[0]) >= 2 :


        confidences = result.xyxy[0][:, 4]
        max_index = torch.argmax(confidences).item()


        xmin, ymin, xmax, ymax = map(int, result.xyxy[0][max_index][:4])


        cls = int(result.xyxy[0][max_index][5])
        class_name = result.names[cls]
        main = main_category[class_name]


        cropped_img = resized_img_for_cropping[ymin:ymax, xmin:xmax]
        cropped_img = Img.fromarray(cropped_img, 'RGB')

        cropped_center_img = extract_center_50_percent(cropped_img)

        colors, pixel_count = extcolors.extract_from_image(cropped_center_img)
        main_color = get_color_name(colors[0][0])


        effnet_input_image = maintain_proportion_and_resize_by_pil(cropped_img, (224, 224))
        resized_image = image_to_tensor(cropped_img)
        resized_imgae = resized_image.unsqueeze(0).to(device)


        with torch.no_grad():
            outputs = effnet_v2_s_model(resized_imgae)

            max_value, max_index  = torch.max(outputs, 1)
            sub = cls_labels[max_index.item()]

        if sub in categories[main] :
            print(f'{image_path}는 탐지 성공 가능성 높음 - 2개 이상 탐지')
        else :
            print(f'{image_path}는 소분류로 대분류를 역으로 매칭 - 2개 이상 탐지')
            main = find_category(sub, categories)

        return main, sub, main_color


    elif len(result.xyxy[0]) == 0 :

   
        with torch.no_grad():
            outputs = effnet_v2_s_model(resized_imgae)

       
            max_value, max_index  = torch.max(outputs, 1)
            sub = cls_labels[max_index.item()]
        
            main = find_category(sub, categories)

  
        resized_img_for_cropping = Img.fromarray(resized_img_for_cropping, 'RGB')
        cropped_center_img = extract_center_50_percent(cropped_img)
        colors, pixel_count = extcolors.extract_from_image(cropped_center_img)
        main_color = get_color_name(colors[0][0])

        return main, sub, main_color
