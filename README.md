# OmniServe: GenAI Customer Service Platform

OmniServe is a full-stack help center and agent CRM ecosystem built to demonstrate scalable customer support architecture. It combines a high-performance, WebView-ready consumer portal with a GenAI-driven ticket deflection engine and a comprehensive agent management dashboard.

## Key Features

* **Next-Gen Help Center:** Built with React/Next.js and TypeScript. Optimized for high-volume consumer traffic with SSR and mobile-first, in-app WebView compatibility.
* **GenAI Support Copilot:** Integrates LLMs (OpenAI/Anthropic) using a RAG architecture to semantically search knowledge base articles and provide instant, conversational resolutions before a ticket is created.
* **Agent CRM Dashboard:** A metadata-rich interface for support agents featuring AI-generated ticket summaries, user context synchronization, and interaction history.
* **Decoupled API Architecture:** Utilizes REST and GraphQL concepts via a robust backend (C# .NET) to orchestrate data between the frontend and simulated vendor solutions.
* **Instrumentation Ready:** Includes foundational hooks for A/B testing and event telemetry to track AI deflection success rates and operational efficiency.

## Technology Stack

* **Frontend:** TypeScript, React, Next.js, Tailwind CSS
* **Backend:** C# .NET 8, Web API, GraphQL / REST
* **AI / ML:** OpenAI API, Vector Embeddings, Semantic Search
* **Data & State:** PostgreSQL / SQLite, React Query

## 🏗️ System Architecture

1.  **Presentation Layer:** Clean separation between the `help-center` (consumer) and `agent-workspace` (internal) applications.
2.  **Orchestration Layer:** API gateway handling authentication, request routing, and data aggregation from multiple mock microservices.
3.  **Intelligence Layer:** The GenAI service processes incoming natural language queries, queries the vector database for relevant articles, and synthesizes user-friendly responses.

## ⚙️ Local Development Setup

1. Clone the repository: `git clone https://github.com/yourusername/omniserve.git`
2. Install dependencies: `npm install` (Frontend) & `dotnet restore` (Backend)
3. Set your environment variables (e.g., `OPENAI_API_KEY`) in the `.env` file.
4. Run the API server: `dotnet run`
5. Run the frontend client: `npm run dev`
6. Access the Help Center at `http://localhost:3000` and the Agent CRM at `http://localhost:3000/agent`.

## 🧪 Testing & Reliability

*   Unit testing implemented for core GenAI extraction logic and UI components.
*   Structured logging and centralized exception handling built into the API to demonstrate operational excellence.


## UI's

## Customer AI Landing Page & Copilot Deflection:
http://localhost:3000

Test the interactive AI search bar with sample queries like "billing issue" or "streaming errors" to verify instant deflection results.

## Agent CRM Dashboard:
http://localhost:3000/agent

View live support ticket escalations and AI Copilot assistance panel connected to your .NET backend API.