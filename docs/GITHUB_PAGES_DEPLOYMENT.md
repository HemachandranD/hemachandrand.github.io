# 🚀 Deploy Your Portfolio to GitHub Pages (FREE)

This guide will help you deploy your AI/ML Engineer portfolio to GitHub Pages for free hosting.

## 📋 Prerequisites

- GitHub account (free)
- Git installed on your computer
- Your portfolio code (this project)

---

## 🎯 Step-by-Step Deployment Guide

### **Step 1: Prepare Your Repository**

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `hemachandrand.github.io` (replace with your GitHub username)
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README (we'll push existing code)
   - Click "Create repository"

### **Step 2: Install GitHub Pages Package**

Since this is a React app, we need to install `gh-pages` package:

```bash
cd /app/frontend
yarn add -D gh-pages
```

### **Step 3: Update package.json**

Add these lines to your `/app/frontend/package.json`:

```json
{
  "homepage": "https://hemachandrand.github.io",
  "scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build",
    // ... other scripts
  }
}
```

**Note:** Replace `hemachandrand` with your actual GitHub username.

### **Step 4: Update Backend URL for Production**

Since GitHub Pages only hosts static files (frontend), you have two options:

#### **Backend Service Options**
- Deploy backend to **Render.com** (free tier)
- Deploy backend to **Railway.app** (free tier)
- Deploy backend to **Vercel** (serverless functions)

### **Step 5: Initialize Git and Push to GitHub**

```bash
# Navigate to your project root
cd /app

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI/ML Engineer Portfolio"

# Add your GitHub repository as remote
git remote add origin https://github.com/HemachandranD/hemachandrand.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Step 6: Deploy to GitHub Pages**

```bash
# Navigate to frontend directory
cd /app/frontend

# Deploy to GitHub Pages
yarn deploy
```

This command will:
1. Build your React app
2. Create a `gh-pages` branch
3. Push the build files to that branch
4. GitHub will automatically serve it

### **Step 7: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### **Step 8: Wait for Deployment**

- GitHub will take 1-5 minutes to deploy
- You'll see a green checkmark when ready
- Your site will be live at: `https://hemachandrand.github.io`

---

## 🔧 Alternative: Custom Domain (Optional)

If you want a custom domain like `hemachandran.dev`:

1. Buy a domain from Namecheap, GoDaddy, or Cloudflare
2. Add a `CNAME` file to `/app/frontend/public/` with your domain:
   ```
   hemachandran.dev
   ```
3. Configure DNS records:
   - Add CNAME record: `www` → `hemachandrand.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. In GitHub Settings → Pages, add your custom domain

---

## 🎨 Backend Options for Production

Since GitHub Pages only hosts static files, here are your backend options:

### **Option 1: Deploy Backend to Render.com (FREE)**

1. Create account on https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Environment:** Python 3
5. Add environment variables:
   - `MONGO_URL` (your MongoDB connection string)
   - `DB_NAME`
   - `CORS_ORIGINS=https://hemachandrand.github.io`
6. Deploy!

### **Option 3: Deploy Backend to Railway.app (FREE)**

1. Create account on https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Python and deploys
5. Add environment variables in Railway dashboard
6. Get your backend URL and update frontend `.env.production`

### **Option 4: MongoDB Atlas (FREE Database)**

If you need a production database:

1. Create account on https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 tier)
3. Get connection string
4. Use this in your backend environment variables

---

## 🔄 Updating Your Portfolio

Whenever you make changes:

```bash
# Make your changes
# Commit changes
git add .
git commit -m "Update portfolio"
git push origin main

# Deploy to GitHub Pages
cd /app/frontend
yarn deploy
```

---

## 🐛 Troubleshooting

### **Issue: Blank page after deployment**
- Check browser console for errors
- Ensure `homepage` in `package.json` is correct
- Verify `REACT_APP_BACKEND_URL` is set correctly

### **Issue: 404 on refresh**
- GitHub Pages doesn't support client-side routing by default
- Add a `404.html` that redirects to `index.html`
- Or use hash routing instead of browser routing

### **Issue: Contact form not working**
- Check CORS settings on backend
- Ensure backend URL is correct in `.env.production`
- Check browser console for network errors

---

## 📊 Monitoring & Analytics

Add Google Analytics to track visitors:

1. Create Google Analytics account
2. Get tracking ID
3. Add to `/app/frontend/public/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎉 You're Live!

Your portfolio is now live at:
- **GitHub Pages:** `https://hemachandrand.github.io`
- **Custom Domain:** (if configured)

Share it on:
- LinkedIn profile
- Medium bio
- GitHub profile README
- Resume

---

## 💡 Pro Tips

1. **SEO Optimization:**
   - Add meta tags in `index.html`
   - Create `sitemap.xml`
   - Add `robots.txt`

2. **Performance:**
   - Optimize images
   - Enable lazy loading
   - Use CDN for assets

3. **Security:**
   - Never commit API keys
   - Use environment variables
   - Enable HTTPS (automatic on GitHub Pages)

4. **Maintenance:**
   - Update dependencies regularly
   - Monitor analytics
   - Keep content fresh

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Render.com Docs](https://render.com/docs)
- [Railway.app Docs](https://docs.railway.app/)

---

**Need Help?** Open an issue on your GitHub repository or reach out to the community!

🚀 **Happy Deploying!**
