# GitHub Actions Setup Guide

## Current Workflow: `deploy.yaml`

**What it does:** Tests → Builds Docker image → Pushes to Docker Hub

### Requirements:

Add these **GitHub Secrets** (Settings → Secrets and variables → Actions):

- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub token (not password)

### How to get Docker credentials:

1. Go to https://hub.docker.com/settings/security
2. Create a new token
3. Add to GitHub Secrets

---

## Deployment Options (No VPS Required)

### ✅ Option 1: Railway.app (Recommended - FREE)

**Best for:** Node.js apps, instant deployment, free tier

- Visit: https://railway.app
- Connect your GitHub repo
- Deploy with one click
- GitHub Secret needed: `RAILWAY_TOKEN`

### ✅ Option 2: Render

**Best for:** Simple Node.js apps

- Visit: https://render.com
- Connect your GitHub repo
- Auto-deploy on push
- GitHub Secrets needed: `RENDER_SERVICE_ID`, `RENDER_API_KEY`

### ✅ Option 3: AWS (EC2, ECS, AppRunner)

**Best for:** Production apps, more control

- GitHub Secrets needed: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- AWS AppRunner: Easiest option (auto Docker deployment)

### ✅ Option 4: Docker Hub Only (Manual Deployment)

**Best for:** Pulling Docker images locally\*\*

- Your workflow builds and pushes Docker image
- Pull locally: `docker pull yourusername/ci-cd:latest`
- Run: `docker run -p 8090:8090 yourusername/ci-cd:latest`

---

## Setup Instructions:

### Step 1: Push code to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Add GitHub Secrets

1. Go to your GitHub repo
2. Settings → Secrets and variables → Actions
3. Add required secrets based on your choice

### Step 3: Choose your deployment strategy

#### For Docker Hub only:

```yaml
DOCKER_USERNAME: your_docker_hub_username
DOCKER_PASSWORD: your_docker_hub_token
```

#### For Railway:

```yaml
RAILWAY_TOKEN: your_railway_token
```

#### For Render:

```yaml
RENDER_SERVICE_ID: your_service_id
RENDER_API_KEY: your_api_key
```

### Step 4: Push and watch

- Push code to main branch
- Watch at: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

---

## Current Workflow Structure

```
test job (runs always)
  ↓
build-and-push job (runs only if test passes AND on main branch)
```

## Commands to Add to package.json (Optional)

```json
{
  "scripts": {
    "start": "node index.js",
    "test": "echo 'No tests yet'",
    "lint": "echo 'No linting configured'",
    "build": "echo 'Build complete'"
  }
}
```

---

## Quick Start - Choose ONE:

### 🚀 Fastest: Use Railway

1. Sign up at https://railway.app
2. Connect your GitHub repo
3. Create `RAILWAY_TOKEN` secret
4. Done! Auto-deploys on every push

### 💰 Free & Popular: Docker Hub

1. Create account at https://hub.docker.com
2. Create `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets
3. Workflow automatically builds and pushes image
4. Pull anywhere: `docker pull yourusername/ci-cd:latest`

### 🏢 Production: AWS AppRunner

1. Create AWS account
2. Set up AppRunner with GitHub integration
3. Add AWS secrets
4. Auto-deploys from GitHub
