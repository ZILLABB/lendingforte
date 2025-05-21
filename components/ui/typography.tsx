'use client'

import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Premium Typography Components
 * These components provide consistent, high-quality typography throughout the application
 */

// Display Text - For hero sections and major headlines
export function DisplayText({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'display-text text-gradient-primary mb-6',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

// Section Heading - For main section titles
export function SectionHeading({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'font-fraunces font-semibold text-3xl md:text-4xl lg:text-5xl tracking-heading mb-6',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

// Subsection Heading - For secondary headings
export function SubsectionHeading({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'font-fraunces font-medium text-2xl md:text-3xl tracking-heading mb-4',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

// Lead Paragraph - For introductory text
export function LeadParagraph({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'lead-text mb-6 max-w-prose',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// Body Text - For regular paragraphs
export function BodyText({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-base md:text-lg text-gray-200 leading-relaxed mb-4 max-w-prose',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// Caption Text - For smaller, supporting text
export function CaptionText({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'caption-text',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// Highlighted Text - For emphasizing important phrases
export function HighlightedText({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 font-medium',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Drop Cap Paragraph - For premium article beginnings
export function DropCapParagraph({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'drop-cap text-base md:text-lg text-gray-200 leading-relaxed mb-4 max-w-prose',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// Blockquote - For testimonials and quotes
export function PremiumBlockquote({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        'pl-4 border-l-4 border-primary-500 italic text-gray-300 my-6 py-2 max-w-prose',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  )
}
