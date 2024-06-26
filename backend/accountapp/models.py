from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models

class CustomUserManager(BaseUserManager):
    # 일반 유저 생성 : password hash화, 필수 값(username, password), 그 외 필드 {extra_fields}
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('ID를 설정해야합니다.')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    # 관리자 유저 생성 (staff, superuser => True)
    # 뭔가 나중에 문제 생길꺼 같음, 일단 구현 XXXX
    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)

# AbstractBaseUser : 인증을 위한 필수 기능만
# PermissionsMixin : 그룹 관리를 위한 기본 기능만 ( 사용자 권한과 그룹 관리를 하기 위함. )
# 커스텀 유저
class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    nickname = models.CharField(max_length=50, unique=True)
    # upload_to :이미지 저장할 곳 -> 현재는 media/profile_image/
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    # 충돌 방지를 위한 related_name 추가
    groups = models.ManyToManyField(Group, related_name='custom_account_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_account_set', blank=True)
    # 기본 필드 지정
    USERNAME_FIELD = 'email'
    # 필수 필드 지정 ( username 제외한 필수 필드 )
    REQUIRED_FIELDS = ['nickname']

    def __str__(self):
        return self.username
    

class Review(models.Model):
    buyer = models.ForeignKey(CustomUser, related_name='buyer_id', on_delete=models.CASCADE)
    seller = models.ForeignKey(CustomUser, related_name='seller_id', on_delete=models.CASCADE)
    review_title = models.CharField(max_length=255)
    review_content = models.TextField
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.buyer} for {self.seller}: {self.review_title}'