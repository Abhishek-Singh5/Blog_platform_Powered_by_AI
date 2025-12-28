# 🧠 AI-Powered Blog Platform (MERN Stack)

A modern and intelligent **Blog Platform powered by AI**, built using the **MERN stack**.  
This platform allows users to **read blogs**, **subscribe to newsletters**, and enables **admins** to manage everything — from blogs and comments to subscribers — via a secure dashboard.  

It uses **Gemini API** for AI-assisted blog generation and **ImageKit API** for image uploads and optimization.

---

## 🚀 Features

### 👤 User Features
- 📰 **Read blogs** with optimized, fast loading.
- ✉️ **Subscribe** to newsletters by email.
- 💬 **Comment** on blogs (awaiting admin approval).
- 📱 **Responsive UI** for all devices.

### 🔐 Admin Features
- 👑 **Secure Admin Login** (only authorized admin can access).
- 📊 **Admin Dashboard** to manage:
  - ✅ **Blog CRUD**: Create, Read, Update, Delete blogs.
  - 🖼 **AI Content Creation** via Gemini API.
  - 🧾 **Publish / Unpublish Blogs** easily.
  - 💬 **Approve / Disapprove Comments**.
  - 📧 **View and manage Subscribers** (Newsletter list).
- ☁️ **Image Uploads via ImageKit** with real-time optimization.
- 💾 **All data stored in MongoDB** (blogs, comments, subscribers).

---

## 🧠 Powered By

- **Gemini API** — Generate AI-based blog content ideas or full posts.
- **ImageKit API** — Upload, compress, and deliver optimized images.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **AI Integration** | Gemini API |
| **Image Management** | ImageKit API |
| **Auth** | JWT (JSON Web Token) |
| **Hosting** | Render / Vercel / MongoDB Atlas |

---

    AI-Blog-Platform/
    ├── backend/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── utils/
    │   ├── server.js
    │   └── .env
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── context/
    │   │   ├── assets/
    │   │   └── App.js
    │   └── package.json
    │
    ├── README.md
    └── package.json



## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone git@github.com:yourusername/ai-blog-platform.git
cd ai-blog-platform
