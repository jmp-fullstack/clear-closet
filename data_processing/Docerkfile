FROM python:3.9-slim

WORKDIR /clear-closet

COPY data_crawling /clear-closet/data_crawling
COPY crawling_main.py /clear-closet
COPY requirements.txt /clear-closet

RUN apt-get update && \
    apt-get install -y cron tzdata && \
    pip install --no-cache-dir -r requirements.txt

COPY crontab /etc/cron.d/crontab

RUN chmod 0644 /etc/cron.d/crontab && \
    crontab /etc/cron.d/crontab

RUN touch /clear-closet/cron.log

CMD cron && tail -f /clear-closet/cron.log