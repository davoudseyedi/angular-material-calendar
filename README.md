# AngularSSR

Angular 17 project with Angular Material + CDK to implement a calendar event:

## Development server

This is a sample project demonstrating Angular 17 using Angular Universal and styled with Angular Material.

### Features:

✅ Angular 17

🎨 Angular Material

🎨 Angular CDK

📦 Ready for deployment on Node.js platforms

```

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/angular-material-calendar.git
cd angular-material-calendar
```

### 2. Install Dependencies
```bash
npm install

```

### 2. Run Project
```bash
ng serve

```

## Available Scripts
```bash
npm run dev:ssr       # Development SSR with live reload
npm run build:ssr     # Build for SSR (client + server)
npm run serve:ssr     # Serve the built SSR app (Node.js)

```

## Serve Locally After Build
```bash
npm run build:ssr
npm run serve:ssr


```

## Deployment Notes
You can deploy the SSR build (dist/ folder) to any Node.js server:
Run the following after deployment:

```bash
node dist/server/main.js

```

### License
MIT License

