'use client'

import { useEffect } from 'react'

/**
 * FontPreload component to optimize font loading
 * This component preloads critical fonts to improve performance
 * and prevent layout shifts during font loading
 */
export default function FontPreload() {
  useEffect(() => {
    // Preload critical fonts
    const fontFiles = [
      // Outfit font files (primary sans-serif)
      '/fonts/outfit-latin-400-normal.woff2',
      '/fonts/outfit-latin-500-normal.woff2',
      '/fonts/outfit-latin-600-normal.woff2',
      
      // Fraunces font files (serif for headings)
      '/fonts/fraunces-latin-400-normal.woff2',
      '/fonts/fraunces-latin-600-normal.woff2',
      '/fonts/fraunces-latin-700-normal.woff2',
    ]

    // Create link elements for each font file
    fontFiles.forEach(file => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.href = file
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // Apply font display settings
    const style = document.createElement('style')
    style.textContent = `
      @font-face {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/outfit-latin-400-normal.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/outfit-latin-500-normal.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/outfit-latin-600-normal.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Fraunces';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/fraunces-latin-400-normal.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Fraunces';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/fraunces-latin-600-normal.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Fraunces';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/fraunces-latin-700-normal.woff2') format('woff2');
      }
    `
    document.head.appendChild(style)
  }, [])

  return null
}
