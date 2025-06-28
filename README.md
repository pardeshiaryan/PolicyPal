# 🌐 PolicyPal Frontend

This is the **Next.js** frontend for **PolicyPal**, an AI-powered insurance assistant that analyzes policies, extracts key fields, and provides smart recommendations — powered by **Gemini (Google Generative AI)**.

---

## 🚀 Features

- 📄 Upload insurance documents (PDF, PNG, etc.)
- ✨ Extract key fields (premium, vehicle, insurer, etc.)
- 💬 Chat with an AI agent using LangChain + Gemini
- 📊 Get recommendations, summaries, and claim eligibility insights

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/policypal-frontend.git
cd policypal-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env.local` file

Inside the project root, create a `.env.local` file and add the following:

```env
MONGODB_URI=""
NODE_ENV=development
NEXT_RUNTIME=edge
GEMINI_API_KEY=""
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
GEMINI_MODEL=""
```

> **Note:** Make sure your backend (FastAPI) is running on `http://localhost:8000`.

### 4. (Optional) Initialize shadcn/ui

If you haven't done this yet (only needed once):

```bash
npx shadcn-ui@latest init
```

Then select Tailwind and configure paths if prompted.

---

## 🧪 Run the frontend

```bash
npm run dev
```

Your app will be live at: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
components/
    FileUploader.tsx
    Navbar.tsx
    ...
pages/
    index.tsx
    upload.tsx
hooks/
    useUpload.ts
.env.local
```

---

## 🤝 Connect with Backend

Ensure the backend FastAPI server is running on `http://localhost:8000`. This frontend will poll:

- `/upload`
- `/result`
- `/extract`
- `/summary`

Make sure CORS is enabled in your FastAPI app.

---

## 🧠 Powered By

- Next.js 15
- TailwindCSS
- LangChain
- Google Gemini API
- shadcn/ui
