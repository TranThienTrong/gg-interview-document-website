---
sidebar_position: 1
---

# GG Interview System Overview

Welcome to the documentation for the **GG Interview System** - a SaaS platform offering AI-powered technical interview practice for software engineers preparing for job interviews.

## System Architecture

The GG Interview System consists of three main components:

1. **AI Agent Service** - Python-based service running on port 8000 that simulates an interviewer and evaluates solutions
2. **Web Application** - Next.js application running on port 3500 with audio/video capabilities for realistic interview simulations
3. **Problem Service** - Node.js service running on port 3000 that integrates with LeetCode's GraphQL API

## Subscription Model

The platform offers multiple subscription tiers:

- **Free Tier** - Basic access with limited features
- **Premium Tier** - Full access to all coding problems and AI interview simulations
- **Enterprise Tier** - Team management features and system design interview modules

## Key Documentation

The following documents provide detailed information about the system:

- [Business Requirements Document (BRD)](./project-docs/business-requirements-document.md) - Business objectives and stakeholder information
- [Software Requirements Specification (SRS)](./project-docs/solution-requirements-document.md) - Technical requirements and system architecture
- [Project Charter](./project-docs/project-charter.md) - Project planning, timeline, and organization
- [Enhanced System Sequence Diagrams](./project-docs/enhanced-sequence-diagram.md) - Detailed interaction flows
