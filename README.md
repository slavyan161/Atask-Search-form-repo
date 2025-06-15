# 🔍 Atask Search Form App

Welcome to the **Atask Search Form App**, a React-based project created as part of a Frontend Developer evaluation at **Atask**.

This project demonstrates modern React development practices, including component abstraction, state management, routing, and API integration using GitHub's user search API.

---

## 📦 Tech Stack

- ⚛️ **React** — UI library
- ✨ **TypeScript** — Static typing
- 🔁 **React Router** — Client-side routing
- 🎨 **Tailwind CSS** *(optional)* — Utility-first styling
- 🚀 **Vite** — Fast development build tool
- 🧪 **Jest + React Testing Library** — Unit & component testing

---
## 🧰 Requirements

Before running this application, make sure you have the following installed:

- **Node.js v20.19.2**
- **Add to .env (VITE_GITHUB_API=https://api.github.com)**

> 📌 You can verify your installed Node.js version by running:
>
> ```bash
> node -v
> ```

This specific version ensures compatibility with the dependencies and testing setup in this project.
---

## 📁 Project Structure

```
app/
├── api/               # API integrations (e.g., GitHub)
├── components/        # Shared components (Button, Loading, etc.)
├── data/              # Dummy/mock data
├── Hooks/             # Hooks
├── routes/            # Application routes
├── screen/            # Page-specific UI
├── types/             # TypeScript types
public/                # Static files
```

---

## ⚙️ Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/slavyan161/Atask-Search-form-repo.git
cd Atask-Search-form-repo
npm install
```

Start the development server:

```bash
npm run dev
```

---

---

## Live Demo 🌐
https://slavyan161.github.io/Atask-Search-form-repo/

---

## 🧪 Running Tests

To execute all tests using Jest:

```bash
npm run test
```

This will run all unit and integration tests located in `*.spec.tsx` or `__tests__` folders.

---

## 🖼️ Features

- 🔎 GitHub User Search
- 💬 Clean UI with reusable components
- 🌐 Client-side routing with React Router
- 💾 Dummy API integration (for testing)
- 🔍 Component and screen test coverage

---

## 🗃️ Git Conventions

If you use GitHub and want to contribute or maintain the repo:

```bash
# Start a new feature branch
git checkout -b feature/your-feature-name

# Stage & commit
git add .
git commit -m "feat: add feature name"

# Push and open a pull request
git push origin feature/your-feature-name
```

---

## 👨‍💻 Author

Developed by **Reza Hanggara** as part of a technical test submission for **Atask**.

---

## 📄 License

This project is intended for internal testing and recruitment purposes only. Not licensed for public distribution.
