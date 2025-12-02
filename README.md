# Dr. Mohamed Rabie Shehata - Professional Portfolio Website

A modern, responsive, and animated portfolio website showcasing medical insurance expertise and professional experience. Built with pure HTML, CSS, and JavaScript - perfect for GitHub Pages deployment.

## ✨ Your Website Features

- **Professional Profile** - Dr. Mohamed Rabie Shehata, Medical Insurance Approval Doctor
- **Contact Information** - Email, phone, WhatsApp, and address
- **Resume Section** - Download and view options
- **Certificates Display** - All 5 professional certifications
- **Interactive Elements** - Smooth animations and modern design
- **Social Links** - Direct link to LinkedIn profile
- **Fully Responsive** - Works beautifully on all devices

## 🚀 Quick Setup for GitHub Pages

### Step 1: Create Repository
1. Go to GitHub and create a new repository
2. Name it: `mo-rabie.github.io` (or `your-username.github.io`)

### Step 2: Upload Files
Upload these 4 files to your repository:
- `index.html` - Main page with all your info
- `styles.css` - Modern styling and animations  
- `script.js` - Interactive functionality
- `README.md` - Documentation

### Step 3: Add Your Files
1. **Profile Photo**: Add your professional photo as `profile.jpg`
2. **Resume PDF**: Upload your resume as `resume.pdf` (or update the links in index.html to point to your LinkedIn PDF)

### Step 4: Enable GitHub Pages
1. Go to Settings → Pages
2. Select "main" branch
3. Click Save
4. Your site will be live at `https://mo-rabie.github.io`

That's it! Your professional website is now live! 🎉

## ✅ What's Already Customized

Your website already includes:
- ✅ Your full name: Dr. Mohamed Rabie Shehata
- ✅ Your professional title and company
- ✅ Your contact information (email, phone, WhatsApp, address)
- ✅ Your LinkedIn profile link
- ✅ All 5 of your certifications
- ✅ Professional meta tags for SEO

## 📝 Optional Customizations

### 1. Add Your Profile Photo
- Take or choose a professional photo
- Crop it to square (500x500px recommended)
- Save it as `profile.jpg`
- Upload it to your repository

### 2. Upload Your Resume PDF
Two options:
- **Option A**: Upload your LinkedIn PDF as `resume.pdf` to the repository
- **Option B**: Update the resume links in `index.html` to point to an external URL

To update the resume links, find this section in `index.html`:
```html
<a href="resume.pdf" class="download-btn" download>
    <i class="fas fa-download"></i> Download PDF
</a>
<a href="resume.pdf" class="view-btn" target="_blank">
    <i class="fas fa-eye"></i> View Online
</a>
```

Change `resume.pdf` to your URL if you prefer.

### 3. Link Your Certificate Files (Optional)
If you have digital certificates, you can link them:
1. Upload certificate PDFs/images to your repository (e.g., `cert1.pdf`, `cert2.jpg`)
2. In `index.html`, find the certificates section and update the links:
```html
<a href="cert1.pdf" target="_blank">View Certificate</a>
```

### 4. Add Rating & Comment Forms
Create Google Forms for ratings and comments:
1. Create forms at https://forms.google.com
2. Get the shareable links
3. Update these sections in `index.html`:

```html
<!-- Rate Me Modal -->
<a href="https://forms.gle/YOUR-RATING-FORM-ID" target="_blank" class="rating-btn">

<!-- Comment Modal -->
<a href="https://forms.gle/YOUR-COMMENT-FORM-ID" target="_blank" class="comment-btn">
```

## 🎨 Color Customization

To change the color scheme, edit the CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #1a1a1a;        /* Main background */
    --bg-secondary: #2a2a2a;      /* Secondary background */
    --bg-card: #1e1e1e;           /* Card background */
    --text-primary: #ffffff;       /* Main text color */
    --text-secondary: #a0a0a0;    /* Secondary text */
    --accent-color: #4a9eff;      /* Accent/brand color */
    --hover-color: #2a2a2a;       /* Hover state color */
}
```

## 🌐 Adding More Social Media

Add more social media links in the social section:

```html
<a href="https://twitter.com/yourhandle" target="_blank" class="link-card social-link">
    <div class="icon">
        <i class="fab fa-twitter"></i>
    </div>
    <div class="link-content">
        <h3>Twitter Profile</h3>
    </div>
    <i class="fas fa-external-link-alt arrow"></i>
</a>
```

Available social icons (using Font Awesome):
- `fab fa-linkedin` - LinkedIn
- `fab fa-twitter` - Twitter
- `fab fa-github` - GitHub
- `fab fa-instagram` - Instagram
- `fab fa-facebook` - Facebook
- `fab fa-youtube` - YouTube

## 📱 Adding More Sections

To add a new section with a modal:

1. Add the link card in `index.html`
2. Create a new modal
3. Add the modal logic in `script.js`

Example:

```html
<!-- Link Card -->
<a href="#portfolio" class="link-card" data-section="portfolio">
    <div class="icon">
        <i class="fas fa-briefcase"></i>
    </div>
    <div class="link-content">
        <h3>My Portfolio</h3>
    </div>
    <i class="fas fa-chevron-right arrow"></i>
</a>

<!-- Modal -->
<div id="portfolioModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2><i class="fas fa-briefcase"></i> My Portfolio</h2>
        <!-- Your portfolio content here -->
    </div>
</div>
```

Then add to `script.js`:

```javascript
const modals = {
    contact: document.getElementById('contactModal'),
    resume: document.getElementById('resumeModal'),
    certificates: document.getElementById('certificatesModal'),
    rate: document.getElementById('rateModal'),
    comment: document.getElementById('commentModal'),
    portfolio: document.getElementById('portfolioModal') // Add this line
};
```

## 🔧 Technical Details

- **No Build Process Required** - Pure HTML/CSS/JS
- **No Dependencies** - Only uses Font Awesome CDN for icons
- **Fully Responsive** - Mobile-first design approach
- **Cross-browser Compatible** - Works on all modern browsers
- **Fast Performance** - Optimized animations and minimal resources

## 📄 File Structure

```
your-username.github.io/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
├── profile.jpg         # Your profile photo
├── resume.pdf          # Your resume (optional)
└── README.md           # This file
```

## 🎯 SEO Optimization Tips

1. Add a custom domain (optional)
2. Update the `<title>` tag with your name
3. Add meta description in `<head>`:
```html
<meta name="description" content="Your professional description">
<meta name="keywords" content="your, keywords, here">
```

## 📞 Support

If you need help or have questions:
1. Check GitHub Pages documentation
2. Review Font Awesome documentation for icons
3. Test your site locally before deploying

## 📜 License

Free to use for personal and commercial projects.

---

Made with ❤️ using HTML, CSS, and JavaScript
```
