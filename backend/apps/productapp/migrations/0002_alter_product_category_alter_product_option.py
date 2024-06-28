# Generated by Django 4.2.13 on 2024-06-28 06:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product_optionapp', '0001_initial'),
        ('product_categoryapp', '0001_initial'),
        ('productapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='category', to='product_categoryapp.productcategory'),
        ),
        migrations.AlterField(
            model_name='product',
            name='option',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='option', to='product_optionapp.productoption'),
        ),
    ]
