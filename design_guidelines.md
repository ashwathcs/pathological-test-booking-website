# Design Guidelines for Pathological Test Booking Website

## Design Approach: Healthcare-Focused Design System
**Approach**: Design System (Material Design-inspired)
**Justification**: Healthcare applications require trust, clarity, and accessibility. A systematic approach ensures consistency across complex workflows while maintaining professional credibility.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light mode: 220 100% 25% (deep medical blue)
- Dark mode: 220 80% 75% (soft blue)

**Secondary Colors:**
- Success: 142 76% 36% (medical green)
- Warning: 45 93% 47% (amber)
- Error: 0 84% 60% (red)

**Background Colors:**
- Light: 220 20% 98% (warm white)
- Dark: 220 20% 8% (dark blue-gray)

### B. Typography
**Primary Font**: Inter (via Google Fonts CDN)
**Hierarchy:**
- Headings: 600-700 weight
- Body text: 400-500 weight  
- Labels: 500 weight
- Small text: 400 weight

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, and 12
- Tight spacing: p-2, m-2
- Standard spacing: p-4, m-4, gap-6
- Section spacing: p-8, my-12

### D. Component Library

**Navigation:**
- Clean horizontal header with logo, main nav, and user profile
- Sticky navigation during scroll
- Mobile hamburger menu with slide-out drawer

**Forms:**
- Card-based form sections with subtle shadows
- Large, accessible input fields with clear labels
- Progress indicators for multi-step processes
- Validation states with inline error messages

**Data Displays:**
- Card grids for test catalogs with hover states
- Timeline components for order tracking
- Status badges with appropriate colors
- Clean tables for admin dashboard

**Interactive Elements:**
- Primary buttons with medical blue
- Secondary outline buttons on image backgrounds (with blur backdrop)
- Floating action buttons for key actions
- Loading states with skeleton screens

### E. Key Design Principles

**Trust & Professionalism:**
- Consistent use of medical imagery and iconography
- Clean, uncluttered layouts with generous whitespace
- Professional photography of lab equipment and healthcare professionals

**Accessibility First:**
- High contrast ratios in both light and dark modes
- Large touch targets (minimum 44px)
- Clear focus indicators
- Screen reader friendly structure

**Progressive Disclosure:**
- Multi-step booking process with clear progress indication
- Expandable sections for detailed test information
- Dashboard widgets that reveal details on interaction

## Images
**Hero Section**: Large hero image featuring a clean, modern laboratory setting with medical professionals in a welcoming environment. Should convey trust and professionalism.

**Test Catalog**: Small thumbnail images for different test categories (blood tests, urine tests, etc.) using consistent medical iconography.

**Process Illustrations**: Simple, clean illustrations showing the home collection process - scheduling, sample collection, and report delivery.

**Background Elements**: Subtle medical patterns or gradients, avoiding any imagery that might cause anxiety.

## Special Considerations
- Ensure HIPAA-compliant visual indicators for sensitive medical data
- Use calming, reassuring visual language throughout
- Implement clear visual hierarchy for complex medical information
- Design for various user age groups with scalable text and intuitive navigation