# 🧑‍💻 Dynamic Resume Website

A full-stack resume website built with **React + TypeScript** for the frontend and **Spring Boot (Java) + SQL** for the backend. It includes an **internal admin dashboard** to update resume content dynamically and upload images/videos.

---

## 📦 Tech Stack

- **Frontend**: React, TypeScript, Vite (or Create React App)
- **Backend**: Java, Spring Boot, Spring Data JPA, Spring Security
- **Database**: MySQL (or PostgreSQL)
- **Storage**: Local File System or AWS S3 (configurable)
- **Auth**: Spring Security (Admin Panel)

---

## ✨ Features

- Dynamic rendering of resume sections (Education, Experience, Skills, etc.)
- Internal admin tool to:
  - Edit text content with a rich-text editor
  - Upload and preview images/videos
  - Reorder or delete sections
- RESTful API between frontend and backend
- Protected admin routes (JWT-based or Basic Auth)
- Fully responsive design (Tailwind or MUI)

---

## 🗂 Project Structure

```
resume-website/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── application.properties
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.tsx
│   └── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/resume-website.git
cd resume-website
```

### 2. Setup the Backend (Spring Boot)

```bash
cd backend
./mvnw clean install
```

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resumedb
spring.datasource.username=youruser
spring.datasource.password=yourpassword
file.upload-dir=uploads/
```

Run the backend:

```bash
./mvnw spring-boot:run
```

### 3. Setup the Frontend (React + TypeScript)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Admin Access

The admin dashboard is protected. Default credentials are:

```
Username: admin
Password: password123
```

> ⚠️ Update this in `application.properties` or Spring Security configuration.

---

## 🧪 API Endpoints

| Method | Endpoint                     | Description                    |
|--------|------------------------------|--------------------------------|
| GET    | `/api/resume/sections`       | Fetch all resume sections      |
| PUT    | `/api/resume/sections/{id}`  | Update a resume section        |
| POST   | `/api/media`                 | Upload image/video             |
| GET    | `/api/media`                 | Fetch media metadata           |
| GET    | `/media/{filename}`          | Serve uploaded media files     |

---

## 📸 Media Handling

- Uploads are stored in `/uploads/` (configurable).
- Metadata stored in `media_files` SQL table.
- You can extend this to use AWS S3, Firebase, or Cloudinary.

---

## 📤 Deployment

### Frontend:
- Netlify / Vercel / GitHub Pages (static)
- Or Nginx reverse-proxy to Java backend

### Backend:
- Spring Boot app on:
  - Railway, Render, EC2, Heroku, or VPS
  - Docker container for portability

### Database:
- MySQL/PostgreSQL (local or managed like PlanetScale, AWS RDS)

---

## 🛡 Security Notes

- Admin panel uses secure login (JWT or Basic Auth)
- File type + size validation
- User input sanitization to prevent XSS

---

## 🛠 Future Enhancements

- PDF export of resume
- Dark mode toggle
- Versioning for resume edits
- Comment/feedback module

---

## 🤝 License

MIT License © 2025 Your Name

---

## 📬 Contact

For questions or suggestions, feel free to reach out:

**Your Name**  
[Email](mailto:your-email@example.com) | [GitHub](https://github.com/your-username)