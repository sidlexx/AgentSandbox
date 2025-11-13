# Design Guidelines: AI-Powered Agent Training Sandbox

## Design Approach
**System-Based with Productivity Focus**: Drawing from Linear's clean aesthetics, Material Design's structured components, and Duolingo's gamification patterns. This is a professional training platform requiring clarity, efficiency, and engagement.

## Typography System

**Primary Font**: Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400-500 weight
- UI Elements: 500 weight

**Hierarchy**:
- Page Titles: text-3xl font-semibold
- Section Headers: text-xl font-semibold
- Card Titles: text-lg font-medium
- Body Text: text-base
- Captions/Metadata: text-sm text-gray-600

## Layout & Spacing

**Container System**:
- Main content: max-w-7xl mx-auto px-6
- Dashboard cards: max-w-md to max-w-2xl
- Forms: max-w-xl

**Spacing Scale** (Tailwind units):
- Micro spacing: 2, 4 (buttons, badges)
- Component padding: 4, 6, 8
- Section spacing: 8, 12, 16
- Page margins: 16, 20, 24

## Component Library

### Navigation
**Top Navigation Bar**:
- Fixed header with backdrop-blur-lg bg-white/80
- Height: h-16
- Logo left, nav items center, user profile right
- Active state: border-b-2 border-[#4A90E2]

**Left Sidebar** (subsection navigation):
- Width: w-64
- Sticky positioning
- Items: p-3 rounded-lg hover:bg-gray-100
- Active: bg-blue-50 border-l-4 border-[#4A90E2]

### Cards & Containers
**Standard Card**:
- Background: bg-white
- Border: border border-gray-200
- Rounded: rounded-xl
- Shadow: shadow-sm hover:shadow-md transition
- Padding: p-6

**Dashboard Widgets**:
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Stat cards: Compact with large numbers (text-4xl font-bold)
- Chart cards: Taller with p-8 padding

### Forms & Inputs
**Input Fields**:
- Border: border-2 border-gray-300 focus:border-[#4A90E2]
- Rounded: rounded-lg
- Padding: px-4 py-3
- Labels: text-sm font-medium mb-2 block

**Buttons**:
- Primary: bg-[#4A90E2] text-white px-6 py-3 rounded-lg font-medium
- Secondary: border-2 border-[#4A90E2] text-[#4A90E2]
- Success: bg-[#52C41A]
- Sizes: Small (px-4 py-2), Medium (px-6 py-3), Large (px-8 py-4)

### Gamification Elements
**Progress Indicators**:
- Circular progress: SVG with stroke-dasharray, 120px diameter
- Progress bars: h-2 rounded-full bg-gray-200 with fill color
- XP counters: Badge-style with rounded-full bg-[#7B68EE] text-white px-4 py-1

**Badges & Achievements**:
- Icon-based with rounded-xl background
- Size: w-16 h-16 for achievement icons
- Unlocked: Vibrant colors with subtle shadow
- Locked: grayscale filter opacity-50

**Leaderboard**:
- Alternating row backgrounds (bg-gray-50 for even rows)
- Top 3 highlighted with gold/silver/bronze left border
- Avatar + name + score layout with gap-4

### Training & Simulation Components
**Skill Tree Visualization**:
- Node size: w-20 h-20 rounded-full
- Connecting lines: border-l-2 border-t-2 border-gray-300
- Locked: border-2 border-gray-300 bg-gray-100
- Unlocked: border-2 border-[#4A90E2] bg-blue-50
- Completed: bg-[#52C41A] text-white

**Simulation Interface**:
- Split layout: 60% chat area, 40% feedback panel
- Chat bubbles: User (bg-blue-100 ml-auto), AI (bg-gray-100)
- Feedback panel: Sticky with real-time metrics in grid-cols-3
- Sentiment meter: Animated progress bar with emoji indicators

**Quiz Components**:
- Multiple choice: Large clickable cards with border-2 hover:border-[#4A90E2]
- Selected state: bg-blue-50 border-[#4A90E2]
- Correct/incorrect: Green/red border animation

### Analytics & Charts
**Chart Containers**:
- White background with p-8
- Title + time range selector in header
- Chart height: h-64 to h-96 depending on complexity
- Use recharts library styled with brand colors

**Metric Cards**:
- Large number display: text-5xl font-bold
- Trend indicator: Arrow icon + percentage in text-sm
- Comparison text: text-gray-600 text-sm

### Knowledge Base
**Search Bar**:
- Prominent placement: w-full max-w-2xl
- Large input: py-4 text-lg
- Search icon left, AI sparkle icon right
- Autocomplete dropdown: shadow-xl rounded-lg

**FAQ/Article Cards**:
- Expandable accordion style
- Category badges on left
- Click to expand with smooth animation

## Special Interactions

**Page Transitions**: 
- Slide animation using Framer Motion
- Duration: 300ms ease-in-out

**Loading States**:
- Skeleton screens for content areas
- Spinner for button actions
- Progress bars for uploads/processing

**Onboarding Wizard**:
- Multi-step progress indicator at top (circles with connecting lines)
- Current step: Filled circle with bg-[#4A90E2]
- Content: Centered max-w-2xl with generous spacing
- Navigation: Back/Next buttons at bottom

## Responsive Breakpoints
- Mobile: Stack all grids to single column
- Tablet (md:): 2-column grids, sidebar toggleable
- Desktop (lg:): Full multi-column layouts, persistent sidebar

## Imagery
No hero images needed - this is a productivity tool. Use:
- Illustration icons for empty states (undraw.co style)
- Achievement badge graphics
- Avatar placeholders for users
- Chart visualizations as primary visual elements