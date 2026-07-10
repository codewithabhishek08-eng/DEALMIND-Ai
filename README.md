# DealMind AI

**An AI sales agent that never forgets a deal — and never overpays for a thought.**

DealMind AI is a sales deal-intelligence prototype built for the **Hindsight × cascadeflow Hackathon**. It combines persistent agent memory (Hindsight) with cost-aware model routing (cascadeflow) to give sales reps an assistant that remembers every objection, stakeholder, and commitment across a deal's full lifecycle — and routes every AI task to the cheapest model that can do it well.

🔗 **Live demo:** [dealmind-ai-alpha.vercel.app](https://dealmind-ai-alpha.vercel.app)

---

## Table of Contents

- [Problem](#problem)
- [Solution](#solution)
- [Current Status](#current-status)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Roadmap](#roadmap)
- [Hackathon Alignment](#hackathon-alignment)
- [Contributing](#contributing)

---

## Problem

Sales reps typically juggle 15–30 active deals at once. Human memory can't reliably track every objection, stakeholder, and commitment across weeks of back-and-forth. The result:

- Prospects repeat information they've already shared, and trust erodes.
- Follow-ups come out generic instead of referencing what was actually discussed.
- Institutional knowledge disappears the moment a rep leaves — it lived in their head, not in a system.
- Most AI sales tools are stateless: every session starts from zero.
- Every AI task burns the same expensive model, with no cost governance or audit trail.

## Solution

DealMind AI pairs two purpose-built layers:

| Layer | Role |
|---|---|
| **Hindsight** | Persistent structured memory — retain, recall, reflect. Extracts objections, budget figures, stakeholders, and sentiment from every interaction and writes them as retrievable memory tied to the deal, instead of unstructured notes. |
| **cascadeflow** | Runtime intelligence — evaluates each task and routes it to the cheapest capable model (free-tier Groq for routine work, premium models only when quality demands it), with budget caps and a full audit trail. |

Together they turn a stateless chatbot into an agent that gets measurably better the longer it works a deal, without AI spend scaling linearly with usage.

## Current Status

This repository currently contains the **frontend prototype**: a Next.js dashboard UI for deal intelligence, built against mock data (see `split_mock_data.py`) to demonstrate the intended UX — deal views, memory recall surfaces, and cost/routing visualizations.

**Not yet wired in this repo:**
- Live Hindsight Cloud connection (retain / recall / reflect calls)
- Live cascadeflow routing (model selection, budget enforcement, audit logging)
- Live LLM inference (Groq / OpenRouter / OpenAI / Anthropic)

These are tracked in [Roadmap](#roadmap). The UI, data shapes, and dashboard are built and functional; the memory and routing backends are the next integration milestone.

## Tech Stack

**Frontend**
- [Next.js 16](https://nextjs.org/) (App Router) — React framework
- [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) — accessible component primitives
- [Framer Motion](https://www.framer.com/motion/) — animation
- [Recharts](https://recharts.org/) — charts/data visualization
- [Zustand](https://github.com/pmndrs/zustand) — client state management
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — forms and schema validation
- [lucide-react](https://lucide.dev/) — icons

**Tooling**
- ESLint 9 (flat config) — linting
- Python 3 (`split_mock_data.py`) — mock dataset preparation for the dashboard

**Planned integrations**
- [Hindsight](https://hindsight.vectorize.io/) (`@vectorize-io/hindsight-client`) — agent memory
- [cascadeflow](https://docs.cascadeflow.ai/) — LLM cost/runtime routing
- [Groq](https://groq.com/) — primary free-tier inference (`gpt-oss-120b`, `qwen3-32b`)

## Architecture

Target architecture (per the hackathon design; memory/routing layers not yet connected to this repo):

```
Input Layer          Call transcripts, emails, CRM logs, meeting notes
      ↓
Orchestration         Coordinates memory writes, recalls, and cascadeflow routing
      ↓
Memory + Routing      Hindsight (retain/recall/reflect)  +  cascadeflow (routing, budget caps, audit)
      ↓                        [run in parallel]
Model Providers       Groq (free) → OpenRouter → OpenAI/Anthropic (escalation only)
      ↓
Output Layer          Follow-up emails, Slack alerts, CRM updates, deal-health summaries
      ↓
   (feedback loop back into Memory + Routing for continuous improvement)
```

**7-step agent loop:**
1. Interaction capture (call transcript, email, meeting note)
2. Signal extraction (objections, budget, stakeholders, sentiment, commitments)
3. Memory write to Hindsight, tagged to the deal
4. Task routing via cascadeflow, with compliance gate
5. Memory recall — prior context retrieved before output
6. Personalized output (follow-up, call-prep brief, next-best-action, risk alert)
7. Outcome logging & reflection — results written back into Hindsight

## Project Structure

```
DEALMIND-Ai/
├── public/                 # Static assets
├── src/                    # Application source (Next.js app, components, UI)
├── split_mock_data.py      # Splits/prepares mock deal data used by the dashboard
├── components.json         # shadcn/ui configuration
├── next.config.ts          # Next.js configuration
├── eslint.config.mjs        # ESLint flat config
├── .oxlintrc.json           # oxlint configuration
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── AGENTS.md                # Instructions for AI coding agents working on this repo
├── CLAUDE.md                 # Claude-specific project instructions
└── package.json
```

## Getting Started

**Prerequisites**
- Node.js 18.18+ (Next.js 16 requirement)
- npm (or yarn / pnpm / bun)
- Python 3 (only needed if regenerating mock data via `split_mock_data.py`)


## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server on port 5001 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Roadmap

- [ ] Connect Hindsight Cloud client (`@vectorize-io/hindsight-client`) and replace mock deal data with live retain/recall/reflect calls
- [ ] Integrate cascadeflow for per-task model routing, budget caps, and audit logging
- [ ] Wire Groq as primary inference provider with OpenRouter/OpenAI/Anthropic escalation
- [ ] Build the input pipeline (call transcripts, emails, CRM logs → signal extraction)
- [ ] Surface memory recall and routing decisions directly in the dashboard UI
- [ ] Add compliance gate for sensitive-data handling
- [ ] Deploy end-to-end demo with real (or realistic synthetic) deal data

---

*Built with Hindsight (agent memory) and cascadeflow (runtime intelligence).*
