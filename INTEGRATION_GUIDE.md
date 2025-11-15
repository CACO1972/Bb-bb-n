# Quick Integration Guide

## Files Included

1. **ImplantXApp.jsx** - Main application component
2. **WelcomeScreen.jsx** - Welcome/landing screen
3. **UserDataForm.jsx** - User data collection form
4. **QuestionCard.jsx** - Question display component
5. **DensityProIntro.jsx** - DensityPro introduction
6. **CalculatingScreen.jsx** - Calculation animation
7. **ResultsScreen.jsx** - Results display
8. **SpecialistCard.jsx** - Specialist card component
9. **implantx-constants.js** - Data and constants
10. **implantx-utils.js** - Utility functions and calculations
11. **README.md** - Full documentation

## Quick Start

### Step 1: Install Dependencies
```bash
npm install react react-dom lucide-react
# or
yarn add react react-dom lucide-react
```

### Step 2: Copy Files
Place all `.jsx` and `.js` files in your `src/components/` directory (or appropriate location).

### Step 3: Use the Component
```jsx
import React from 'react';
import ImplantXApp from './components/ImplantXApp';

function App() {
  return (
    <div className="App">
      <ImplantXApp />
    </div>
  );
}

export default App;
```

### Step 4: Add Tailwind CSS
The app uses Tailwind CSS classes. Make sure you have Tailwind configured:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

Update your `tailwind.config.js`:
```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to your `index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## File Structure
```
your-project/
├── src/
│   ├── components/
│   │   ├── ImplantXApp.jsx
│   │   ├── WelcomeScreen.jsx
│   │   ├── UserDataForm.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── DensityProIntro.jsx
│   │   ├── CalculatingScreen.jsx
│   │   ├── ResultsScreen.jsx
│   │   ├── SpecialistCard.jsx
│   │   ├── implantx-constants.js
│   │   └── implantx-utils.js
│   ├── App.js
│   └── index.css
└── package.json
```

## Customization

### Modify Questions
Edit `implantx-constants.js`:
```js
export const QUESTIONS = [
  {
    id: 'your_question_id',
    title: 'Category',
    question: 'Your question?',
    info: 'Additional information...',
    options: [
      { value: 0, label: 'Option 1', emoji: '✅', risk: 1.0 },
      // ... more options
    ]
  }
];
```

### Adjust Costs
Modify in `implantx-constants.js`:
```js
export const COST_BASE = {
  implant_surgery: 680000,
  abutment: 150000,
  // ... adjust values
};
```

### Change Specialist Data
Edit the `findSpecialists` function in `implantx-utils.js` to connect to your database or API.

## Key Features

### Validation
User inputs are validated in real-time:
- Name: minimum 2 characters
- Age: 18-100 years
- Email: valid format (optional)
- Phone: Chilean format +56XXXXXXXXX (optional)

### Calculation Logic
The success probability is calculated using:
```
Probability = Base(96.4%) × Factor1 × Factor2 × ... × FactorN
```

Bounded between 45% and 98.5%.

### DensityPro Activation
Automatically triggers for:
- Female patients
- Age 45 or older

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Mobile Responsive
The app is fully responsive and works on:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## Performance Tips
- All animations use CSS, not JavaScript
- Components render lazily based on stage
- Minimal re-renders with proper state management

## Troubleshooting

### Icons not showing
Make sure `lucide-react` is installed:
```bash
npm install lucide-react
```

### Tailwind classes not working
Verify Tailwind is properly configured and your build process includes it.

### Animations not smooth
Check that your browser supports CSS animations and transitions.

## Support
For questions or issues, refer to the comprehensive README.md file.

---

**Happy coding!** 🚀
