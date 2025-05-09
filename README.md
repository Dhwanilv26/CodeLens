# 🚀 CodeLens: AI-Powered GitHub Intelligence SaaS

**CodeLens** is a full-stack developer platform that uses **LLMs**, **LangChain**, **Gemini**, **Octokit**, and **RAG (Retrieval-Augmented Generation)** to help developers **understand codebases faster**, **summarize commits**, and **answer technical questions** directly from GitHub repositories.

---

## 🧠 Why CodeLens?

- 🧩 Automatically **summarizes GitHub repositories** using Gemini
- 🧠 **Embeds summaries into a vector store** with pgvector for fast retrieval
- ❓ Enables **natural language Q&A** on codebase using RAG
- 🧾 Summarizes commits from git diffs using Gemini + Octokit
- 🎧 Analyzes meetings using AssemblyAI + Firebase
- 💳 Handles credits and billing with Stripe

---

## 🖼️ Walkthrough Screenshots

### 🔐 1. Landing Page
Visit one of the best SAAS landing pages.

![Login](demo_images/landing_page.png)

---

### 📁 2. Dashboard – Your Linked GitHub Projects
View and manage all your linked repositories.

![Dashboard](demo_images/dashboard.png)

---

### 🧠 3. Commit Log with AI-Powered Summaries
Each commit is processed via `git diff → Gemini → summarized output`.

![Commit Summary](demo_images/commit_summary.png)

---

### 📂 4. Custom RAG Q&A
Codelens helps you answer all your questions and doubts related to the repo with summary and files included

![Repo Integration](demo_images/rag_model.png)

---

### 🎙️ 5. Meeting Upload & Analysis
Upload audio files, transcribe and summarize using AssemblyAI + Firebase.

![Meeting Analysis](demo_images/meeting_analysis.png)

---

### 💳 6. Stripe-Powered Billing & Credit System
Subscribe to add AI credits and manage billing.

![Billing](demo_images/billing.png)

---

## 🧠 AI Architecture Overview

### 🧾 1. GitHub File Extraction
- Uses `GithubRepoLoader` from **LangChain JS**
- Pulls source files, ignoring test/config/generated folders
- Uses **Octokit** to fetch commit history + diffs

### ✍️ 2. Summarization (Gemini 1.5 Flash)
- Summarizes each code file using a prompt like:
  > "You are onboarding a junior developer. Explain what this file does."
- Summarizes each commit via `git diff`

### 🧬 3. Embedding & Vector Storage
- Summaries → Gemini Embeddings
- Stored in PostgreSQL using the `pgvector` extension
- Query: `1 - (embedding <=> query_vector)` for **cosine similarity**

### 🔁 4. RAG-Based Q&A
- User asks a question
- Query is embedded → top 10 closest summaries fetched
- Context + question passed to Gemini for a detailed answer

### 🧠 5. Meeting Transcription
- Meeting audio → uploaded to Firebase
- Transcribed & auto-chaptered with AssemblyAI
- Gist, summary, timestamps returned

---

## 🔄 RAG Query Flow (with LangChain + Gemini)
```
[1] User asks a question
          │
          ▼
[2] Generate vector embedding for the question
   (using Gemini Embedding Model)
          │
          ▼
[3] Perform vector similarity search in pgvector DB
   (search over summary embeddings)
          │
          ▼
[4] Retrieve Top 10 Most Relevant Code Summaries
          │
          ▼
[5] Construct a "Context Block" using the retrieved summaries
          │
          ▼
[6] Send Prompt + Context to Gemini for answer generation
          │
          ▼
[7] Gemini returns a detailed markdown response
```

📦 Installation
```
# 1. Clone the repo
git clone https://github.com/dhwanilv26/codelens.git
cd codelens

# 2. Install dependencies
npm install

# 3. Setup your environment variables
from the sample provided below

# 4. Push Prisma schema to DB
npx prisma db push

# 5. Start the dev server
npm run dev

```
🔐 .env Configuration

```
Create a .env file in the root directory:
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Github Token
GITHUB_TOKEN=''

# Clerk Auth
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Gemini
GEMINI_API_KEY=your_google_generative_ai_key

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=sender_id
FIREBASE_APP_ID=your_firebase_app_id

# AssemblyAI
ASSEMBLYAI_API_KEY=your_assembly_ai_key```