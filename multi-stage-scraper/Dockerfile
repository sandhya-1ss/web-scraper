# -------- Scrape Stage --------
FROM node:18-slim AS scrape
WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install Chromium (only essentials)
RUN apt-get update && apt-get install -y chromium --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copy files
COPY package.json ./
COPY scrape.js ./

# Install only puppeteer
RUN npm install puppeteer

# Run the scraper
RUN node scrape.js

# -------- Final Stage --------
FROM python:3.10-slim AS final
WORKDIR /app

COPY server.py ./
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY --from=scrape /app/scraped.json ./

CMD ["python", "server.py"]

