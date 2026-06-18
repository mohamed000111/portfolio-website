# Quick Setup Guide - Dr. Mohamed Rabie Shehata

## 🎯 Your Website is Ready!

Everything is already customized with your information from LinkedIn:
- ✅ Your name and professional title
- ✅ Contact details (email, phone, WhatsApp, address)
- ✅ LinkedIn profile link
- ✅ All 5 certifications

## 📥 Files You Need to Upload to GitHub

1. **index.html** - Your main website page
2. **styles.css** - All the styling and design
3. **script.js** - Interactive features (modals, animations)
4. **README.md** - Documentation

## 🚀 Deploy to GitHub Pages (5 Minutes)

### Step 1: Create GitHub Repository
1. Go to https://github.com
2. Click "New Repository" (green button)
3. Name it: `mo-rabie.github.io` (or any name like `portfolio`)
4. Click "Create repository"

### Step 2: Upload Your Files
1. On the repository page, click "uploading an existing file"
2. Drag and drop all 4 files (index.html, styles.css, script.js, README.md)
3. Click "Commit changes"

### Step 3: Enable GitHub Pages
1. Go to "Settings" tab (at the top)
2. Click "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait 1-2 minutes - your site will be live!

### Your Website URL:
- If named `mo-rabie.github.io`: **https://mo-rabie.github.io**
- If named differently: **https://your-username.github.io/repository-name**

## 📸 Optional: Add Your Photo

### Option A: Use a URL
1. Upload your photo somewhere (LinkedIn, Google Drive, etc.)
2. Get the image URL
3. In `index.html`, find this line:
   ```html
   <img src="profile.jpg" alt="Mohamed Rabie Shehata" id="profileImg">
   ```
4. Replace `profile.jpg` with your image URL

### Option B: Upload a File
1. Take/choose a professional photo
2. Crop it to square (500x500px or similar)
3. Save it as `profile.jpg`
4. Upload it to your GitHub repository

## 📄 Optional: Add Your Resume PDF

### From LinkedIn:
1. You already have your Profile.pdf from LinkedIn
2. Rename it to `resume.pdf`
3. Upload it to your GitHub repository

### From Computer:
1. Save your resume as `resume.pdf`
2. Upload it to your GitHub repository

That's it! The download and view buttons will work automatically.

## 📝 Optional: Add Rating & Comment Forms

Want people to leave feedback? Create Google Forms:

### Step 1: Create Forms
1. Go to https://forms.google.com
2. Create two forms:
   - **Form 1**: "Rate Dr. Mohamed Rabie Shehata" (with rating questions)
   - **Form 2**: "Leave a Comment" (with text questions)

### Step 2: Get Form Links
1. Click "Send" button in each form
2. Click the link icon
3. Copy the shortened URL (e.g., `https://forms.gle/abc123`)

### Step 3: Update Your Website
In `index.html`, find these sections and replace with your URLs:

```html
<!-- Line ~164 - Rate Me -->
<a href="https://forms.gle/YOUR-RATING-FORM" target="_blank" class="rating-btn">

<!-- Line ~176 - Comments -->
<a href="https://forms.gle/YOUR-COMMENT-FORM" target="_blank" class="comment-btn">
```

## 🎨 Want to Change Colors?

The website uses blue accent colors. To change them:

1. Open `styles.css`
2. At the top, find this section:
```css
:root {
    --accent-color: #4a9eff;  /* Change this color */
}
```
3. Replace `#4a9eff` with any color code:
   - Green: `#00d084`
   - Purple: `#8b5cf6`
   - Red: `#ef4444`
   - Orange: `#f59e0b`
   - Pick any color from: https://htmlcolorcodes.com

## 📱 Testing Your Website

Before deploying, you can test it:
1. Download all files to a folder on your computer
2. Double-click `index.html`
3. It will open in your browser
4. Test all the buttons and modals

## 🆘 Need Help?

Common issues:

**Website not showing up?**
- Wait 2-3 minutes after enabling GitHub Pages
- Check that files are in the root directory (not in a folder)
- Make sure "main" branch is selected in Settings → Pages

**Images not loading?**
- Make sure file names match exactly (case-sensitive)
- Check that `profile.jpg` is in the same folder as `index.html`

**Links not working?**
- Make sure you updated the URLs in the HTML file
- Check that the URLs start with `https://`

## 🎉 You're All Set!

Your professional website is modern, mobile-friendly, and ready to share:
- Add it to your LinkedIn profile
- Add it to your email signature
- Share it on your business cards
- Include it in your resume

Good luck with your website! 🚀

---
Created: December 2024
Website: https://mo-rabie.github.io (after deployment)
LinkedIn: https://www.linkedin.com/in/mo-rabie
