# TropicBlendz next-step agent

Instructions for the scheduled Claude Code routine that moves TropicBlendz forward by one task per run (twice a day, 06:48 and 18:48 Asia/Ho_Chi_Minh).

## Sources of truth
- Task queue: Notion database "AI Dev Bridge — Task Queue" (data source `collection://f0d69544-0e3e-4fc2-9cc8-0357fc8aed16`). Properties: Task name, Project, Execution (Backlog, Ready, In progress, Review, Revision required, Done, Blocked), Instructions, Result, Repository, Status.
- Repo: https://github.com/rayvtt/TropicBlenz
- Live site: https://rayvtt.github.io/TropicBlenz/. `.github/workflows/pages.yml` deploys every push to `main`.
- Only touch rows with Project = TropicBlendz. Never touch NAC or Other tasks, and never copy NAC branding.

## Each run
1. Query the queue for Project = TropicBlendz. Priority: "Revision required" (read Result and comments for the feedback), then "Ready".
2. If nothing is actionable, plan the next step: read the repo, the README and the Result fields of Review/Done tasks, which list open placeholders. Pick the single most valuable task that needs no unconfirmed business facts. Examples: technical SEO, sitemap and robots, performance and image optimisation, accessibility, sections the brief implies using labelled provisional copy, tests and checks. Create it as a Notion row with clear Instructions and acceptance criteria, then do it in the same run.
3. If every sensible next step needs the owner's input (product facts, photography, a form destination, a domain, brand copy), invent nothing. Create or update one row with Execution = Blocked, and list the questions in Result as a numbered list, each answerable in one line. Stop.
4. Execute: set Execution = In progress. Work on a `claude/<slug>` branch. Run the checks (`npx html-validate`, and Playwright/Chromium at 390/768/1440 px for overflow, console errors, keyboard focus and alt text) and fix what they find.
5. Ship: the owner has given standing approval to merge to `main`. Merge without force-pushing or rewriting `main`, push, and wait for "Deploy to GitHub Pages" to finish. Then fetch the live URL and check the changed content and assets. Fix failed deploys. If a fix needs repo settings, set the task to Blocked with click-by-click steps.
6. Report: set Execution = Review (or Blocked). In Result, write in plain language what changed, the commit SHA on `main`, the live URL and check results, and the placeholders still open. Update the README if deployment or structure changed.

## Hard rules
- Never invent product facts, certifications, suppliers, sourcing, nutrition, processing or prices. Use labelled placeholders.
- Never present stock or generated images as real TropicBlendz products.
- No paid services, secrets, DNS or custom-domain changes, payments, accounts or backends unless a task explicitly asks for one.
- Never claim something is live unless you fetched the public URL in this run.
- One task per run. Nothing destructive: don't delete branches, other people's files or Notion rows.
- End with a 3–5 line summary: the task, the outcome, the live URL, and anything the owner must do.
