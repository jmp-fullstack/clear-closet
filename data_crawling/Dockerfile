FROM python:3.9-slim

WORKDIR /clear-closet

COPY . /clear-closet

RUN apt-get update && \
    apt-get install -y cron && \
    pip install --no-cache-dir -r requirements.txt

COPY crontab /etc/crontab

RUN chmod 0644 /etc/crontab && \
    crontab /etc/crontab

RUN touch /clear-closet/cron.log

CMD cron && tail -f /clear-closet/cron.log