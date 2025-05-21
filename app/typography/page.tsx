'use client'

import React from 'react'
import { 
  DisplayText, 
  SectionHeading, 
  SubsectionHeading, 
  LeadParagraph, 
  BodyText, 
  CaptionText, 
  HighlightedText,
  DropCapParagraph,
  PremiumBlockquote
} from '@/components/ui/typography'

export default function TypographyShowcase() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <DisplayText>
          LendingForte Typography System
        </DisplayText>
        
        <LeadParagraph>
          This page showcases the premium typography system implemented throughout the LendingForte application. 
          Our typography is designed to convey sophistication, professionalism, and clarity.
        </LeadParagraph>

        <div className="grid gap-12 mt-12">
          <section>
            <SectionHeading>
              Headings &amp; Display Text
            </SectionHeading>
            
            <div className="space-y-8 mt-8">
              <div>
                <h1 className="font-fraunces text-7xl font-bold tracking-heading mb-2">H1 Heading</h1>
                <CaptionText>Font: Fraunces, Weight: Bold, Size: 7xl (desktop)</CaptionText>
              </div>
              
              <div>
                <h2 className="font-fraunces text-5xl font-semibold tracking-heading mb-2">H2 Heading</h2>
                <CaptionText>Font: Fraunces, Weight: Semibold, Size: 5xl (desktop)</CaptionText>
              </div>
              
              <div>
                <h3 className="font-fraunces text-4xl font-semibold tracking-heading mb-2">H3 Heading</h3>
                <CaptionText>Font: Fraunces, Weight: Semibold, Size: 4xl (desktop)</CaptionText>
              </div>
              
              <div>
                <h4 className="font-fraunces text-3xl font-medium tracking-heading mb-2">H4 Heading</h4>
                <CaptionText>Font: Fraunces, Weight: Medium, Size: 3xl (desktop)</CaptionText>
              </div>
              
              <div>
                <h5 className="font-fraunces text-2xl font-medium tracking-heading mb-2">H5 Heading</h5>
                <CaptionText>Font: Fraunces, Weight: Medium, Size: 2xl (desktop)</CaptionText>
              </div>
              
              <div>
                <h6 className="font-fraunces text-xl font-medium tracking-heading mb-2">H6 Heading</h6>
                <CaptionText>Font: Fraunces, Weight: Medium, Size: xl (desktop)</CaptionText>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading>
              Body Text
            </SectionHeading>
            
            <div className="space-y-8 mt-8">
              <div>
                <LeadParagraph>
                  This is a lead paragraph, used for introductory text. It's larger and lighter than standard body text, 
                  creating visual hierarchy and drawing the reader into the content.
                </LeadParagraph>
                <CaptionText>Font: Outfit, Weight: Light, Size: xl-2xl</CaptionText>
              </div>
              
              <div>
                <BodyText>
                  This is standard body text, used for the main content. It's designed for optimal readability with 
                  appropriate line height and character spacing. The maximum width is constrained to around 75 characters 
                  per line, which research shows is ideal for reading comprehension.
                </BodyText>
                <CaptionText>Font: Outfit, Weight: Regular, Size: base-lg</CaptionText>
              </div>
              
              <div>
                <DropCapParagraph>
                  This paragraph uses a drop cap for the first letter, creating a premium, magazine-like feel. 
                  This style is perfect for article introductions or important sections. The drop cap uses our 
                  serif font to create an elegant contrast with the sans-serif body text.
                </DropCapParagraph>
                <CaptionText>First letter: Fraunces Bold, Body: Outfit Regular</CaptionText>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading>
              Special Text Elements
            </SectionHeading>
            
            <div className="space-y-8 mt-8">
              <div>
                <BodyText>
                  Text can include <HighlightedText>highlighted phrases</HighlightedText> to draw attention to 
                  important information or key points.
                </BodyText>
                <CaptionText>Highlighted text uses a gradient from primary-400 to primary-600</CaptionText>
              </div>
              
              <div>
                <PremiumBlockquote>
                  "LendingForte provided exactly what we needed - a straightforward loan process with competitive rates 
                  and exceptional service. Their team was responsive and knowledgeable throughout the entire process."
                </PremiumBlockquote>
                <CaptionText>Blockquotes use a left border in primary-500 with italic text</CaptionText>
              </div>
              
              <div>
                <CaptionText>
                  This is caption text, used for image captions, footnotes, and supporting information.
                </CaptionText>
                <CaptionText className="mt-2">Font: Outfit, Weight: Regular, Size: sm, Color: gray-400</CaptionText>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
