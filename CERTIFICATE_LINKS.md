# Certificate Links Reference

This file shows you exactly where your certificates are in the code, 
so you can easily add links to them if you have digital copies.

## Your Certificates in index.html

Look for the "Certificates Modal" section (around line 137-171).
Here's what you have:

### Certificate 1: Introduction to Generative AI
```html
<div class="cert-item">
    <i class="fas fa-award"></i>
    <h3>Introduction to Generative AI</h3>
    <p>Professional Certification</p>
    <a href="#" target="_blank">View Certificate</a>  <!-- Replace # with your link -->
</div>
```

### Certificate 2: First Aid Tournament
```html
<div class="cert-item">
    <i class="fas fa-award"></i>
    <h3>First Aid Tournament</h3>
    <p>Medical Training</p>
    <a href="#" target="_blank">View Certificate</a>  <!-- Replace # with your link -->
</div>
```

### Certificate 3: DOAC - Related Bleeding
```html
<div class="cert-item">
    <i class="fas fa-award"></i>
    <h3>DOAC - Related Bleeding</h3>
    <p>Medical Certification</p>
    <a href="#" target="_blank">View Certificate</a>  <!-- Replace # with your link -->
</div>
```

### Certificate 4: Information Security Training 2022
```html
<div class="cert-item">
    <i class="fas fa-award"></i>
    <h3>Information Security Training 2022</h3>
    <p>Cybersecurity</p>
    <a href="#" target="_blank">View Certificate</a>  <!-- Replace # with your link -->
</div>
```

### Certificate 5: Public Speaking
```html
<div class="cert-item">
    <i class="fas fa-award"></i>
    <h3>Public Speaking: Be a Professional Speaker</h3>
    <p>Communication Skills</p>
    <a href="#" target="_blank">View Certificate</a>  <!-- Replace # with your link -->
</div>
```

## How to Add Certificate Links

### Option 1: Upload Certificate Files
1. Save your certificate PDFs/images with simple names:
   - `cert-generative-ai.pdf`
   - `cert-first-aid.pdf`
   - `cert-doac.pdf`
   - `cert-info-security.pdf`
   - `cert-public-speaking.pdf`

2. Upload them to your GitHub repository

3. Replace the `#` with the filename:
   ```html
   <a href="cert-generative-ai.pdf" target="_blank">View Certificate</a>
   ```

### Option 2: Use External Links
If your certificates are on other websites (LinkedIn, Coursera, etc.):

1. Get the full URL of each certificate
2. Replace the `#` with the URL:
   ```html
   <a href="https://www.linkedin.com/in/mo-rabie/details/certifications/" target="_blank">View Certificate</a>
   ```

### Option 3: Keep as "#" (No Links)
If you don't have digital copies, just leave the `#` as is.
The certificates will still show beautifully, the "View Certificate" 
link just won't go anywhere when clicked.

## Quick Find & Replace

To make changes quickly:
1. Open `index.html` in any text editor (Notepad, VS Code, etc.)
2. Press Ctrl+F (or Cmd+F on Mac)
3. Search for: `<a href="#" target="_blank">View Certificate</a>`
4. Replace each one with your link

Example:
```html
<!-- Before -->
<a href="#" target="_blank">View Certificate</a>

<!-- After -->
<a href="cert-generative-ai.pdf" target="_blank">View Certificate</a>
```

## Testing Links

After adding links:
1. Open `index.html` in your browser
2. Click "certificates" card
3. Click "View Certificate" on each one
4. Make sure they open correctly

That's it! Your certificates section is now fully functional.
