Świetny wybór 💪 — taki plik README bardzo pomaga utrzymać spójność między zespołami (np. QA i DevOps) i przydaje się też przy wdrażaniu CI/CD.
Poniżej masz kompletny, gotowy do użycia plik **`README_DOCKER_TESTS.md`**, który możesz umieścić w głównym katalogu repozytorium obok plików `Dockerfile`, `docker-compose.yml` i `.github/workflows/`.

---

## 🧩 **README_DOCKER_TESTS.md**

````markdown
# 🧪 Docker-Based Test Environment for Playwright & Cypress

This project includes two automated test environments:
- **Playwright** – for UI and end-to-end tests with modern browser automation
- **Cypress** – for integration and regression testing

Both environments are fully containerized using Docker, with CI/CD support via GitHub Actions.

---

## 🐳 Core Concepts

| Feature | Playwright | Cypress |
|----------|-------------|----------|
| Base image | `mcr.microsoft.com/playwright:v1.xx.x-jammy` | `cypress/included:14.5.4` |
| Test runner command | `npm run test:ci` | `npm run test:ci` |
| Dockerfile location | `./Dockerfile` | `./Dockerfile` |
| Compose service | `playwright-tests` | `cypress-tests` |
| Reports directory | `./playwright-report` | `./cypress/videos`, `./cypress/screenshots` |
| CI/CD Integration | GitHub Actions (`.github/workflows/*.yml`) | GitHub Actions (`.github/workflows/*.yml`) |

---

## 🚀 Running Tests Locally with Docker

### 🧱 1️⃣ Build Docker Images
```bash
docker compose build
````

### ▶️ 2️⃣ Run Tests

```bash
docker compose up --build --abort-on-container-exit
```

### 🧪 3️⃣ Run Specific Test Containers

Playwright:

```bash
docker compose run --rm playwright-tests
```

Cypress:

```bash
docker compose run --rm cypress-tests
```

### 🧹 4️⃣ Stop and Remove Containers

```bash
docker compose down --remove-orphans
```

---

## ⚙️ Environment Management

You can manage test environments using `.env` files:

| File              | Purpose                              |
| ----------------- | ------------------------------------ |
| `.env`            | Local default (used for development) |
| `.env.staging`    | Staging / pre-production credentials |
| `.env.production` | Production CI/CD credentials         |

Switch environments by setting the file before running Docker:

```bash
docker compose --env-file .env.staging up --build
```

> **Note:**
> In GitHub Actions, secrets are injected directly via workflow YAML and no `.env` file is required.

---

## 🐞 Debugging Overview

| Debug Method         | Playwright                                          | Cypress                                          |
| -------------------- | --------------------------------------------------- | ------------------------------------------------ |
| Enable detailed logs | `DEBUG=pw:api`                                      | `DEBUG=cypress:*`                                |
| Interactive GUI      | `--headed`, `--debug`                               | `npx cypress open`                               |
| Inside container     | `docker exec -it playwright-tests-runner /bin/bash` | `docker exec -it cypress-tests-runner /bin/bash` |
| View test artifacts  | `./playwright-report`                               | `./cypress/videos`, `./cypress/screenshots`      |
| Real-time app logs   | `docker logs -f playwright-tests-runner`            | `docker logs -f cypress-tests-runner`            |

---

## 🧠 Advanced Debugging Options

### 🧰 1. Debug Inside VSCode

Both environments support **VSCode Remote Containers**:

* Install “Dev Containers” extension
* Add `.devcontainer/devcontainer.json` file referencing `docker-compose.yml`
* Click **“Reopen in Container”**

This allows interactive debugging, breakpoints, and real-time inspection of test execution.

---

### 🧭 2. Monitor Application Logs

Follow the `shopping-store` application logs during testing:

```bash
docker logs -f <container-name>
```

---

### 🌐 3. Use Host Network

If tests require local API endpoints or mock servers:

```bash
docker compose run --rm --network=host <service-name>
```

---

### 🎥 4. Test Artifacts

After tests complete, check:

* **Playwright:** `playwright-report/index.html`
* **Cypress:** `cypress/videos/` and `cypress/screenshots/`

These directories are automatically mapped as volumes and persist after the container exits.

---

## 🤖 GitHub Actions Integration

Each framework has a dedicated workflow file:

| Framework  | Workflow File                      | Trigger                      |
| ---------- | ---------------------------------- | ---------------------------- |
| Playwright | `.github/workflows/playwright.yml` | Push to `main` or manual run |
| Cypress    | `.github/workflows/cypress.yml`    | Push to `main` or manual run |

Workflows automatically:

1. Checkout the repository
2. Build the Docker image
3. Run tests inside the container
4. Upload artifacts (reports, videos)

---

## ✅ Quick Reference Commands

| Action                        | Command                                               |
| ----------------------------- | ----------------------------------------------------- |
| Build containers              | `docker compose build`                                |
| Run all tests                 | `docker compose up --build --abort-on-container-exit` |
| Run Playwright only           | `docker compose run --rm playwright-tests`            |
| Run Cypress only              | `docker compose run --rm cypress-tests`               |
| Stop containers               | `docker compose down --remove-orphans`                |
| View logs                     | `docker logs -f <container-name>`                     |
| Clean up all Docker resources | `docker system prune -f`                              |

---

## 🧩 Summary

This setup provides:

* Full reproducibility between local and CI environments
* Clean separation of configuration via `.env` files
* Built-in debugging and artifact management
* Compatibility with GitHub Actions and VSCode Remote Containers

**Result:**

> Consistent, production-grade test automation pipeline for Playwright and Cypress using Docker. 🚀

```

