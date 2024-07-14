from io import BytesIO
import mimetypes
from PIL import Image as Img
import boto3
import uuid
import os
from botocore.exceptions import NoCredentialsError, ClientError

from backend import settings


class S3ImageUploader:
    def __init__(self, file, folder, size):
        self.file = file
        self.folder = folder
        self.size = size

    def resize_by_pil(self, image, size):
        """ 
        :param image: PIL Image 객체
        :param size: (width, height) 튜플
        :return: 조정된 새 PIL Image 객체
        """
        original_width, original_height = image.size
        ratio = min(size[0] / original_width, size[1] / original_height)
        new_width = int(original_width * ratio)
        new_height = int(original_height * ratio)
        resized_image = image.resize((new_width, new_height), Img.Resampling.LANCZOS)
        new_image = Img.new("RGB", size, (255, 255, 255))
        x_offset = (size[0] - new_width) // 2
        y_offset = (size[1] - new_height) // 2
        new_image.paste(resized_image, (x_offset, y_offset))
        return new_image

    def resize_upload(self):
        s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME
        )
        file_extension = os.path.splitext(self.file.name)[1]
        unique_filename = f'{self.folder}/{uuid.uuid4()}{file_extension}'
        
        # PIL
        image = Img.open(self.file)
        resized_image = self.resize_by_pil(image, self.size)
        
        # BytesIO 객체
        buffer = BytesIO()
        resized_image.save(buffer, format=image.format)
        buffer.seek(0)
        
        # 컨텐츠 타입 검사
        content_type = self.file.content_type
        if not content_type:
            content_type, _ = mimetypes.guess_type(self.file.name)
            if not content_type:
                content_type = 'binary/octet-stream'
        
        try:
            s3_client.upload_fileobj(
                buffer, 
                settings.AWS_STORAGE_BUCKET_NAME, 
                unique_filename,
                ExtraArgs={'ContentType': content_type}
            )
            url = f"{settings.MEDIA_URL}{unique_filename}"
            return url
        except NoCredentialsError:
            raise Exception("Credentials not available")
        except ClientError as e:
            raise Exception(f"An error occurred: {e}")