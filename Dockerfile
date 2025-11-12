FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

# Port yang dipakai fly.io (lihat fly.toml)
ENV PORT=8080

CMD ["gunicorn", "app:app", "-b", "0.0.0.0:8080"]
