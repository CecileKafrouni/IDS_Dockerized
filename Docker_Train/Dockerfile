FROM python:3

ADD  ./requirements.txt ./
RUN  python3 -m pip install -r requirements.txt

WORKDIR /usr/src/app

COPY . .

COPY storage/storage.csv /usr/src/app/storage/

CMD ["Main.py"]

ENTRYPOINT ["python3"]
