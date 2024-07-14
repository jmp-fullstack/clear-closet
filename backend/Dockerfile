FROM python:3.9-slim


WORKDIR /clear-closet

COPY requirements.txt /clear-closet

RUN apt-get -y update && apt-get install -y \
    build-essential \
    pkg-config \
    default-libmysqlclient-dev \
    gcc \
    libglib2.0-dev \
    libgl1-mesa-glx 

RUN pip install --no-cache-dir -r requirements.txt

ADD . /clear-closet

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]