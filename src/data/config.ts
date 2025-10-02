/**
 * Birthday World Configuration
 * 
 * ⚙️ CUSTOMIZE THIS FILE:
 * - Change girlfriendName to her actual name
 * - Set birthdayDate to her birthday (format: "YYYY-MM-DD HH:mm:ss")
 * - Update passphrase question and answer for the login gate
 */

export const config = {
  // 💝 Her name (appears in hero section)
  girlfriendName: "Maaike",
  
  // 🎂 Birthday date and time (when countdown reaches 0, fireworks launch!)
  // Format: "YYYY-MM-DD HH:mm:ss" (24-hour format)
  birthdayDate: "2025-11-09T00:00:00+01:00",
  
  // 🔐 Login gate settings
  passphrase: {
    question: "Where did we first meet?",
    // Answer is case-insensitive and trimmed
    answer: "cologne" // Change this to your secret answer!
  },
  
  // 🎨 Theme settings
  theme: {
    // Quiz passing score (out of total questions)
    quizPassingScore: 5,
  },
  
  // 👤 Author credit
  madeBy: "Rohan",
};
