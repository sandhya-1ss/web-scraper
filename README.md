Multi-Stage Web Scraper and Server with Docker

This project demonstrates a multi-stage Docker setup that uses

- Node.js with Puppeteer for scraping a user-provided URL.
- Python with Flask for hosting the scraped data over HTTP.
- A lightweight final Docker image that runs only the Flask server and serves the scraped JSON content.

- Scrapes the page title and first heading (`<h1>`) from any URL.
- Saves the scraped data into a JSON file.
- Hosts the data on a web server using Flask at `http://localhost:5000/`.


1. Scraping Stage (Node.js):
    - Uses `node:18-slim` image.
    - Installs Chromium and necessary fonts.
    - Puppeteer runs in headless mode to scrape the URL passed via environment variable `SCRAPE_URL`.
    - Scraped output is saved in `scraped_data.json`.

2. Serving Stage (Python + Flask):
    - Uses `python:3.10-slim` image.
    - Copies only the `scraped_data.json` and the Flask app.
    - Starts a web server to serve the scraped content as JSON.

 Setup Instructions
1. Clone the Repository
git clone <repo-url>
cd <repo-folder>
Install docker
2. Build the Docker Image
docker build --build-arg SCRAPE_URL=https://www.w3schools.com/-t web-scrape-server
3. Run the Docker Container
docker run -p 5000:5000 web-scrape-server
http://localhost:5000/
Accessing the Output
Once the container is running, open your browser and visit:
http://localhost:5000/
You will see the scraped data in JSON format, for example:
Puppeteer is configured to use system-installed Chromium instead of downloading its own copy.

The final image does not include Node.js or Chromium—only Python and the JSON output.
