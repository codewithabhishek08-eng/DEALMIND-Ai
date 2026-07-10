# DealMind AI

**An AI sales agent that never forgets a deal — and never overpays for a thought.**

DealMind AI is a sales deal-intelligence platform that combines persistent agent memory with cost-aware model routing, giving sales teams an assistant that remembers every objection, stakeholder, and commitment across a deal's full lifecycle — without AI spend scaling linearly with usage.

🔗 **Live demo:** [dealmind-ai-alpha.vercel.app](https://dealmind-ai-alpha.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Current Status](#current-status)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)
- [Contributors](#contributors)

---

## Overview

Sales reps typically manage 15–30 active deals at once, spread across weeks of calls, emails, and CRM notes. DealMind AI is built to carry that context for them: it captures every interaction, extracts the signals that matter, and turns them into personalized, cost-efficient AI output — follow-ups, call-prep briefs, and deal-health summaries that actually reflect what was discussed.

## The Problem

- Prospects repeat information they've already shared, and trust erodes as a result.
- Follow-ups come out generic instead of referencing what was actually discussed.
- Institutional knowledge disappears the moment a rep leaves — it lived in their head, not in a system.
- Most AI sales tools are stateless: every session starts from zero, with no memory of prior context.
- AI tasks default to the same expensive model every time, with no cost governance or audit trail.

## The Solution

DealMind AI is built on two complementary layers:

| Layer | Role |
|---|---|
| **Persistent Memory** | Extracts objections, budget figures, stakeholders, and sentiment from every interaction and stores them as structured, retrievable memory tied to each deal — rather than unstructured notes. |
| **Intelligent Runtime Routing** | Evaluates each task and routes it to the most cost-effective model capable of handling it well, reserving premium models for moments that genuinely require them, with budget enforcement and a full audit trail. |

Together, these turn a stateless chatbot into an agent that gets measurably better the longer it works a deal — surfacing the right context automatically, and keeping AI operating costs from scaling linearly with usage.

## Current Status

This repository currently contains the **frontend platform**: a full Next.js dashboard for deal intelligence — deal views, memory recall surfaces, and cost/routing visualizations — built and functional against a prepared dataset (see `split_mock_data.py`).

**In active development:**
- Live persistent-memory backend integration (retain / recall / reflect operations)
- Live intelligent routing backend (model selection, budget enforcement, audit logging)
- Live LLM inference wiring across providers

These are tracked under [Roadmap](#roadmap). The UI, data models, and dashboard experience are complete; backend memory and routing integration is the current focus.

## Tech Stack

**Frontend**
- [Next.js 16](https://nextjs.org/) (App Router) — React framework
- [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) — accessible component primitives
- [Framer Motion](https://www.framer.com/motion/) — animation
- [Recharts](https://recharts.org/) — charts and data visualization
- [Zustand](https://github.com/pmndrs/zustand) — client state management
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — forms and schema validation
- [lucide-react](https://lucide.dev/) — icons

**Tooling**
- ESLint 9 (flat config) — linting
- Python 3 (`split_mock_data.py`) — dataset preparation for the dashboard

## Architecture

```
Input Layer          Call transcripts, emails, CRM logs, meeting notes
      ↓
Orchestration         Coordinates memory writes, recalls, and task routing
      ↓
Memory + Routing      Persistent memory (retain/recall/reflect)  +  Runtime routing (model selection, budget caps, audit)
      ↓                            [run in parallel]
Model Providers       Fast/free-tier models first → escalation to premium models only when required
      ↓
Output Layer          Personalized follow-ups, call-prep briefs, deal-health summaries
      ↓
   (feedback loop back into Memory + Routing for continuous improvement)
```

**Agent loop:**
1. **Interaction capture** — call transcript, email, or meeting note enters the pipeline
2. **Signal extraction** — objections, budget, stakeholders, sentiment, and commitments are pulled out
3. **Memory write** — structured signals are stored and tagged to the deal
4. **Task routing** — each task is routed to the most cost-effective capable model
5. **Memory recall** — prior context is retrieved before generating any output
6. **Personalized output** — follow-up email, call-prep brief, next-best-action, or risk alert
7. **Reflection & logging** — outcomes are logged back into memory, improving future output

## Project Structure

```
DEALMIND-Ai/
├── public/                  # Static assets
├── src/                     # Application source (Next.js app, components, UI)
├── split_mock_data.py       # Prepares the dataset used by the dashboard
├── components.json          # shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── eslint.config.mjs        # ESLint flat config
├── .oxlintrc.json           # oxlint configuration
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── AGENTS.md                # Instructions for AI coding agents working on this repo
├── CLAUDE.md                # Claude-specific project instructions
└── package.json
```

## Getting Started

**Prerequisites**
- Node.js 18.18+
- npm (or yarn / pnpm / bun)
- Python 3 (only needed if regenerating the prepared dataset)

**Install**

```bash
git clone https://github.com/codewithabhishek08-eng/DEALMIND-Ai.git
cd DEALMIND-Ai
npm install
```

Refer to `package.json` for the available run commands, or start the dev server and open the printed local URL.

## Roadmap

- [ ] Connect the persistent-memory backend and replace prepared data with live retain/recall/reflect operations
- [ ] Integrate intelligent runtime routing for per-task model selection, budget caps, and audit logging
- [ ] Wire primary and escalation-tier inference providers
- [ ] Build the input pipeline (call transcripts, emails, CRM logs → signal extraction)
- [ ] Surface memory recall and routing decisions directly in the dashboard UI
- [ ] Add a compliance gate for sensitive-data handling
- [ ] Deploy an end-to-end demo with realistic deal data

## Contributors

DealMind AI is built by a four-member team, each bringing focused ownership across frontend, backend, AI integration, and product design. This project reflects the collective hard work, late nights, and iteration of the entire team in bringing DealMind AI from concept to a working platform.

---

*Built with persistent agent memory and intelligent runtime routing.*
