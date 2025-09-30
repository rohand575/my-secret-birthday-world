# 🎉 Birthday World - A Romantic Birthday Website

A beautiful, interactive single-page website to celebrate your girlfriend's birthday with memories, love notes, a quiz, and special surprises!

## ✨ Features

- **🔐 Secret Login Gate** - Password-protected entry with a personal question
- **⏰ Live Countdown** - Counts down to her birthday with fireworks when it arrives
- **📖 Interactive Timeline** - Scrollable timeline of your special moments together
- **📸 Photo Gallery** - Beautiful grid with optional audio memory notes
- **🎮 Love Quiz** - Fun quiz about your relationship that unlocks a gift
- **🎁 Gift Reveal** - Playful puzzle that reveals the birthday surprise
- **💌 Love Notes Wall** - Masonry of romantic messages that flip to reveal more
- **📱 Fully Responsive** - Beautiful on all devices

## 🎨 Design

- Soft romantic color palette (rose, gold, sky blue)
- Glassmorphism cards with subtle animations
- Elegant typography (Playfair Display + Inter)
- Mobile-first, accessible design

## 🚀 Quick Start

### 1. Customize the Configuration

Edit `src/data/config.ts`:

```typescript
export const config = {
  girlfriendName: "Sarah",  // 👈 Change to her name
  birthdayDate: "2025-10-15 00:00:00",  // 👈 Set her birthday
  passphrase: {
    question: "Where did we first meet?",  // 👈 Your secret question
    answer: "coffee shop",  // 👈 The correct answer
  },
  // ... rest stays the same
};
```

### 2. Add Your Memories

#### Timeline (src/data/moments.json)

```json
[
  {
    "id": "moment-1",
    "date": "June 15, 2023",
    "title": "Our First Coffee",
    "caption": "The day everything changed",
    "photo": "/placeholder.svg",  // 👈 Add your photo path
    "fullStory": "Your full story here..."
  }
]
```

#### Love Notes (src/data/notes.json)

```json
[
  {
    "id": "note-1",
    "front": "Your smile ☀️",
    "back": "Your full message here..."
  }
]
```

#### Quiz Questions (src/data/quiz.json)

```json
[
  {
    "id": "q1",
    "question": "What was the first movie we watched together?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": 2,  // 👈 Index of correct answer (0-3)
    "emoji": "🎬"
  }
]
```

### 3. Add Photos

1. Create a folder: `src/assets/photos/`
2. Add your photos there
3. Update the `photo` field in `moments.json` with the path:
   ```json
   "photo": "/src/assets/photos/our-first-date.jpg"
   ```

### 4. (Optional) Add Audio Notes

1. Create folder: `src/assets/audio/`
2. Add MP3 files
3. Update `Gallery.tsx` component, line ~25:
   ```typescript
   audio: "/src/assets/audio/memory1.mp3"
   ```

### 5. Customize the Gift Message

Edit `src/components/GiftReveal.tsx`, lines ~20-22:

```typescript
const giftMessage = "I've prepared something special for you...";
const giftHint = "Check under your pillow tonight! 🎁";
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Deployment Options

### Option 1: Netlify (Easiest)

1. Build your project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Done! You'll get a URL like `yoursite.netlify.app`

### Option 2: GitHub Pages

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select branch: `main`, folder: `/dist`
4. Your site will be at `yourusername.github.io/birthday-world`

### Option 3: Vercel

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Deploy with one click!

## 🎯 Customization Tips

### Change Colors

Edit `src/index.css`, lines 11-38 to customize the color scheme:

```css
--primary: 345 100% 71%; /* Rose color */
--secondary: 45 100% 70%; /* Gold color */
--accent: 190 82% 72%; /* Sky blue */
```

### Adjust Quiz Difficulty

Edit `src/data/config.ts`:

```typescript
quizPassingScore: 5,  // Out of 8 questions
```

### Add More Sections

Edit `src/pages/Index.tsx` to add custom sections or reorder existing ones.

## 📱 Testing

1. **Test the login** - Make sure your passphrase works
2. **Check the countdown** - Verify the date/time is correct
3. **Test on mobile** - Use browser dev tools to check responsive design
4. **Try the quiz** - Complete it to unlock the gift
5. **Check all photos load** - Replace all placeholder images

## 🎁 Surprise Deployment Ideas

1. **Text her the link** at midnight on her birthday
2. **QR code** - Print a QR code and hide it somewhere special
3. **Custom domain** - Buy `yournames.love` or similar
4. **Password protect** the actual hosting (not just the login gate) for extra security

## 💝 Final Checklist

Before showing her:

- [ ] Updated girlfriend's name in config
- [ ] Set correct birthday date and time
- [ ] Changed login passphrase question and answer
- [ ] Added all timeline moments with real stories
- [ ] Replaced all placeholder photos
- [ ] Customized all love notes
- [ ] Updated quiz questions with your memories
- [ ] Set gift reveal message and hint
- [ ] Tested login works
- [ ] Tested countdown timer
- [ ] Checked on mobile device
- [ ] Deployed to hosting

## ❤️ Made with Love

This website was built with React, TypeScript, and Tailwind CSS using [Lovable](https://lovable.dev).

For your girlfriend's eyes only! 💕

---

**Questions or issues?** Feel free to customize any component in `src/components/` to make it perfect for her!
