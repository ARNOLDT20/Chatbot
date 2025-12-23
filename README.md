# T20-CLASSIC AI (T20-CLASSIC)

This project is a single-file chat UI (`wormgpt[1].html`) that connects to the WormGPT/T20 API. It now includes a small local owner/creator check: when asked about the owner/creator it replies `I was created by T20_STARBOY`.

Files added for deployment:

- `server.js` - small Express server to serve the HTML (used for Heroku or a Node environment).
- `package.json` - Node manifest with `express` dependency.
- `Procfile` - Heroku process file.
- `vercel.json` - Vercel static configuration to serve the HTML.

Security note:
- The HTML currently contains a hardcoded API key in `T20_CONFIG.apiKey`. For production deployments move the key into environment variables and update the client/server accordingly. Exposed API keys can be abused.

Deploy to Heroku (CLI required):

```powershell
cd "C:\Users\T20\Desktop"
git init
git add .
git commit -m "Prepare T20-CLASSIC AI for deploy"
heroku create
git push heroku main
```

If your default branch is `master` use `git push heroku master` instead.

Deploy to Vercel (static HTML):

```powershell
cd "C:\Users\T20\Desktop"
# Install Vercel CLI if not already installed
npm i -g vercel
# Deploy interactively; or use --prod to publish directly
vercel --prod
```

Notes:
- Heroku will run `node server.js` from `Procfile` and serve the HTML.
- Vercel will serve the HTML as a static file using `vercel.json`.

If you want, I can:
- Replace the hardcoded API key with a server-side endpoint that reads from `process.env`.
- Move `wormgpt[1].html` to `index.html` (convenience for static hosts).
- Add a `.gitignore` to exclude sensitive files.
