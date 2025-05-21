/**
 * This script downloads high-quality images from Unsplash for the LendingForte application
 * 
 * Usage:
 * 1. Run this script with Node.js: node scripts/download-images.js
 * 2. Images will be downloaded to the public/images/lendingforte directory
 * 
 * Note: This script uses the Unsplash Source API, which is free to use and doesn't require authentication
 * for direct image URLs. For production use, consider using the Unsplash API with proper attribution.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Define the image categories and URLs
const images = [
  // Hero images
  {
    name: 'hero-personal.jpg',
    url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1920&auto=format&fit=crop',
    folder: 'hero'
  },
  {
    name: 'hero-mortgage.jpg',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920&auto=format&fit=crop',
    folder: 'hero'
  },
  {
    name: 'hero-business.jpg',
    url: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1920&auto=format&fit=crop',
    folder: 'hero'
  },
  {
    name: 'hero-main.jpg',
    url: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=1920&auto=format&fit=crop',
    folder: 'hero'
  },
  
  // Loan images
  {
    name: 'personal-loan.jpg',
    url: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1200&auto=format&fit=crop',
    folder: 'loans'
  },
  {
    name: 'mortgage.jpg',
    url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop',
    folder: 'loans'
  },
  {
    name: 'business-loan.jpg',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    folder: 'loans'
  },
  
  // About images
  {
    name: 'about-team.jpg',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    folder: 'about'
  },
  {
    name: 'about-mission.jpg',
    url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop',
    folder: 'about'
  },
  {
    name: 'about-values.jpg',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    folder: 'about'
  },
  
  // Testimonial images
  {
    name: 'testimonial-1.jpg',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    folder: 'testimonials'
  },
  {
    name: 'testimonial-2.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    folder: 'testimonials'
  },
  {
    name: 'testimonial-3.jpg',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    folder: 'testimonials'
  },
  
  // Calculator images
  {
    name: 'calculator-bg.jpg',
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
    folder: 'calculator'
  },
  
  // Contact images
  {
    name: 'contact-bg.jpg',
    url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
    folder: 'contact'
  },
  
  // Apply images
  {
    name: 'apply-bg.jpg',
    url: 'https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?q=80&w=1200&auto=format&fit=crop',
    folder: 'apply'
  }
];

// Create directories if they don't exist
const baseDir = path.join(__dirname, '..', 'public', 'images', 'lendingforte');
images.forEach(image => {
  const folder = path.join(baseDir, image.folder);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`Created directory: ${folder}`);
  }
});

// Download images
images.forEach(image => {
  const filePath = path.join(baseDir, image.folder, image.name);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`File already exists: ${filePath}`);
    return;
  }
  
  console.log(`Downloading ${image.url} to ${filePath}...`);
  
  const file = fs.createWriteStream(filePath);
  https.get(image.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded: ${image.name}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${image.name}: ${err.message}`);
  });
});
