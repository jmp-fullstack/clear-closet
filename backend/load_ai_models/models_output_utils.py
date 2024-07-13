import torch
from PIL import Image as Img
import extcolors
import torchvision.transforms as transforms
from torchvision import transforms 
from load_ai_models.models_input_utils import * 
import torch
from torchvision import transforms


def get_fc_layer_output(input_tensor, effnet_v2_s_model):
    layer_name = 'classifier'
    layer = dict([*effnet_v2_s_model.named_modules()])[layer_name]

    outputs = []

    def hook(module, input, output):
        outputs.append(output)

    handle = layer.register_forward_hook(hook)

    # 이미지 변환
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])])

    # 입력 텐서에 변환 적용
    input_tensor = transform(input_tensor)

    # 모델 실행
    with torch.no_grad():
        _ = effnet_v2_s_model(input_tensor)
    handle.remove()
    
    return outputs



def extract_main_sub_color_price_range(image_path, yolov5_model, effnet_v2_s_model, predict_price_model, brand_name, state,  device) :

    # yolo 인풋으로 들어가기 위해서 이미지를 416X416으로 resize 합니다.
    resized_img_for_cropping = maintain_proportion_and_resize_by_pil(image_path, (416, 416))
    resized_img = maintain_proportion_and_resize_by_pil(image_path, (416, 416))

    # resize한 함수를 yolo 모델에 투입합니다.
    result = yolov5_model(resized_img)


    # yolo 탐지 결과가 한 개 일때는
    if len(result.xyxy[0]) == 1 :

        # 바운딩 박스의 좌표를 받고
        xmin, ymin, xmax, ymax = map(int, result.xyxy[0][0][:4])

        # 탐지한 것의 대분류를 받습니다.
        cls = int(result.xyxy[0][0][5])
        class_name = result.names[cls]
        main = main_category[class_name]

        # effnet의 인풋으로 들어가기 위해서 바운딩 박스를 추출하고
        resized_img_for_cropping_np = np.array(resized_img_for_cropping)
        cropped_img = resized_img_for_cropping_np[ymin:ymax, xmin:xmax]
        cropped_img = Img.fromarray(cropped_img, 'RGB')

        # main 색상을 얻기 위해서 바운딩 박스의 중앙 부분만 자른 이미지를 구축합니다.
        cropped_center_img = extract_center_50_percent(cropped_img)

        # main 색상을 뽑습니다.
        colors, pixel_count = extcolors.extract_from_image(cropped_center_img)
        main_color = get_color_name(colors[0][0])
        
        # 가격 예측 모델의 input을 만들기 위해 색상의 rgb 값을 구합니다.
        main_color_rgb = list(colors[0][0])

        # 이미지를 텐서로 바꾸는 객체를 형성합니다.
        image_to_tensor = transforms.Compose([transforms.ToTensor()])

        # effnet의 인풋으로 들어가기 위해서 추출한 바운딩 박스를 224X224로 resize 합니다.
        effnet_input_image = maintain_proportion_and_resize_by_pil(cropped_img, (224, 224))
        # 이때 이미지를 텐서로 변환합니다.
        resized_image = image_to_tensor(effnet_input_image)
        # 인풋의 형태를 맞추기 위해서 unsqueeze 합니다.
        resized_imgae = resized_image.unsqueeze(0).to(device)

        # 224 X 224로 리사이즈한 함수를 effnet에 넣고, 세부카테고리를 추출합니다.
        with torch.no_grad():
            # 소분류를 찾기 위한 effnet 결과를 받습니다
            bottom_outputs = effnet_v2_s_model(resized_imgae)
            
            # effnet의 중간 계층 출력 결과를 가지고 옵니다.
            effnet_fc_output = get_fc_layer_output(resized_imgae, effnet_v2_s_model)

        # effnet 결과에서 가장 큰 값을 가지는 인덱스를 추출하여 소분류를 확정합니다.
        max_value, max_index  = torch.max(bottom_outputs, 1)
        sub = cls_labels[max_index.item()]
        
        print(sub)
        
        # effnet 중간계층 출력 결과를 softmax 처리하고 리스트로 만듭니다.
        eff_fc_output = softmax(effnet_fc_output[0])
        eff_fc_output = eff_fc_output.tolist()[0]

        # 사용자가 입력한 사용 상태를 정수 인코딩으로 변환합니다.
        status_label_encode = state_matcher[state]

        # 사용자가 입력한 브랜드 이름을 사전에 정의해둔 브랜드 원핫인코딩으로 변환합니다.
        encoded_brand_indices = find_brand_encoding(brand_name)
        encoded_brand_indices = list(encoded_brand_indices[0])
        
        # effnet의 결과로 나온 소분류 문자열을 사전에 정의해둔 소분류 원핫인코딩으로 변환합니다.
        encoded_bottom_indices = find_bottom_encoding(sub)
        encoded_bottom_indices = list(encoded_bottom_indices[0])

        # 지금까지 추출한 것을 가격예측 모델의 인풋을 위해 합칩니다.
        predict_price_model_input = []
        predict_price_model_input.extend(eff_fc_output)
        predict_price_model_input.extend(main_color_rgb)
        predict_price_model_input.append(status_label_encode)
        predict_price_model_input.extend(encoded_brand_indices)
        predict_price_model_input.extend(encoded_bottom_indices)

        # 구축한 가격 예측 모델의 인풋을 가격 예측 모델에 투입합니다.
        price_result = predict_price_model.predict([predict_price_model_input])
        # 이때는 리스트이므로 인덱싱을 통해서 가격 예측 맵핑 결과값을 가지고 옵니다.
        estimated_price_encoding = price_result[0]
        # 가격 맵핑 결과값을 다시 가격 범위로 변환하여 시작 값과, 끝 값을 반환 받습니다.
        s_price, e_price = inverse_price_matcher[estimated_price_encoding]
        
        # 탐지 결과 유형을 표시합니다.
        if sub in categories[main] :
            print(f'{image_path} 1개 탐지 : 대분류와 소분류가 정상적으로 매칭되었습니다.')
        else :
            print(f'{image_path} 1개 탐지 : 소분류로 대분류를 역으로 매칭하였습니다.')
            main = find_category(sub, categories)
        # 탐지 결과가 하나 일때의 main, sub, main_color, s_price, e_price 값을 반환합니다.
        return main, sub, main_color, s_price, e_price


    # 만약에 탐지 결과가 2개 이상이라면
    elif len(result.xyxy[0]) >= 2 :

        # 탐지결과들의 신뢰도 값을 추출해서
        confidences = result.xyxy[0][:, 4]
        # 신뢰도 값이 가장 큰 것을 선택합니다.
        max_index = torch.argmax(confidences).item()

        # 신뢰도 결과가 가장 높은 것의 바운딩 박스 좌표를 추출합니다.
        xmin, ymin, xmax, ymax = map(int, result.xyxy[0][max_index][:4])

        # 신뢰도가 가장 높은 yolo 결과의 대분류 카테고리를 정의합니다.
        cls = int(result.xyxy[0][max_index][5])
        class_name = result.names[cls]
        main = main_category[class_name]

        # 신뢰도가 가장 높은 yolo 결과에 대한 바운딩 박스르르 추출합니다.
        resized_img_for_cropping_np = np.array(resized_img_for_cropping)
        cropped_img = resized_img_for_cropping_np[ymin:ymax, xmin:xmax]
        cropped_img = Img.fromarray(cropped_img, 'RGB')
        
        # 주요 색상을 추출하기 위해서 바운딩 박스의 가운데 부분을 추출합니다. 
        cropped_center_img = extract_center_50_percent(cropped_img)

        # 주요 색상을 추출합니다.
        colors, pixel_count = extcolors.extract_from_image(cropped_center_img)
        main_color = get_color_name(colors[0][0])

        # 이미지의 주요 색상 rgb 코드를 추출합니다.
        main_color_rgb = list(colors[0][0])

        # 이미지를 텐서로 바꾸는 객체를 형성합니다.
        image_to_tensor = transforms.Compose([transforms.ToTensor()])

        # effnet의 인풋에 들어가기 위해서 바운딩 박스 이미지를 224 X 224로 resize 합니다.
        effnet_input_image = maintain_proportion_and_resize_by_pil(cropped_img, (224, 224))
        resized_image = image_to_tensor(cropped_img)
        resized_imgae = resized_image.unsqueeze(0).to(device)


        with torch.no_grad():
            # 소분류 값을 얻기 위한 출력값 받고
            bottom_outputs = effnet_v2_s_model(resized_imgae)
            # 중간 계층 출력 값 받고
            effnet_fc_output = get_fc_layer_output(resized_imgae, effnet_v2_s_model)

            # 소분류 문자열 값을 받습니다.
            max_value, max_index  = torch.max(bottom_outputs, 1)
            sub = cls_labels[max_index.item()]
        print(sub)

        # effnet 중간계층 출력 결과를 softmax 처리하고 리스트로 만듭니다.
        eff_fc_output = softmax(effnet_fc_output[0])
        eff_fc_output = eff_fc_output.tolist()[0]

        # 사용자가 입력한 사용 상태를 정수 인코딩으로 변환합니다.
        status_label_encode = state_matcher[state]

        # 사용자가 입력한 브랜드 이름을 사전에 정의해둔 브랜드 원핫인코딩으로 변환합니다.
        encoded_brand_indices = find_brand_encoding(brand_name)
        encoded_brand_indices = list(encoded_brand_indices[0])
        
        # effnet의 결과로 나온 소분류 문자열을 사전에 정의해둔 소분류 원핫인코딩으로 변환합니다.
        encoded_bottom_indices = find_bottom_encoding(sub)
        encoded_bottom_indices = list(encoded_bottom_indices[0])

        # 지금까지 추출한 것을 가격예측 모델의 인풋을 위해 합칩니다.
        predict_price_model_input = []
        predict_price_model_input.extend(eff_fc_output)
        predict_price_model_input.extend(main_color_rgb)
        predict_price_model_input.append(status_label_encode)
        predict_price_model_input.extend(encoded_brand_indices)
        predict_price_model_input.extend(encoded_bottom_indices)

        # 구축한 가격 예측 모델의 인풋을 가격 예측 모델에 투입합니다.
        price_result = predict_price_model.predict([predict_price_model_input])
        # 이때는 리스트이므로 인덱싱을 통해서 가격 예측 맵핑 결과값을 가지고 옵니다.
        estimated_price_encoding = price_result[0]
        # 가격 맵핑 결과값을 다시 가격 범위로 변환하여 시작 값과, 끝 값을 반환 받습니다.
        s_price, e_price = inverse_price_matcher[estimated_price_encoding]
        
        # 탐지 결과 유형을 표시합니다.
        if sub in categories[main] :
            print(f'{image_path} 2개 탐지 : 대분류와 소분류가 정상적으로 매칭되었습니다.')
        else :
            print(f'{image_path} 2개 탐지 : 소분류로 대분류를 역으로 매칭하였습니다.')
            main = find_category(sub, categories)
        # 탐지 결과가 하나 일때의 main, sub, main_color, s_price, e_price 값을 반환합니다.
        return main, sub, main_color, s_price, e_price



    elif len(result.xyxy[0]) == 0 :
        # 크롭핑을 위해서 만든 원본이미지를 넘파이 형태로 변환합니다.
        resized_img_for_cropping_np = np.array(resized_img_for_cropping)
        resized_img_for_cropping_np = Img.fromarray(resized_img_for_cropping_np, 'RGB')
        
        
        image_to_tensor = transforms.Compose([transforms.ToTensor()])
        # 원본 이미지를 기준으로 effnet의 인풋으로 들어갈 수 있게 resize 합니다.
        effnet_input_image = maintain_proportion_and_resize_by_pil(resized_img_for_cropping_np, (224, 224))
        resized_image = image_to_tensor(effnet_input_image)
        resized_imgae = resized_image.unsqueeze(0).to(device)



        # 원본이미지에 대해서 가운데 부분을 추출해 주요 색상을 얻습니다.
        cropped_center_img = extract_center_50_percent(resized_img_for_cropping_np)
        colors, pixel_count = extcolors.extract_from_image(cropped_center_img)
        main_color = get_color_name(colors[0][0])
        
        # 가격 예측 모델의 input을 만들기 위함(리스트이므로 extend로 진행한다.)
        main_color_rgb = list(colors[0][0])

        with torch.no_grad():
            bottom_outputs = effnet_v2_s_model(resized_imgae)

            max_value, max_index  = torch.max(bottom_outputs, 1)
            # effnet의 중간 계층 출력 결과를 가지고 옵니다.
            effnet_fc_output = get_fc_layer_output(resized_imgae, effnet_v2_s_model)

        print(print(f'{image_path} 탐지 결과 없음 : 소분류로 대분류를 역으로 매칭하였습니다.'))

        sub = cls_labels[max_index.item()]
        main = find_category(sub, categories)

        print(sub)

        

        # effnet 중간계층 출력 결과를 softmax 처리하고 리스트로 만듭니다.
        eff_fc_output = softmax(effnet_fc_output[0])
        eff_fc_output = eff_fc_output.tolist()[0]

        # 사용자가 입력한 사용 상태를 정수 인코딩으로 변환합니다.
        status_label_encode = state_matcher[state]

        # 사용자가 입력한 브랜드 이름을 사전에 정의해둔 브랜드 원핫인코딩으로 변환합니다.
        encoded_brand_indices = find_brand_encoding(brand_name)
        encoded_brand_indices = list(encoded_brand_indices[0])
        
        # effnet의 결과로 나온 소분류 문자열을 사전에 정의해둔 소분류 원핫인코딩으로 변환합니다.
        encoded_bottom_indices = find_bottom_encoding(sub)
        encoded_bottom_indices = list(encoded_bottom_indices[0])

        # 지금까지 추출한 것을 가격예측 모델의 인풋을 위해 합칩니다.
        predict_price_model_input = []
        predict_price_model_input.extend(eff_fc_output)
        predict_price_model_input.extend(main_color_rgb)
        predict_price_model_input.append(status_label_encode)
        predict_price_model_input.extend(encoded_brand_indices)
        predict_price_model_input.extend(encoded_bottom_indices)

        # 구축한 가격 예측 모델의 인풋을 가격 예측 모델에 투입합니다.
        price_result = predict_price_model.predict([predict_price_model_input])
        # 이때는 리스트이므로 인덱싱을 통해서 가격 예측 맵핑 결과값을 가지고 옵니다.
        estimated_price_encoding = price_result[0]
        # 가격 맵핑 결과값을 다시 가격 범위로 변환하여 시작 값과, 끝 값을 반환 받습니다.
        s_price, e_price = inverse_price_matcher[estimated_price_encoding]

        return main, sub, main_color, s_price, e_price


