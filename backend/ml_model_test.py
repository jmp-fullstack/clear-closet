import torch
import numpy as np

# 1. pytorch로 .pt파일 불러오기
model = torch.Load('__path__/.pt')

# 2. 추론 모드 설정
model.eval()

# 3. 이미지 불러오기
# frontend에서 image를 받아와서 backend는 image를 uuid(key)로 S3에 저장하고,데이터베이스에 저장(uuid만)
# backend는 db상에 uuid를 다시 불러와서 CUTOMDOMIN을 붙혀 이미지를 불러옴
image = ImageSerializers.objects.get(image_url=f'{settings.AWS_CUSTOM_DOMAIN}/{uuid}')

# 4. 이미지 리사이징 및 전처리 (이미지는 제일 첫번째 [0] 인덱싱)
# 전처리 진행 후 (resizing = 416,416)

# 4-1 yolo를 통해서 - 아웃풋 :대분류
# 4-2 이피션트넷을 통해 - 아웃풋 :소분류
# 색상 추출

# 4-3 새로운(nn) 모델의 인풋  : (모델 아웃풋이용 :대분류, 소분류, 색상
#                            사용자 입력값 : 브랜드) 
#                     아웃풋 : 가격대

# 5. 입력값 설정
model_input = (image_tensor.cuda(),)

output = model(*model_input)

# 6. 총 아웃풋 (대분류, 소분류, 색상, 가격대) 사용자 입력값 (이미지, 브랜드, 사용감)
# 이 정보로 db상에서 비슷한걸 찾아야함 db에 최대한 많은 정보 넣기

# 7. 가격대, 카테고리 색상, 이미지, 브랜드로 SQL이용 -> 10000~20000의 검은색 반팔티 무탠다드 조회 후 

# 8. 없다면 비슷한 제품을 찾지 못했습니다.
# 있다면 product_type=1(새제품)중 에서 order by (상의해봐야할것:asc desc) 상위 3개, 
#       product_type=0(우리 게시글 제품)중 에서 상위 3개

# 9. 그 후 사용감에 따라서 가중치 곱한 후 가격은 10000~20000의 예측값에서 * weight

# 10. 사용자 response : 대략 8000~16000입니다. 비슷한 제품의 정보는
# data : price, connect_url, image, title (3, 3개의 정보)