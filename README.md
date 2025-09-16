# 📰 RAG Frontend – News Assistant

This is the **frontend** for the Retrieval-Augmented Generation (RAG) powered news assistant.  
It provides a clean, interactive interface for chatting with the assistant, managing sessions, and displaying AI responses retrieved via the backend.

---

## 🚀 Features

- 🔹 **Chat Interface** – Ask questions and get AI-generated answers based on real news context
- 🔹 **Session Management** – Persistent conversations handled by Redis (backend) and browser localStorage (frontend)
- 🔹 **Conversation History** – View previous interactions in a session
- 🔹 **Responsive UI** – Built with **React + Vite + TypeScript**
- 🔹 **Dockerized** – Ready for deployment with Docker

---

## 🛠️ Run Frontend

Follow these steps to run the frontend:

1. **Install Prerequisites**  
   Ensure you have the following installed:

   - [Docker / Docker Desktop](https://docs.docker.com/get-docker/)
   - [docker-compose](https://docs.docker.com/compose/install/)

2. **Start Backend Service**  
   Make sure the backend service is **running on port `3000`**.

3. **Run Frontend with Docker Compose**  
   From the repository root (where `frontend.yml` is located), run:

   ```bash
   docker-compose -f frontend.yml up -d

   ```
