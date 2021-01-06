FROM python:3

ADD  ./requirements.txt ./
RUN  python3 -m pip install -r requirements.txt

EXPOSE 80

WORKDIR /usr/src/app

COPY . .

COPY storage/storage.csv /usr/src/app/storage/

ENTRYPOINT ["python3"]
