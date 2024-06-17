import boto3

class AWS_S3:
    def __init__(self,aws_access_key_id,aws_secret_access_key):
        """
        aws_access_key_id: AWS 액세스 키 ID
        aws_secret_access_key: AWS 시크릿 액세스 키
        """    
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key)

    def upload(self, file_name, bucket_name, object_name):
        """
        S3에 업로드 

        file_name: 업로드할 파일의 경로
        bucket_name: 업로드할 S3 버킷
        object_name: S3에 저장할 객체 이름. 지정하지 않으면 file_name을 사용
        """
        try:
            self.s3.upload_file(file_name, bucket_name, object_name)
            print("파일 업로드 성공")
        except Exception as e:
            print(f"파일 업로드 실패: {e}")


    def bucket_list(self, bucket_name):
        """
        S3 버킷의 모든 객체 목록을 조회
        
        bucket_name: S3 버킷 이름
        """
        try:
            response = self.s3.list_objects_v2(Bucket=bucket_name)
            return response
        except Exception as e:
            print(f"버킷 리스트 조회 실패: {e}")

    def download(self, bucket_name, file_name, local_file_name):
        """
        S3에서 파일을 다운로드
        
        bucket_name: S3 버킷 이름
        object_name: S3 객체 이름
        local_file_name: 저장할 로컬 파일 경로
        """
        try:
            self.s3.download_file(bucket_name, file_name, local_file_name)
            print("파일 다운로드 성공")
        except Exception as e:
            print(f"파일 다운로드 실패: {e}")
    

    def get_object(self, bucket_name, file_key):
        """
        S3에서 객체를 가져옴
        
        bucket_name: S3 버킷 이름
        object_name: S3 객체 이름
        """
        try:
            response = self.s3.get_object(Bucket=bucket_name, Key=file_key)
            return response
        except Exception as e:
            print(f"객체 가져오기 실패: {e}")