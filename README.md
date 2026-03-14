# 🎮 AI/ML Engineer Portfolio - Gaming Edition

A unique, gaming-themed portfolio website for **Hemachandran Dhinakaran**, Senior AI/ML Engineer, featuring pixel-art aesthetics, retro animations, and gamification elements.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

---

## 🌟 Features

### 🎨 **Design**
- **Pixel-Art Aesthetic**: Retro gaming theme with modern web technologies
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion powered interactions
- **Gaming Elements**: Coin counter, power-up badges, XP bars

### 🧠 **AI/ML Focus**
- **AI Power Stats**: Skill visualization as game stats
- **AI Quest Log**: Projects showcased as completed missions
- **Brain Icon Avatar**: AI-themed pixel-art representation
- **ML-Focused Content**: Tailored for AI/ML engineering expertise

### 🚀 **Technical Features**
- **Full-Stack Application**: React frontend + FastAPI backend
- **MongoDB Integration**: Contact form data persistence
- **RESTful API**: Clean API architecture with `/api` prefix
- **Hot Reload**: Development environment with auto-refresh
- **Production Ready**: Optimized build for deployment

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **shadcn/ui** - Component library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### **Backend**
- **FastAPI** - Modern Python web framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Python 3.10+** - Programming language

### **Database**
- **MongoDB** - NoSQL database for contact messages

### **Fonts**
- **Pixelify Sans** - Display headings
- **Press Start 2P** - UI labels and buttons
- **Figtree** - Body text

---

## 📂 Project Structure

```
/app
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── App.js           # Main application
│   │   ├── App.css          # Custom styles
│   │   └── index.js         # Entry point
│   ├── public/
│   ├── package.json
│   └── .env                 # Frontend environment variables
├── backend/
│   ├── server.py            # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Backend environment variables
├── design_guidelines.md     # Design system documentation
├── GITHUB_PAGES_DEPLOYMENT.md  # Deployment guide
└── README.md               # This file
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 16+ and Yarn
- Python 3.10+
- MongoDB instance (local or Atlas)

### **Installation**

1. **Clone the repository:**
```bash
git clone https://github.com/HemachandranD/portfolio.git
cd portfolio
```

2. **Install frontend dependencies:**
```bash
cd frontend
yarn install
```

3. **Install backend dependencies:**
```bash
cd ../backend
pip install -r requirements.txt
```

4. **Set up environment variables:**

**Frontend** (`/app/frontend/.env`):
```env
REACT_APP_BACKEND_URL=http://localhost:8001/api
```

**Backend** (`/app/backend/.env`):
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
CORS_ORIGINS=http://localhost:3000
```

5. **Start the development servers:**

**Backend:**
```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

**Frontend:**
```bash
cd frontend
yarn start
```

6. **Open your browser:**
```
http://localhost:3000
```

---

## 🎯 Key Sections

### **1. Hero Section**
- Name: **Hemachandran Dhinakaran**
- Title: **Senior AI/ML Engineer**
- Bio: AI/ML expertise with focus on GenAI, MLOps, LLMOps
- CTA Buttons: View Projects, Hire Me

### **2. AI Power Stats**
- Machine Learning & Deep Learning (Level 95)
- MLOps & LLMOps (Level 90)
- Cloud & Infrastructure (Level 85)
- GenAI & LLM Applications (Level 88)
- Python & Data Science (Level 92)

### **3. AI Quest Log (Projects)**
1. **Ask Audio** - AI-powered audio content analysis
2. **MLOps Platform** - Complete MLOps framework on Databricks
3. **FoodSight** - Image classification AI
4. **Local RAG Application** - Secure RAG with LangChain
5. **LLMOps Platform** - LLM operations on Databricks
6. **MCP: AI Toolkit** - Reusable private AI toolkit

### **4. Contact Form**
- Integrated with backend API
- Stores messages in MongoDB
- Toast notifications for feedback

### **5. Footer**
- Social links: GitHub, LinkedIn, Medium
- Quick navigation links
- Copyright information

---

## 🎨 Design System

### **Color Palette**
- **Primary**: `hsl(195 84% 40%)` - Ocean Blue
- **Secondary**: `hsl(46 96% 62%)` - Coin Gold
- **Accent**: `hsl(160 74% 40%)` - Mint Green
- **Background**: `hsl(48 100% 98%)` - Cream
- **Pixel Outline**: `hsl(210 28% 20%)` - Dark Navy

### **Typography**
- **Display**: Pixelify Sans (H1, H2)
- **UI Labels**: Press Start 2P (Buttons, badges)
- **Body**: Figtree (Paragraphs, descriptions)

### **Components**
- Pixel borders (3px solid)
- Box shadows for depth
- Hover animations
- Active state transformations

---

## 🌐 Deployment

### **GitHub Pages (Frontend)**
See detailed guide: [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)

Quick steps:
```bash
cd frontend
yarn add -D gh-pages
# Update package.json with homepage
yarn deploy
```

### **Backend Options**
1. **Render.com** (Free tier)
2. **Railway.app** (Free tier)
3. **Vercel** (Serverless functions)
4. **Keep Emergent** (Current setup)

---

## 📊 API Endpoints

### **Contact Form**
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

### **Get Contact Messages**
```bash
GET /api/contact
```

### **Health Check**
```bash
GET /api/
```

---

## 🧪 Testing

### **Test Contact Form**
```bash
curl -X POST http://localhost:8001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

### **Test Frontend**
```bash
cd frontend
yarn test
```

---

## 🔧 Configuration

### **Environment Variables**

**Frontend:**
- `REACT_APP_BACKEND_URL` - Backend API URL

**Backend:**
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name
- `CORS_ORIGINS` - Allowed origins (comma-separated)

---

## 📈 Performance

- **Lighthouse Score**: 90+ (target)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with code splitting

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 About

**Hemachandran Dhinakaran**
- 🔗 LinkedIn: [linkedin.com/in/hemachandran-dhinakaran-20900b13b](https://www.linkedin.com/in/hemachandran-dhinakaran-20900b13b)
- 📝 Medium: [hemz.medium.com](https://hemz.medium.com)
- 💻 GitHub: [github.com/HemachandranD](https://github.com/HemachandranD)
- 📧 Email: hema18deena@gmail.com

**Role**: Senior AI/ML Engineer @ Tredence Inc

**Expertise**: GenAI, ML/DL, MLOps, LLMOps, Databricks, Azure ML, AWS

---

## 🙏 Acknowledgments

- **Design Inspiration**: Retro gaming aesthetics
- **Component Library**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Google Fonts
- **Animations**: Framer Motion

---

## 📞 Support

For questions or support:
- Open an issue on GitHub
- Connect on LinkedIn
- Read articles on Medium

---

**Built with ❤️ and AI** | © 2025 Hemachandran Dhinakaran

🎮 **Level Up Your Portfolio!**

