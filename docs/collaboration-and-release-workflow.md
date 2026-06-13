# Collaboration and Release Workflow

GitHub `cjknov8/verified-ai-cast` is the source of truth for every workstation and Codex environment.

## Start Every Work Session

```bash
git switch main
git pull --ff-only origin main
git status --short --branch
```

Do not begin from an unpushed machine-only copy.

## Finish Every Task

```bash
npm run lint
npm run build
git add <task files>
git commit -m "<clear task summary>"
git push origin main
```

Vercel production is deployed from the pushed commit. Confirm the production URL and `/api/readiness` after deployment.

## Concurrent Work

- Use a short-lived feature branch when two environments may edit the same files.
- Pull `main` before creating the branch.
- Push the branch and merge only after CI passes.
- Never use force push on `main`.
- Never copy `.env` files, Supabase service-role keys, Stripe secrets, or private review media through Git.

## Release Checks

1. GitHub `main` contains the intended commit.
2. GitHub Actions lint and build checks pass.
3. Vercel production points to that commit.
4. Public homepage, certificate lookup, trust guidance, and readiness endpoint respond successfully.
5. The task report includes the production URL and commit SHA.
