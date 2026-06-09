# Ops Agent

Ops Agent is a polished React/Vite prototype for an internal Model ML conversational readiness assistant. It demonstrates a calm, premium chat workspace with role-aware prompt cards, hardcoded trust trails, and a simulated response delay.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel deployment

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Choose the `Vite` framework preset.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Deploy.

## Notes

- The app is front-end only and uses hardcoded dummy data.
- Only the Agent/chat experience is active in V1.
- Sidebar navigation for Knowledge Hub, Updates, and Saved Briefs is present as placeholder UI.
