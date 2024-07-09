# Generated by Django 4.2.13 on 2024-07-08 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('nickname', models.CharField(max_length=50, unique=True)),
                ('username', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=15, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, related_name='custom_account_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='custom_account_set', to='auth.permission')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
