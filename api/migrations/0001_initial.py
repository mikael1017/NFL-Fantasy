# Generated by Django 3.1.3 on 2021-01-20 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.CharField(max_length=2)),
                ('name', models.CharField(max_length=30)),
                ('age', models.PositiveIntegerField()),
                ('posRank', models.PositiveIntegerField()),
                ('team', models.CharField(max_length=5)),
                ('throwAtt', models.PositiveIntegerField()),
                ('throwYd', models.PositiveIntegerField()),
                ('throwTD', models.PositiveIntegerField()),
                ('interception', models.PositiveIntegerField()),
                ('rushAtt', models.PositiveIntegerField()),
                ('rushYd', models.PositiveIntegerField()),
                ('rushTD', models.PositiveIntegerField()),
                ('rushAvgYd', models.FloatField()),
                ('target', models.PositiveIntegerField()),
                ('rec', models.PositiveIntegerField()),
                ('recYd', models.PositiveIntegerField()),
                ('recAvgYd', models.FloatField()),
                ('recTD', models.PositiveIntegerField()),
                ('totalTD', models.PositiveIntegerField()),
                ('fumble', models.PositiveIntegerField()),
                ('fpts', models.FloatField(null=True)),
                ('ppr', models.FloatField()),
                ('totGames', models.PositiveIntegerField()),
            ],
        ),
    ]
