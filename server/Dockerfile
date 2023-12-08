FROM python

RUN mkdir /server

WORKDIR /server

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

WORKDIR src

CMD gunicorn --workers 1 --worker-class uvicorn.workers.UvicornWorker main:app --bind=0.0.0.0:8000