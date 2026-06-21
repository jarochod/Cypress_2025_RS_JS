# 🌿 Cypress + Docker + GitHub Actions Setup

## 📄 Overview

This document describes how to run **Cypress tests** in **Docker** both locally and on **GitHub Actions**, with support for different environments (`.env`, `.env.staging`, `.env.production`).

This approach ensures consistent testing conditions and reproducibility.

---

## 🧱 Project Structure

````

Cypress_2025_RS_JS/
├── Dockerfile
├── docker-compose.yml
├── .env
├── .env.staging
├── .env.production
└── .github/
  └── workflows/
    ├── cypress.yml
    └── cypress-staging.yml

````

---

## 🐋 Docker Configuration

### `Dockerfile`

```dockerfile
FROM cypress/included:14.5.4
WORKDIR /app
COPY . /app
RUN echo "Installing dependencies..." && npm ci
RUN chmod +x ./shopping-store/shopping-store-linux-amd64
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["./shopping-store/shopping-store-linux-amd64 & npm run test:ci"]
````

### `docker-compose.yml`

```yaml
services:
  cypress-tests:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      - ADMIN_USERNAME=${ADMIN_USERNAME}
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
    volumes:
      - ./cypress/videos:/app/cypress/videos
      - ./cypress/screenshots:/app/cypress/screenshots
    tty: true
    restart: "no"
    container_name: cypress-tests-runner
```

---

## 🌍 Environment Files

### `.env`

```
ADMIN_USERNAME=local_admin
ADMIN_PASSWORD=local_password
API_URL=http://localhost:3000
```

### `.env.staging`

```
ADMIN_USERNAME=staging_admin
ADMIN_PASSWORD=staging_password
API_URL=https://staging.api.example.com
```

### `.env.production`

```
ADMIN_USERNAME=prod_admin
ADMIN_PASSWORD=prod_password
API_URL=https://api.example.com
```

---

## 🧰 Local Usage

Run Cypress tests locally with Docker:

```bash
# Local environment
docker compose --env-file .env up --build

# Staging environment
docker compose --env-file .env.staging up --build

# Production environment
docker compose --env-file .env.production up --build
```

---

## 🚀 GitHub Actions

### `.github/workflows/cypress-staging.yml`

```yaml
name: Cypress Staging Tests

on:
  workflow_dispatch:
  push:
    branches: [staging]

jobs:
  cypress-staging-tests:
    runs-on: ubuntu-latest
    env:
      ADMIN_USERNAME: ${{ secrets.ADMIN_USERNAME_STAGING }}
      ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD_STAGING }}
      API_URL: ${{ secrets.API_URL_STAGING }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run Docker Compose (staging)
        run: |
          echo "Running staging Cypress tests..."
          docker compose --env-file .env.staging up --build --abort-on-container-exit
          
      - name: Cleanup
        if: always()
        run: docker compose down --remove-orphans
```

---

## 🔑 GitHub Secrets

Set these in your repository:

```
ADMIN_USERNAME_STAGING
ADMIN_PASSWORD_STAGING
API_URL_STAGING
```

Path: **Settings → Secrets and variables → Actions**

---

## ✅ Summary

| Environment | Source                      | Command / Trigger                      |
| ----------- | --------------------------- | -------------------------------------- |
| Local       | `.env`                      | `docker compose --env-file .env up`    |
| Staging     | `.env.staging` / Secrets    | `workflow_dispatch` or `push: staging` |
| Production  | `.env.production` / Secrets | `workflow_dispatch` or `push: main`    |

---

## 🧰 Local Usage with Docker

Use Docker Compose to run Cypress tests in isolated environments that replicate CI/CD conditions.

---

### 🔨 1. Build the Image

If dependencies or the Dockerfile have changed, rebuild your Docker image:

```bash
docker compose --env-file .env build
````

For a clean rebuild (ignore cache):

```bash
docker compose --env-file .env build --no-cache
```

---

### ▶️ 2. Run Tests (Start Containers)

Start the Cypress container and run tests automatically:

```bash
# Local environment
docker compose --env-file .env up --build

# Staging environment
docker compose --env-file .env.staging up --build

# Production environment
docker compose --env-file .env.production up --build
```

You can automatically stop containers after the test run:

```bash
docker compose --env-file .env up --build --abort-on-container-exit
```

---

### 📜 3. View Logs

Monitor the test output live:

```bash
docker logs -f cypress-tests-runner
```

Or just check recent logs:

```bash
docker logs --tail 50 cypress-tests-runner
```

---

### 🧩 4. Run Commands Inside the Container

If you want to debug Cypress interactively:

```bash
docker exec -it cypress-tests-runner /bin/bash
```

Then inside the container:

```bash
npx cypress run
```

Or open the Cypress dashboard (if using GUI mode):

```bash
npx cypress open
```

---

### 🧹 5. Stop and Remove Containers

After tests are done:

```bash
docker compose down
```

Remove all related data and networks:

```bash
docker compose down --volumes --remove-orphans
```

---

### 🧼 6. Clean Docker Environment (Optional)

If you want to reclaim space or reset Docker state:

```bash
docker system prune -a
```

⚠️ Be careful — this deletes **all stopped containers, unused images, and networks**.

---

### ✅ Quick Command Summary

| Action               | Command                                               |
| -------------------- | ----------------------------------------------------- |
| Build image          | `docker compose build`                                |
| Run tests            | `docker compose up --build`                           |
| Run & stop on finish | `docker compose up --build --abort-on-container-exit` |
| View logs            | `docker logs -f cypress-tests-runner`                 |
| Open shell           | `docker exec -it cypress-tests-runner /bin/bash`      |
| Stop containers      | `docker compose down`                                 |
| Clean system         | `docker system prune -a`                              |



## 🐞 Debugging Cypress Tests in Docker

Cypress provides multiple debugging options when running tests in Docker:
- Enable detailed logs
- Use interactive GUI mode (headed)
- Attach to the container for manual testing

---

### 🔧 1. Enable Verbose Logs

Enable detailed logging by setting the `DEBUG` variable:

```bash
docker compose run --rm -e DEBUG=cypress:* cypress-tests
````

This prints information about network requests, browser actions, and test runner events.

You can also increase verbosity in the Cypress config:

```json
{
  "video": true,
  "screenshotOnRunFailure": true,
  "defaultCommandTimeout": 10000
}
```

---

### 🧠 2. Run Specific Tests

To run a single spec file:

```bash
docker exec -it cypress-tests-runner npx cypress run --spec cypress/e2e/login.cy.js
```

To run all tests in a folder:

```bash
docker exec -it cypress-tests-runner npx cypress run --spec cypress/e2e/*
```

---

### 🪟 3. Run in Headed Mode (with Browser UI)

If you want to **see the test execution live**, you can launch Cypress with a visible browser.
This is supported when your Docker host has X11 forwarding or GUI support.

Example command:

```bash
docker run -it \
  --env DISPLAY \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -v "$(pwd)":/e2e \
  cypress/included:14.5.4 \
  npx cypress open
```

This opens the Cypress Test Runner where you can manually select and run tests.

---

### 🧩 4. Attach to Running Container

To manually inspect the environment or rerun tests:

```bash
docker exec -it cypress-tests-runner /bin/bash
```

Inside the container:

```bash
npx cypress run --spec cypress/e2e/example.cy.js
```

---

### 🎥 5. Inspect Test Artifacts

Cypress automatically stores videos and screenshots of failed tests.
They’re mapped as volumes in `docker-compose.yml`:

```bash
./cypress/videos
./cypress/screenshots
```

You can view or copy them manually if needed:

```bash
docker cp cypress-tests-runner:/app/cypress/videos ./cypress/videos
docker cp cypress-tests-runner:/app/cypress/screenshots ./cypress/screenshots
```

---

### ✅ Quick Debug Commands

| Action           | Command                                          |
| ---------------- | ------------------------------------------------ |
| Enable logs      | `DEBUG=cypress:*`                                |
| Run one spec     | `npx cypress run --spec <path>`                  |
| Run GUI mode     | `npx cypress open`                               |
| Enter container  | `docker exec -it cypress-tests-runner /bin/bash` |
| View videos      | `./cypress/videos`                               |
| View screenshots | `./cypress/screenshots`                          |

```
