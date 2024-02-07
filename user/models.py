from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models

# Create your models here.

class User(AbstractBaseUser):
    """
    프로필 이미지
    아이디(닉네임)
    유저이름(실제)
    이메일
    비밀번호 : default
    """

    profile_image = models.TextField()
    nickname = models.CharField(max_length=24,unique=True)
    name = models.CharField(max_length=24)
    email = models.EmailField(unique=True)

    # 사용할 유저네임필드 선택
    USERNAME_FIELD = 'nickname'

    # 디비 테이블 이름
    class Meta:
        db_table = "User"
