FROM python:3.10-slim-buster

WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

RUN chmod +x start.sh
ENTRYPOINT ["sh", "start.sh"]