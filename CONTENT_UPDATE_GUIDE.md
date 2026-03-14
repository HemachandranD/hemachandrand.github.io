# 📝 Portfolio Content Update Guide

## 🎯 Quick Reference: Where to Update What

All content is in **ONE FILE**: `/app/frontend/src/App.js`

---

## 📍 Content Location Map

```
/app/frontend/src/App.js
├── Lines 19-24   → AI Power Stats (Skills)
├── Lines 26-81   → Projects (AI Quest Log)
├── Lines 217-219 → Your Name
├── Lines 226-228 → Your Title
├── Lines 237-240 → Your Bio
├── Lines 494-497 → Footer About
├── Lines 540-569 → Social Links
└── Lines 574-576 → Footer Copyright
```

---

## 🧠 1. Update AI Power Stats (Skills)

**Location:** Lines 19-24 in `/app/frontend/src/App.js`

### Current Code:
```javascript
const skills = [
  { name: "Machine Learning & Deep Learning", level: 95, color: "--sky-blue", icon: "⚡" },
  { name: "MLOps & LLMOps", level: 90, color: "--mint-green", icon: "🔋" },
  { name: "Cloud & Infrastructure", level: 85, color: "--coin-gold", icon: "✨" },
  { name: "GenAI & LLM Applications", level: 88, color: "--heart-red", icon: "💪" },
  { name: "Python & Data Science", level: 92, color: "--primary", icon: "🎯" }
];
```

### How to Update:

#### **Change Skill Name:**
```javascript
{ name: "Your New Skill Name", level: 95, color: "--sky-blue", icon: "⚡" }
```

#### **Change Skill Level (0-100):**
```javascript
{ name: "Machine Learning & Deep Learning", level: 98, color: "--sky-blue", icon: "⚡" }
//                                                    ^^
//                                                  Change this
```

#### **Change Skill Color:**
Available colors:
- `--sky-blue` (Blue)
- `--mint-green` (Green)
- `--coin-gold` (Gold/Yellow)
- `--heart-red` (Red)
- `--primary` (Ocean Blue)

```javascript
{ name: "Machine Learning & Deep Learning", level: 95, color: "--mint-green", icon: "⚡" }
//                                                            ^^^^^^^^^^^^^^
//                                                            Change this
```

#### **Change Icon:**
```javascript
{ name: "Machine Learning & Deep Learning", level: 95, color: "--sky-blue", icon: "🚀" }
//                                                                                 ^^
//                                                                            Change this
```

#### **Add New Skill:**
```javascript
const skills = [
  { name: "Machine Learning & Deep Learning", level: 95, color: "--sky-blue", icon: "⚡" },
  { name: "MLOps & LLMOps", level: 90, color: "--mint-green", icon: "🔋" },
  { name: "Cloud & Infrastructure", level: 85, color: "--coin-gold", icon: "✨" },
  { name: "GenAI & LLM Applications", level: 88, color: "--heart-red", icon: "💪" },
  { name: "Python & Data Science", level: 92, color: "--primary", icon: "🎯" },
  { name: "Your New Skill", level: 85, color: "--sky-blue", icon: "🎨" }  // ← Add this line
];
```

#### **Remove a Skill:**
Simply delete the entire line:
```javascript
const skills = [
  { name: "Machine Learning & Deep Learning", level: 95, color: "--sky-blue", icon: "⚡" },
  { name: "MLOps & LLMOps", level: 90, color: "--mint-green", icon: "🔋" },
  // Delete the line you don't want
  { name: "GenAI & LLM Applications", level: 88, color: "--heart-red", icon: "💪" },
  { name: "Python & Data Science", level: 92, color: "--primary", icon: "🎯" }
];
```

---

## 🚀 2. Update Projects (AI Quest Log)

**Location:** Lines 26-81 in `/app/frontend/src/App.js`

### Current Structure:
```javascript
const projects = [
  {
    id: 1,
    title: "Ask Audio",
    description: "AI-powered audio content analysis and summarization",
    tags: ["AI", "NLP", "Audio"],
    coins: 25,
    details: "Revolutionizing audio content analysis with AI...",
    link: "https://github.com/HemachandranD",
    mediumLink: "https://www.linkedin.com/pulse/ask-audio-hemachandran-dhinakaran"
  },
  // ... more projects
];
```

### How to Update:

#### **Change Project Title:**
```javascript
{
  id: 1,
  title: "Your New Project Name",  // ← Change this
  description: "AI-powered audio content analysis and summarization",
  // ...
}
```

#### **Change Project Description:**
```javascript
{
  id: 1,
  title: "Ask Audio",
  description: "Your new description here",  // ← Change this
  // ...
}
```

#### **Change Project Tags:**
```javascript
{
  id: 1,
  title: "Ask Audio",
  description: "AI-powered audio content analysis and summarization",
  tags: ["Python", "TensorFlow", "AWS"],  // ← Change these
  // ...
}
```

#### **Change Coin Value:**
```javascript
{
  id: 1,
  title: "Ask Audio",
  description: "AI-powered audio content analysis and summarization",
  tags: ["AI", "NLP", "Audio"],
  coins: 30,  // ← Change this (any number)
  // ...
}
```

#### **Change Project Details (shown in dialog):**
```javascript
{
  id: 1,
  title: "Ask Audio",
  description: "AI-powered audio content analysis and summarization",
  tags: ["AI", "NLP", "Audio"],
  coins: 25,
  details: "Your detailed project description here. This appears when users click the project card.",  // ← Change this
  // ...
}
```

#### **Change Project Links:**
```javascript
{
  id: 1,
  title: "Ask Audio",
  description: "AI-powered audio content analysis and summarization",
  tags: ["AI", "NLP", "Audio"],
  coins: 25,
  details: "Revolutionizing audio content analysis with AI...",
  link: "https://github.com/YourUsername/YourRepo",  // ← GitHub link
  mediumLink: "https://your-article-link.com"  // ← Medium/Blog link
}
```

#### **Add New Project:**
```javascript
const projects = [
  {
    id: 1,
    title: "Ask Audio",
    // ... existing project
  },
  {
    id: 2,
    title: "MLOps Platform",
    // ... existing project
  },
  // Add new project here:
  {
    id: 7,  // ← Increment ID
    title: "Your New Project",
    description: "Short description",
    tags: ["Tag1", "Tag2", "Tag3"],
    coins: 20,
    details: "Detailed description of your project...",
    link: "https://github.com/YourUsername/YourRepo",
    mediumLink: "https://your-article-link.com"
  }
];
```

#### **Remove a Project:**
Simply delete the entire project object:
```javascript
const projects = [
  {
    id: 1,
    title: "Ask Audio",
    // ...
  },
  // Delete this entire block to remove a project
  // {
  //   id: 2,
  //   title: "MLOps Platform",
  //   ...
  // },
  {
    id: 3,
    title: "FoodSight",
    // ...
  }
];
```

---

## 👤 3. Update Personal Information

### **Your Name**
**Location:** Lines 217-219

```javascript
<h1 className="font-pixel text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" data-testid="hero-title">
  HEMACHANDRAN DHINAKARAN  {/* ← Change this */}
</h1>
```

### **Your Title**
**Location:** Lines 226-228

```javascript
<h2 className="font-press-start text-base sm:text-lg text-[hsl(var(--primary))] tracking-wide" data-testid="hero-subtitle">
  SENIOR AI/ML ENGINEER  {/* ← Change this */}
</h2>
```

### **Your Bio**
**Location:** Lines 237-240

```javascript
<motion.p
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="text-base sm:text-base leading-relaxed text-[hsl(var(--muted-foreground))]"
  data-testid="hero-description"
>
  Crafting AI systems and algorithms for tomorrow's innovations. Level 99 AI/ML Engineer with max XP in GenAI, MLOps, LLMOps, and building production-grade machine learning solutions on cloud platforms.
  {/* ↑ Change this entire paragraph */}
</motion.p>
```

---

## 🔗 4. Update Social Links

**Location:** Lines 540-569

### **GitHub Link:**
```javascript
<motion.a
  whileHover={{ y: -4 }}
  href="https://github.com/HemachandranD"  {/* ← Change this */}
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 bg-white border-[3px] border-white flex items-center justify-center hover:bg-[hsl(var(--coin-gold))] transition-colors"
  data-testid="footer-social-github"
>
  <Github className="w-6 h-6 text-[hsl(var(--pixel-outline))]" />
</motion.a>
```

### **LinkedIn Link:**
```javascript
<motion.a
  whileHover={{ y: -4 }}
  href="https://www.linkedin.com/in/hemachandran-dhinakaran-20900b13b"  {/* ← Change this */}
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 bg-white border-[3px] border-white flex items-center justify-center hover:bg-[hsl(var(--coin-gold))] transition-colors"
  data-testid="footer-social-linkedin"
>
  <Linkedin className="w-6 h-6 text-[hsl(var(--pixel-outline))]" />
</motion.a>
```

### **Medium Link:**
```javascript
<motion.a
  whileHover={{ y: -4 }}
  href="https://hemz.medium.com"  {/* ← Change this */}
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 bg-white border-[3px] border-white flex items-center justify-center hover:bg-[hsl(var(--coin-gold))] transition-colors"
  data-testid="footer-social-medium"
>
  <Mail className="w-6 h-6 text-[hsl(var(--pixel-outline))]" />
</motion.a>
```

### **Add Twitter/X Link:**
If you want to add Twitter back:

1. **Import Twitter icon** (Line 11):
```javascript
import { Github, Linkedin, Mail, Sparkles, Zap, Heart, Code, Rocket, Star, Brain, Twitter } from "lucide-react";
//                                                                                            ^^^^^^^ Add this
```

2. **Add Twitter link** (after Medium link, around line 569):
```javascript
<motion.a
  whileHover={{ y: -4 }}
  href="https://twitter.com/YourHandle"
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 bg-white border-[3px] border-white flex items-center justify-center hover:bg-[hsl(var(--coin-gold))] transition-colors"
  data-testid="footer-social-twitter"
>
  <Twitter className="w-6 h-6 text-[hsl(var(--pixel-outline))]" />
</motion.a>
```

---

## 📄 5. Update Footer

### **Footer About Text**
**Location:** Lines 494-497

```javascript
<div data-testid="footer-about">
  <h3 className="font-pixel text-xl mb-4">HEMACHANDRAN DHINAKARAN</h3>  {/* ← Change name */}
  <p className="text-sm text-gray-300">
    Senior AI/ML Engineer crafting intelligent systems. Building tomorrow's AI innovations today.
    {/* ↑ Change this description */}
  </p>
</div>
```

### **Footer Copyright**
**Location:** Lines 574-576

```javascript
<p className="font-press-start text-xs text-gray-300" data-testid="footer-copyright">
  © 2025 HEMACHANDRAN DHINAKARAN. BUILT WITH <Heart className="inline w-3 h-3 text-[hsl(var(--heart-red))] fill-[hsl(var(--heart-red))]" /> & AI
  {/* ↑ Change name and year */}
</p>
```

---

## 🎨 6. Update Colors & Styling

### **Change Avatar Icon**
**Location:** Line 197

Current: Brain icon
```javascript
<Brain className="w-32 h-32 text-white" />
```

Change to different icon:
```javascript
<Code className="w-32 h-32 text-white" />    // Code icon
<Rocket className="w-32 h-32 text-white" />  // Rocket icon
<Zap className="w-32 h-32 text-white" />     // Lightning icon
```

### **Change Coin Counter Initial Value**
**Location:** Line 15

```javascript
const [coins, setCoins] = useState(42);  // ← Change this number
```

---

## 📧 7. Update Contact Form Email

### **For Email Client Option:**
**Location:** Line 91 (in handleSubmit function)

```javascript
window.location.href = `mailto:hema18deena@gmail.com?subject=${subject}&body=${body}`;
//                              ^^^^^^^^^^^^^^^^^^^^
//                              Change this to your email
```

### **For FormSubmit.co Option:**
**Location:** Line 97 (if using Option 2)

```javascript
const response = await fetch('https://formsubmit.co/hema18deena@gmail.com', {
//                                                     ^^^^^^^^^^^^^^^^^^^^
//                                                     Change this to your email
```

---

## 🔄 8. How to Apply Changes

### **After Making Changes:**

1. **Save the file:**
```bash
# Changes are auto-saved in most editors
```

2. **Test locally:**
```bash
cd /app/frontend
yarn start
# Visit http://localhost:3000
```

3. **Deploy to GitHub Pages:**
```bash
cd /app/frontend
yarn deploy
```

4. **Wait 2-5 minutes** for changes to appear on your live site

---

## 📝 9. Common Updates Checklist

### **When Starting a New Job:**
- [ ] Update title (Line 226-228)
- [ ] Update bio (Line 237-240)
- [ ] Update footer about (Line 494-497)
- [ ] Update copyright year (Line 574-576)

### **When Completing a New Project:**
- [ ] Add new project to projects array (Line 26-81)
- [ ] Update project links
- [ ] Increment project ID

### **When Learning New Skills:**
- [ ] Add new skill to skills array (Line 19-24)
- [ ] Adjust skill levels
- [ ] Update bio to reflect new expertise

### **When Changing Social Media:**
- [ ] Update social links (Line 540-569)
- [ ] Add/remove social icons

---

## 🎯 Quick Examples

### **Example 1: Add a New Skill**

**Before:**
```javascript
const skills = [
  { name: "Machine Learning & Deep Learning", level: 95, color: "--sky-blue", icon: "⚡" },
  { name: "MLOps & LLMOps", level: 90, color: "--mint-green", icon: "🔋" }
];
```

**After:**
```javascript
const skills = [
  { name: "Machine Learning & Deep Learning", level: 95, color: "--sky-blue", icon: "⚡" },
  { name: "MLOps & LLMOps", level: 90, color: "--mint-green", icon: "🔋" },
  { name: "Computer Vision", level: 88, color: "--heart-red", icon: "👁️" }  // ← Added
];
```

---

### **Example 2: Update Project Details**

**Before:**
```javascript
{
  id: 1,
  title: "Ask Audio",
  description: "AI-powered audio content analysis",
  tags: ["AI", "NLP"],
  coins: 25,
  details: "Old description...",
  link: "https://github.com/HemachandranD",
  mediumLink: "https://old-link.com"
}
```

**After:**
```javascript
{
  id: 1,
  title: "Ask Audio Pro",  // ← Updated title
  description: "Advanced AI-powered audio analysis with real-time transcription",  // ← Updated
  tags: ["AI", "NLP", "Audio", "Real-time"],  // ← Added tag
  coins: 30,  // ← Increased coins
  details: "New detailed description with latest features...",  // ← Updated
  link: "https://github.com/HemachandranD/ask-audio-pro",  // ← Updated
  mediumLink: "https://new-article-link.com"  // ← Updated
}
```

---

### **Example 3: Change Your Title**

**Before:**
```javascript
<h2 className="font-press-start text-base sm:text-lg text-[hsl(var(--primary))] tracking-wide" data-testid="hero-subtitle">
  SENIOR AI/ML ENGINEER
</h2>
```

**After:**
```javascript
<h2 className="font-press-start text-base sm:text-lg text-[hsl(var(--primary))] tracking-wide" data-testid="hero-subtitle">
  LEAD AI ARCHITECT
</h2>
```

---

## 🛠️ Pro Tips

### **1. Keep Backups:**
```bash
# Before making major changes
cp /app/frontend/src/App.js /app/frontend/src/App.backup.js
```

### **2. Test Locally First:**
```bash
cd /app/frontend
yarn start
# Check http://localhost:3000 before deploying
```

### **3. Use Consistent Formatting:**
- Keep skill levels between 0-100
- Use 2-4 tags per project
- Keep descriptions concise (1-2 sentences)
- Use consistent coin values (10-35 range)

### **4. Update Regularly:**
- Add new projects as you complete them
- Update skill levels as you improve
- Keep bio current with latest role
- Update copyright year annually

---

## 📚 Additional Resources

- **Color Reference:** See `/app/design_guidelines.md` for all available colors
- **Icon Reference:** [Lucide Icons](https://lucide.dev/) for all available icons
- **Deployment Guide:** See `/app/GITHUB_PAGES_DEPLOYMENT.md`

---

## 🆘 Need Help?

### **Common Issues:**

**Q: Changes not showing up?**
- Clear browser cache (Ctrl+Shift+R)
- Wait 5 minutes after deployment
- Check for syntax errors in console

**Q: Broke something?**
- Restore from backup: `cp App.backup.js App.js`
- Check browser console for errors
- Verify all brackets and commas are correct

**Q: Want to add more sections?**
- Follow the existing pattern
- Copy a similar section and modify
- Keep consistent styling

---

**Happy Updating! 🎮✨**

All your content is in ONE file: `/app/frontend/src/App.js`

Just edit, save, and deploy! 🚀
