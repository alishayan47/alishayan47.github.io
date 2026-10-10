# Personal portfolio — React + Vite + Tailwind CSS

A restrained, responsive portfolio for software engineering, AI research and game-development work. Includes filterable project cards, individual case-study pages, and original screenshots from project recordings. **JobSynkAI is intentionally excluded pending project-owner approval.**

## Run locally

Requires Node 20.19+ (Node 22 recommended).

```bash
npm install
npm run dev
```

Open the local URL displayed by Vite. To verify the production build:

```bash
npm run build
npm run preview
```

## Edit before publishing

1. Open `src/content.js`: the current display name is **Ali Shayan Amir**, taken from the provided academic reports. Confirm your preferred public name. GitHub and LinkedIn are already configured. Set `email` and `cvPath` when ready. Missing contact links are deliberately hidden.
2. Review the descriptions and contributions in `projects`. All items should be accurate and publicly shareable. The dissertation metric definitions still need verification against the full dissertation.
3. Check rights/permission before posting group-owned assets or code. The Good Old Haggis organisation repository is listed in the coursework report, but currently returns 404 and is **not linked from the published site**.
4. Add your own media under `public/media/` and set each project's `image` path in `src/content.js`. Images for *Skate Fish Escape!* and *Operation Nexus* were extracted from your recordings. Selected plots for the PSO and Good Old Haggis case studies were extracted from your uploaded coursework reports; verify sharing permissions before making the site public.
5. Optionally place your CV in `public/CV.pdf` and set `cvPath: '/CV.pdf'`.
6. Publish only after reviewing the AI-assisted or collaborative research descriptions for accuracy and university rules.

## Deploy to GitHub Pages (username site)

**Account note:** The GitHub connector currently available in this chat is authenticated as `shahrozeafaq5`, not `alishayan47`. Create the repository while logged in to `alishayan47`, or reconnect GitHub to the correct account before asking for remote operations. The repository was not created or published as part of this ZIP update.

1. Create a **public** GitHub repository with the exact name `alishayan47.github.io`.
2. In VS Code, open this project folder and run:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/alishayan47/alishayan47.github.io.git
git push -u origin main
```

3. In repository Settings → Pages → Build and deployment → **Source: GitHub Actions**.
4. The included `.github/workflows/deploy.yml` installs dependencies, builds and deploys on each push to `main`. Commit the generated `package-lock.json` after your first local `npm install` for reproducible dependency versions; then you may switch workflow to `npm ci`.
5. Visit `https://alishayan47.github.io` after the action completes.

If using an ordinary project repository instead, change `base` in `vite.config.js` to `'/<repo-name>/'`. The project's media paths currently use root-relative `/media/...`, so those paths must also be adjusted for project-repository deployment. A username site (above) works with the files as supplied.

## Project structure

- `src/App.jsx` — layout, category filters, project detail pages and navigation
- `src/content.js` — profile settings and editable project descriptions
- `src/styles.css` — typography, dark palette, responsive styling
- `public/media/` — portfolio images
- `.github/workflows/deploy.yml` — automatic GitHub Pages deployment

No backend is needed; all project pages are rendered by React using URL hash routes compatible with GitHub Pages static hosting.

## Ownership and attribution

- **Not included:** JobSynkAI, DHAO AI, DivLynx work, Cricket Management System. These will only be considered with appropriate owner/team permission and verified personal contributions.
- **Featured:** dissertation, ANN–PSO, Good Old Haggis, Skate Fish Escape!
- **Supporting:** Dracula’s Return, Operation Nexus, Word2Vec coursework, collaborative LLM safety research.
- Game controller / environment assets used in Operation Nexus were third-party; this is explicitly disclosed in the case study.
- Group coursework should not be presented as independently authored, even if you led individual components.

## Build notes

This environment could prepare and check the source and media files, but its npm registry was unreachable during packaging, so a production build could not be executed here. After running `npm install` locally, `npm run build` should generate `dist/`; review the pages locally before publishing.
