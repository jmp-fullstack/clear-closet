FROM python:3.9-slim


WORKDIR /clear-closet

COPY requirements.txt /clear-closet

RUN apt-get -y update
RUN pip install --no-cache-dir -r requirements.txt

ADD . /clear-closet

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]