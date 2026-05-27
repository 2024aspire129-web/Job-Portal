# Job Portal

A full-stack job portal where candidates can browse and apply for jobs, while recruiters/admins can manage companies, job posts, and applications.

## Live Demo

- Frontend: https://job-portal-woad-six-61.vercel.app
- Backend: https://job-portal-backend-781h.onrender.com
- Backend Health: https://job-portal-backend-781h.onrender.com/health

## Features

- Candidate and recruiter authentication
- Browse latest job openings
- Search and filter jobs by location, industry, and salary
- Single-click filter toggle and clear filters
- Job details and application flow
- Recruiter company management
- Recruiter job posting
- Applicant status management
- Profile update with Cloudinary upload support

## Tech Stack

### Frontend

- React
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Shadcn/Radix UI
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based auth
- Multer
- Cloudinary
- CORS

## Project Structure

```text
Job-Portal/
  backend/
    controllers/
    middlewares/
    models/
    routes/
    utils/
    index.js
  frontend/
    src/
      components/
      hooks/
      redux/
      utils/
```

## Local Setup

Clone the repository:

```bash
git clone https://github.com/2024aspire129-web/Job-Portal.git
cd Job-Portal
```

Install backend dependencies:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start backend:

```bash
npm run dev
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Start frontend:

```bash
npm run dev
```

## Production Environment Variables

### Backend

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://job-portal-woad-six-61.vercel.app
NODE_ENV=production
```

### Frontend

```env
VITE_API_BASE_URL=https://job-portal-backend-781h.onrender.com/api/v1
```

The frontend also handles a backend root URL automatically, so this also works:

```env
VITE_API_BASE_URL=https://job-portal-backend-781h.onrender.com
```

## Deployment

### Backend on Render

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add all backend production environment variables in Render.

### Frontend on Vercel

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_API_BASE_URL` in Vercel environment variables.

## API Checks

Backend health:

```text
GET /health
```

Jobs API:

```text
GET /api/v1/job/get
```

Expected health response:

```json
{
  "success": true,
  "api": "running",
  "database": "connected"
}
```

## Notes

- MongoDB Atlas network access must allow the deployed backend.
- Render backend must include the deployed Vercel URL in `FRONTEND_URL`.
- Vercel frontend must include the deployed backend URL in `VITE_API_BASE_URL`.
- Do not commit real `.env` secrets to GitHub.
