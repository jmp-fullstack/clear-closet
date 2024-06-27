# Generated by Django 4.2.13 on 2024-06-27 05:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('productapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TotalImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.FileField(upload_to='')),
                ('product_id', models.ManyToManyField(related_name='profile_images', to='productapp.product')),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile_images', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
