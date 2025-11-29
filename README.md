# Interactive 3D Resume — Static Site (Nginx + Docker)

This repository contains a single-page, interactive 3D resume built with plain HTML, CSS, and JavaScript.
The 3D panels are rendered using Three.js's CSS3DRenderer and the site includes a small in-browser control panel that edits the resume data (stored in `app/resume_data.js` and persisted to `localStorage`).

This project is shipped as static files in the `app/` folder and includes a `Dockerfile` + `docker-compose.yml` to serve the site with Nginx.

**Status:** Lightweight static site — no Node/React or Java backend required.

**Live port (default):** `http://localhost:8080` when run with Docker Compose.

---

**Tech stack**
- **Frontend:** Plain HTML, Tailwind (CDN), vanilla JavaScript
- **3D rendering:** Three.js (CSS3DRenderer)
- **Container / webserver:** Nginx (image built from `Dockerfile`)

---

**What you'll find in this repo**
- **`app/`**: The static website files — `index.html`, `frontend.js`, `resume_data.js` and other assets.
- **`images/`**: Image assets referenced by the site.
- **`Dockerfile`**: Nginx-based image that copies `app/` into `/usr/share/nginx/html`.
- **`docker-compose.yml`**: Simple compose file to build and run the container on port `8080`.
- **`nginx.conf`**: Nginx configuration used by the container.

---

**Quick start — run with Docker Compose**

1. From the repository root run:

```bash
docker compose up --build
```

2. Open `http://localhost:8080` in your browser.

Notes:
- The compose file maps host port `8080` to container port `80`.
- If you prefer to run without compose you can build and run the image manually:

```bash
docker build -t interactive-resume:latest .
docker run -p 8080:80 interactive-resume:latest
```

---

**Local development (no Docker)**

Option A — quickly preview the static site (recommended):

```bash
# from repo root
python -m http.server --directory app 8000
# then open http://localhost:8000
```

Option B — open the file directly in a browser (some features like module imports and CORS may be limited):

Open `app/index.html` in your browser (double-click or use your editor's Live Preview).

---

**Editing resume content**
- The canonical data object is in `app/resume_data.js` — update `DEFAULT_CONTENT` to change the default resume.
- The control panel in the running page edits the live data and saves edits to `localStorage` (key `resume_content_v2`). These changes affect the current browser only and are not persisted to the Docker image or source files.

---

**How the app works (short)**
- `app/index.html` loads `resume_data.js` (exports `getResumeContent()` and `DEFAULT_CONTENT`) and `frontend.js` which:
  - Initializes a Three.js `CSS3DRenderer` and places DOM panels into 3D space.
  - Renders header, summary, experience, skills, and education from `getResumeContent()`.
  - Provides an in-page Control Panel to edit content and save to `localStorage`.

---

**Troubleshooting & tips**
- If the page looks broken, open DevTools console to check for module or resource errors.
- When running with Docker, if `docker compose up` exits or the container fails to bind, check which process is using port `8080`.
- To reset in-browser edits, clear `localStorage` for the site or run `localStorage.removeItem('resume_content_v2')` in DevTools.

---

**Files of interest**
- `app/index.html` — entry HTML + control panel markup and CDN includes (Three.js, Tailwind)
- `app/frontend.js` — main client logic (rendering, control panel, localStorage hooks)
- `app/resume_data.js` — default content and the simulated `getResumeContent()` API
- `Dockerfile` & `docker-compose.yml` — build and run with Nginx
- `nginx.conf` — small nginx config used in the image

---

**License & author**
- MIT License
- Author: Fahad Ali — see `app/resume_data.js` for links to GitHub and portfolio

---

If you want, I can:
- Add a short health-check endpoint served by Nginx (redirect) or
- Add a small Makefile / npm script to run the local static server and Docker commands.
Let me know which you'd prefer.
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
[Email](mailto:afahad630@gmail.com) | [GitHub](https://github.com/fahadali323)
