# Generated by Django 5.0.7 on 2024-08-05 14:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_category_tag_article'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='article',
            options={'ordering': ['-created_at']},
        ),
    ]
