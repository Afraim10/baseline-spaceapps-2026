# AGENTS.md (read first)
BASELINE: static browser health-monitor prototype, NASA Space Apps 2026. NOT a game.
Stack: plain HTML/CSS/JS, no build step, no npm unless approved. Vendor libraries in /vendor.
- Work only in this folder. Never read or print .env, .git/config, tokens or keys.
- No destructive commands (force-push, reset --hard, clean, rm -rf). Small local commits; the user pushes.
- Content in /data/*.json; every claim has source_id and verified:false by default. Never invent URLs, DOIs, quotes or numbers. Label simulated data "SIMULATED".
- Keep index.html runnable at all times. Ask before adding dependencies.
- No NASA logos. Note AI-generated code in README.