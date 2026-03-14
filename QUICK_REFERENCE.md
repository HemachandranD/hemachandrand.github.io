# 🎯 Quick Reference: Portfolio Content Locations

## 📍 ONE FILE TO RULE THEM ALL
**File:** `/app/frontend/src/App.js`

---

## 🗺️ Visual Content Map

```
┌─────────────────────────────────────────────────────────────┐
│                    /app/frontend/src/App.js                 │
└─────────────────────────────────────────────────────────────┘

Line 15:  [coins, setCoins] = useState(42)
          └─> Initial coin count

Lines 19-24:  const skills = [...]
              └─> AI POWER STATS
                  • Skill names
                  • Skill levels (0-100)
                  • Colors
                  • Icons

Lines 26-81:  const projects = [...]
              └─> AI QUEST LOG (Projects)
                  • Project titles
                  • Descriptions
                  • Tags
                  • Coin values
                  • GitHub links
                  • Medium links

Line 91:      mailto:hema18deena@gmail.com
              └─> Contact form email

Line 197:     <Brain className="w-32 h-32 text-white" />
              └─> Avatar icon

Lines 217-219: HEMACHANDRAN DHINAKARAN
               └─> Your name (Hero section)

Lines 226-228: SENIOR AI/ML ENGINEER
               └─> Your title (Hero section)

Lines 237-240: Crafting AI systems...
               └─> Your bio (Hero section)

Lines 285-287: AI POWER STATS
               └─> Skills section title

Lines 347-349: AI QUEST LOG
               └─> Projects section title

Lines 413-415: START AN AI QUEST
               └─> Contact section title

Lines 494-497: HEMACHANDRAN DHINAKARAN
               └─> Footer about text

Lines 540-569: Social links
               └─> GitHub, LinkedIn, Medium

Lines 574-576: © 2025 HEMACHANDRAN DHINAKARAN
               └─> Footer copyright
```

---

## 🎨 Quick Edit Cheat Sheet

### **Skills (AI Power Stats)**
```javascript
// Line 19-24
{ 
  name: "Skill Name",     // ← What you're good at
  level: 95,              // ← How good (0-100)
  color: "--sky-blue",    // ← Bar color
  icon: "⚡"              // ← Emoji icon
}
```

**Available Colors:**
- `--sky-blue` 🔵
- `--mint-green` 🟢
- `--coin-gold` 🟡
- `--heart-red` 🔴
- `--primary` 🌊

---

### **Projects (AI Quest Log)**
```javascript
// Line 26-81
{
  id: 1,                                    // ← Unique number
  title: "Project Name",                    // ← Project title
  description: "Short description",         // ← One-liner
  tags: ["Tag1", "Tag2", "Tag3"],          // ← Tech stack
  coins: 25,                                // ← Difficulty/value
  details: "Long description...",           // ← Full details
  link: "https://github.com/...",          // ← GitHub link
  mediumLink: "https://medium.com/..."     // ← Article link
}
```

---

### **Personal Info**
```javascript
// Line 217: Your Name
HEMACHANDRAN DHINAKARAN

// Line 226: Your Title
SENIOR AI/ML ENGINEER

// Line 237: Your Bio
Crafting AI systems and algorithms...

// Line 91: Your Email
mailto:hema18deena@gmail.com
```

---

### **Social Links**
```javascript
// Line 540: GitHub
href="https://github.com/HemachandranD"

// Line 550: LinkedIn
href="https://www.linkedin.com/in/hemachandran-dhinakaran-20900b13b"

// Line 560: Medium
href="https://hemz.medium.com"
```

---

## 🚀 3-Step Update Process

### **Step 1: Edit**
```bash
# Open the file
nano /app/frontend/src/App.js
# or use your favorite editor
```

### **Step 2: Test**
```bash
cd /app/frontend
yarn start
# Visit http://localhost:3000
```

### **Step 3: Deploy**
```bash
cd /app/frontend
yarn deploy
# Wait 2-5 minutes
```

---

## 📝 Common Updates

### **Add New Skill:**
```javascript
const skills = [
  // ... existing skills
  { name: "New Skill", level: 85, color: "--sky-blue", icon: "🎯" }  // ← Add here
];
```

### **Add New Project:**
```javascript
const projects = [
  // ... existing projects
  {
    id: 7,  // ← Next number
    title: "New Project",
    description: "Description",
    tags: ["Tag1", "Tag2"],
    coins: 20,
    details: "Full description...",
    link: "https://github.com/...",
    mediumLink: "https://medium.com/..."
  }
];
```

### **Update Your Title:**
```javascript
// Line 226
<h2 ...>
  YOUR NEW TITLE HERE  {/* ← Change this */}
</h2>
```

### **Change Email:**
```javascript
// Line 91
window.location.href = `mailto:your-new-email@gmail.com?subject=${subject}&body=${body}`;
//                              ^^^^^^^^^^^^^^^^^^^^^^^^
```

---

## 🎯 Most Common Edits

| What to Update | Line Number | Search For |
|----------------|-------------|------------|
| Skills | 19-24 | `const skills = [` |
| Projects | 26-81 | `const projects = [` |
| Name | 217 | `HEMACHANDRAN DHINAKARAN` |
| Title | 226 | `SENIOR AI/ML ENGINEER` |
| Bio | 237 | `Crafting AI systems` |
| Email | 91 | `mailto:` |
| GitHub | 540 | `href="https://github.com` |
| LinkedIn | 550 | `href="https://www.linkedin.com` |
| Medium | 560 | `href="https://hemz.medium.com` |

---

## 💡 Pro Tips

✅ **Always test locally before deploying**
✅ **Keep backups before major changes**
✅ **Use consistent formatting**
✅ **Update regularly (monthly)**
✅ **Check browser console for errors**

---

## 🔍 Find & Replace Tips

### **Using VS Code:**
- `Ctrl+F` (Windows) or `Cmd+F` (Mac) to find
- `Ctrl+H` (Windows) or `Cmd+H` (Mac) to replace

### **Using Terminal:**
```bash
# Find text
grep -n "HEMACHANDRAN DHINAKARAN" /app/frontend/src/App.js

# Replace text (be careful!)
sed -i 's/OLD_TEXT/NEW_TEXT/g' /app/frontend/src/App.js
```

---

## 📚 Full Guides

- **Detailed Guide:** `/app/CONTENT_UPDATE_GUIDE.md`
- **Deployment:** `/app/GITHUB_PAGES_DEPLOYMENT.md`
- **Security:** `/app/SECURITY_AND_DEPLOYMENT_GUIDE.md`

---

**Everything is in ONE file: `/app/frontend/src/App.js`**

**Just edit, save, and deploy! 🚀**
