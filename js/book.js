const TOPICS_DATA = {
  virtual: {
    name: "VIRTUAL SESSION",
    price: "800",
    description: "Let's make your screen disappear",
    info: "You don't need to travel to be heard. This session brings you and me face-to-face-virtually, but intimately. I will be with you, fully present, to listen, reflect, and help you begin to heal.",
    questions: [
      {
        question: "Do you feel most emotionally open in the morning, afternoon, or evening?",
        type: "input",
      },
      {
        question: "Would you like Charlotte to begin with a calming 90-second grounding exercise just for you?",
        type: "button",
        options: ["YES", "NO"]
      },
      {
        question: "Are there any life themes you feel emotionally 'stuck' in right now that you'd like to gently explore?",
        type: "input",
      }
    ]
  },
  inPerson: {
    name: "IN-PERSON SESSION",
    extra: "(EUROPE/MONACO)",
    price: "1600",
    description: "Let's prepare your sanctuary",
    info: "There are things that only silence and physical presence can heal. Sit with me, in person, in a space that holds truth, tenderness, and transformation.",
    questions: [
      {
        question: "Do you have any dietary preferences or allergies we should consider while preparing your welcome refreshment?",
        type: "input"
      },
      {
        question: "Would prefer Charlotte to gently guide the session, or would you like space to speak freely from the start?",
        type: "button",
        options: ["YES", "NO"]
      },
      {
        question: "Is there a personal object (journal, photo, or keepsake) you'd like to bring into the session as part of your healing space?",
        type: "input",
      }
    ]
  },
  community: {
    name: "SPONSORED SUPPORT SESSION",
    price: "550",
    description: "Your story matters, Let's begin ",
    info: "Healing should not be a luxury. Full session, full attention, at a reduced rate for those in need. Your story matters just as much.",
    questions: [
      {
        question: "Would you feel safer starting the session in silence, or would you prefer Charlotte to welcome you with a gentle question?",
        type: "input"
      },
      {
        question: "Is there one thing you've been carrying alone that you wish someone would simply hear - without trying to fix?",
        type: "input",
      },
      {
        question: "Would it help if we checked in with you a few days after the session to support your reflection?",
        type: "button",
        options: ["YES", "NO"]
      }
    ]
  },
  inner: {
    name: "INNER CIRCLE EXPERIENCE",
    description: "A sanctuary made just for your soul",
    info: "For those who seek not just a session, but a sanctuary.",
    price: "6,850",
    questions: [
      {
        question: "If you could name this season of your life in one word, what would it be - and why?",
        type: "input"
      },
      {
        question: "Would you like your healing plan to focus on emotional wounds, spiritual clarity, or self-love and transformation?",
        type: "input",
      },
      {
        question:
          "What would it mean to you if Charlotte's letter spoke directly to your soul's current journey?",
        type: "input",
      }
    ]
  }
};
