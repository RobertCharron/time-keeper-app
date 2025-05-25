# Time Keeper App

A desktop application built with Electron and NestJS for time tracking and management.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Project Structure

```
time-keeper-app/
├── packages/
│   ├── electron-app/    # Electron frontend application
│   └── nestjs-api/      # NestJS backend API
```

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start development servers:

For the Electron app:

```bash
pnpm dev:electron
```

For the NestJS API:

```bash
pnpm dev:api
```

## Available Scripts

- `pnpm dev:electron` - Start Electron app in development mode
- `pnpm dev:api` - Start NestJS API in development mode
- `pnpm build:electron` - Build Electron app
- `pnpm build:api` - Build NestJS API
- `pnpm start:electron` - Start Electron app in production mode
- `pnpm start:api` - Start NestJS API in production mode
