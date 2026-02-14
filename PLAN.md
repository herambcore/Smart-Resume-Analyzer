# Smart Resume Analyzer & Score Booster — Step-by-Step Plan

## Overview
A web app that helps students and professionals analyze their resumes and get actionable tips to improve their score and chances of landing interviews.

---

## Step-by-Step Build Plan

### **Step 1: Landing Page (First Page)** ✅
- Hero section with clear value proposition
- Brief feature highlights (analyze, score, boost)
- Call-to-action: "Get Started" / "Analyze My Resume"
- Clean, professional design for both students and professionals
- **Files:** `index.html`, `css/style.css`, `js/main.js`

### **Step 2: Upload & Input Page**
- Form to upload resume (PDF/DOC/DOCX) or paste resume text
- Optional: job description field for targeted analysis
- File validation and drag-and-drop zone
- **Files:** `upload.html`, extend `css/style.css`, `js/upload.js`

### **Step 3: Analysis Engine (Client-Side)**
- Parse resume text (for paste) or use File Reader for uploads
- Score resume on: clarity, keywords, structure, length, action verbs, formatting
- Generate a simple score (e.g., 0–100) and category breakdown
- **Files:** `js/analyzer.js`

### **Step 4: Results & Score Page**
- Display overall score with visual gauge or progress bar
- Section-wise scores (e.g., Experience, Education, Skills)
- Highlight strengths and weaknesses
- **Files:** `results.html`, `js/results.js`

### **Step 5: Score Booster / Tips Page**
- List of actionable recommendations (e.g., "Add quantifiable achievements", "Use stronger action verbs")
- Priority-ordered tips based on analysis
- Copy-paste friendly suggestions
- **Files:** `tips.html` or section in `results.html`, `js/tips.js`

### **Step 6: Polish & Optional Features**
- Responsive design (mobile/tablet)
- Optional: export report as PDF or print view
- Optional: save analysis in browser (localStorage) for return visits

---

## Tech Stack (as requested)
- **HTML5** — structure and semantics
- **CSS3** — layout, typography, animations
- **Vanilla JavaScript** — no frameworks; file handling, scoring logic, DOM updates

---

## Folder Structure
```
resume-analyzer/
├── index.html          ← Landing (first page)
├── upload.html
├── results.html
├── PLAN.md
├── css/
│   └── style.css
└── js/
    ├── main.js
    ├── upload.js
    ├── analyzer.js
    └── results.js
```

Start with **Step 1** (this repo): open `index.html` in a browser to see the landing page.
