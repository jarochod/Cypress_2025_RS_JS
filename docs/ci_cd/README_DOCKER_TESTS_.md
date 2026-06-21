Świetnie 😎 — poniżej masz **rozszerzoną wersję `README_DOCKER_TESTS.md`**, uzupełnioną o **graficzny diagram DevOps flow** (ASCII-style), który wizualnie pokazuje cały przepływ: od lokalnego uruchomienia testów po CI/CD w GitHub Actions i generowanie raportów.

---

## 🧩 **README_DOCKER_TESTS.md**

```markdown
# 🧪 Docker-Based Test Environment for Playwright & Cypress

This project provides unified, Docker-based environments for **Playwright** and **Cypress** test automation.  
Both are reproducible locally and in CI/CD pipelines via GitHub Actions.

---

## 🔁 DevOps Test Flow Diagram

```

┌──────────────────────────┐
│   Developer’s Machine    │
│  (Local Docker Testing)  │
└──────────┬───────────────┘
│
│ docker compose up
▼
┌──────────────────────────┐
│   Docker Containers      │
│  ├─ Playwright Tests     │
│  └─ Cypress Tests        │
└──────────┬───────────────┘
│
│ generate reports/videos
▼
┌──────────────────────────┐
│ Test Artifacts           │
│  ├─ ./playwright-report  │
│  ├─ ./cypress/videos     │
│  └─ ./cypress/screenshots│
└──────────┬───────────────┘
│
│ push to GitHub
▼
┌──────────────────────────┐
│   GitHub Actions CI/CD   │
│  (.github/workflows/*.yml)
│  Runs Docker tests again  │
│  Publishes artifacts      │
└──────────────────────────┘

````

---

## 🐳 Core Concepts

| Feature | Playwright | Cypress |
|----------|-------------|----------|
| Base image | `mcr.microsoft.com/playwright:v1.xx.x-jammy` | `cypress/included:14.5.4` |
| Test command | `npm run test:ci` | `npm run test:ci` |
| Compose service | `playwright-tests` | `cypress-tests` |
| Reports | `./playwright-report` | `./cypress/videos`, `./cypress/screenshots` |
| CI/CD workflow | `.github/workflows/playwright.yml` | `.github/workflows/cypress.yml` |

---

## 🚀 Running Tests Locally with Docker

### 🧱 1️⃣ Build Docker Images
```bash
docker compose build
````

### ▶️ 2️⃣ Run All Tests

```bash
docker compose up --build --abort-on-container-exit
```

### 🧪 3️⃣ Run Specific Framework

Playwright:

```bash
docker compose run --rm playwright-tests
```

Cypress:

```bash
docker compose run --rm cypress-tests
```

### 🧹 4️⃣ Stop and Clean Up

```bash
docker compose down --remove-orphans
```

---

## ⚙️ Environment Configuration

You can switch test environments using different `.env` files:

| File              | Description                 |
| ----------------- | --------------------------- |
| `.env`            | Local development (default) |
| `.env.staging`    | Staging/pre-production      |
| `.env.production` | CI/CD (GitHub Actions)      |

To run with a specific environment:

```bash
docker compose --env-file .env.staging up --build
```

> 🧩 **Note:**
> GitHub Actions injects secrets automatically, so no `.env` file is needed there.

---

## 🐞 Debugging Overview

| Method          | Playwright                                          | Cypress                                          |
| --------------- | --------------------------------------------------- | ------------------------------------------------ |
| Debug logs      | `DEBUG=pw:api`                                      | `DEBUG=cypress:*`                                |
| Interactive run | `npx playwright test --ui`                          | `npx cypress open`                               |
| Shell access    | `docker exec -it playwright-tests-runner /bin/bash` | `docker exec -it cypress-tests-runner /bin/bash` |
| Logs            | `docker logs -f playwright-tests-runner`            | `docker logs -f cypress-tests-runner`            |
| Artifacts       | `./playwright-report/`                              | `./cypress/videos/`, `./cypress/screenshots/`    |

---

## 🧠 Advanced Debugging

### 🧰 1. Debug in VSCode (Remote Containers)

You can debug tests interactively inside VSCode:

1. Install the **Dev Containers** extension
2. Create `.devcontainer/devcontainer.json` referencing your `docker-compose.yml`
3. Click **“Reopen in Container”**

This allows breakpoints, file editing, and interactive test runs inside the same Docker image used in CI/CD.

---

### 🧭 2. Monitor Application Logs

If your tests depend on backend services (e.g., `shopping-store`):

```bash
docker logs -f <container-name>
```

---

### 🌐 3. Connect to Host Network

To access APIs running locally on your host machine:

```bash
docker compose run --rm --network=host <service-name>
```

---

### 🎥 4. Review Test Artifacts

After execution, inspect results:

* **Playwright report:** `playwright-report/index.html`
* **Cypress:** `cypress/videos/` and `cypress/screenshots/`

Reports persist outside of containers via Docker volumes.

---

## 🤖 GitHub Actions Integration

| Framework  | Workflow File                      | Trigger             |
| ---------- | ---------------------------------- | ------------------- |
| Playwright | `.github/workflows/playwright.yml` | Push / Pull Request |
| Cypress    | `.github/workflows/cypress.yml`    | Push / Pull Request |

Each workflow:

1. Builds the Docker image
2. Runs all tests in container
3. Uploads reports & videos as artifacts

---

## ✅ Quick Reference Commands

| Action                  | Command                                               |
| ----------------------- | ----------------------------------------------------- |
| Build containers        | `docker compose build`                                |
| Run all tests           | `docker compose up --build --abort-on-container-exit` |
| Run Playwright only     | `docker compose run --rm playwright-tests`            |
| Run Cypress only        | `docker compose run --rm cypress-tests`               |
| Stop containers         | `docker compose down --remove-orphans`                |
| Logs (follow)           | `docker logs -f <container-name>`                     |
| Remove all Docker cache | `docker system prune -f`                              |

---

## 🧩 Summary

✅ **Unified testing pipeline** for Playwright and Cypress
✅ **Same Docker environment** locally and in CI/CD
✅ **Configurable `.env` support** for multiple stages
✅ **Persistent reports and debugging tools**
✅ **GitHub Actions ready**

> **Result:** Consistent, isolated, and reproducible test runs — locally or in the cloud 🚀

```

---

Czy chcesz, żebym przygotował jeszcze **ikonową wersję diagramu** (np. z emoji Playwright/Cypress/GitHub/Docker), tak by wyglądała bardziej “GitHub-friendly” wizualnie w README na stronie repozytorium?
```
