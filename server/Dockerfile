FROM python:3.9.13

WORKDIR /app/server

ENTRYPOINT pip install -r requirements.txt && cd src && gunicorn --workers 1 --worker-class uvicorn.workers.UvicornWorker main:app --bind=0.0.0.0:8000