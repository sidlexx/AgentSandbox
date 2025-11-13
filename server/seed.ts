import { storage } from "./storage";

export async function seedDatabase() {
  console.log("Seeding database...");

  // Check if already seeded
  const existingModules = await storage.getAllModules();
  if (existingModules.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  // Create demo user
  try {
    const demoUser = await storage.getUserByUsername("demo");
    if (!demoUser) {
      await storage.createUser({
        username: "demo",
        password: "demo123",
        email: "demo@example.com"
      });
      console.log("Demo user created");
    }
  } catch (error) {
    console.log("Demo user already exists or error creating:", error);
  }

  // Seed training modules
  const modules = [
    {
      title: "Introduction to Customer Service",
      description: "Learn the fundamentals of excellent customer service",
      difficulty: "beginner",
      duration: "15 min",
      xpReward: 50,
      prerequisites: [],
      order: 1,
      content: {
        sections: [
          { type: "text", content: "Customer service is the foundation of business success..." },
          { type: "video", url: "intro-video" },
          { type: "text", content: "Key principles include: empathy, active listening, problem-solving" }
        ]
      },
      quizQuestions: [
        { question: "What is the most important skill in customer service?", options: ["Speed", "Empathy", "Technical knowledge", "Multitasking"], correct: 1 },
        { question: "Active listening involves:", options: ["Interrupting frequently", "Focusing on your response", "Understanding the customer's needs", "Speaking quickly"], correct: 2 }
      ]
    },
    {
      title: "Active Listening Techniques",
      description: "Master the art of truly understanding customer needs",
      difficulty: "beginner",
      duration: "20 min",
      xpReward: 75,
      prerequisites: [],
      order: 2,
      content: {
        sections: [
          { type: "text", content: "Active listening goes beyond hearing words..." },
          { type: "list", items: ["Maintain eye contact", "Avoid interrupting", "Paraphrase to confirm understanding", "Ask clarifying questions"] }
        ]
      },
      quizQuestions: [
        { question: "What does paraphrasing help with?", options: ["Saving time", "Confirming understanding", "Ending conversations faster", "Avoiding questions"], correct: 1 },
        { question: "When should you ask clarifying questions?", options: ["Never", "Only at the end", "When something is unclear", "Before listening"], correct: 2 }
      ]
    },
    {
      title: "Handling Complaints",
      description: "Turn frustrated customers into loyal advocates",
      difficulty: "intermediate",
      duration: "30 min",
      xpReward: 100,
      prerequisites: [],
      order: 3,
      content: {
        sections: [
          { type: "text", content: "The LEAP framework: Listen, Empathize, Apologize, Provide solution" },
          { type: "example", scenario: "Customer: 'I've been on hold for 30 minutes! This is unacceptable!'", response: "I sincerely apologize for the long wait time. I understand how frustrating that must be. Let me help you right away." }
        ]
      },
      quizQuestions: [
        { question: "What does LEAP stand for?", options: ["Listen, Empathize, Apologize, Provide", "Lead, Engage, Act, Prove", "Learn, Execute, Apply, Practice", "Look, Evaluate, Answer, Proceed"], correct: 0 },
        { question: "When should you apologize?", options: ["Never", "Only if it's your fault", "Always acknowledge the inconvenience", "Only when asked"], correct: 2 }
      ]
    },
    {
      title: "Advanced Conflict Resolution",
      description: "Handle difficult situations with confidence",
      difficulty: "advanced",
      duration: "40 min",
      xpReward: 150,
      prerequisites: [],
      order: 4,
      content: {
        sections: [
          { type: "text", content: "Advanced de-escalation techniques for high-stress situations..." },
          { type: "technique", name: "The Broken Record", description: "Calmly repeat your position without escalating emotions" }
        ]
      },
      quizQuestions: [
        { question: "What is de-escalation?", options: ["Avoiding the customer", "Calming a tense situation", "Transferring to a supervisor", "Speaking louder"], correct: 1 },
        { question: "When should you escalate?", options: ["Immediately", "Never", "When you cannot resolve it", "When the customer is upset"], correct: 2 }
      ]
    },
    {
      title: "Technical Troubleshooting Basics",
      description: "Guide customers through common technical issues",
      difficulty: "intermediate",
      duration: "35 min",
      xpReward: 125,
      prerequisites: [],
      order: 5,
      content: {
        sections: [
          { type: "text", content: "Systematic approach to technical problem-solving..." },
          { type: "checklist", items: ["Verify the issue", "Check basic connections", "Restart the device", "Update software", "Document the solution"] }
        ]
      },
      quizQuestions: [
        { question: "What's the first step in troubleshooting?", options: ["Restart everything", "Verify the issue", "Call a technician", "Update software"], correct: 1 },
        { question: "Why document solutions?", options: ["It's required", "To help future cases", "To track time", "It's not necessary"], correct: 1 }
      ]
    },
    {
      title: "Crisis Management",
      description: "Lead during service outages and critical incidents",
      difficulty: "advanced",
      duration: "45 min",
      xpReward: 200,
      prerequisites: [],
      order: 6,
      content: {
        sections: [
          { type: "text", content: "Managing multiple angry customers during a crisis..." },
          { type: "framework", name: "CARE", steps: ["Communicate proactively", "Acknowledge the issue", "Reassure with updates", "Execute the fix"] }
        ]
      },
      quizQuestions: [
        { question: "During a service outage, you should:", options: ["Wait for customers to call", "Proactively communicate", "Hide the issue", "Blame another team"], correct: 1 },
        { question: "What reduces customer anxiety most?", options: ["Apologies", "Regular updates", "Discounts", "Silence"], correct: 1 }
      ]
    }
  ];

  for (const module of modules) {
    await storage.createModule(module as any);
  }

  // Seed simulations
  const simulations = [
    {
      title: "Password Reset Request",
      difficulty: "beginner",
      scenario: "A customer has forgotten their password and needs help resetting it. They are calm but need clear guidance.",
      customerPersona: {
        mood: "neutral",
        patience: "high",
        technical_skill: "low",
        personality_traits: ["polite", "uncertain", "needs_guidance"]
      },
      expectedOutcomes: {
        key_actions: ["verify_identity", "provide_clear_steps", "confirm_success"],
        good_phrases: ["I'll help you with that", "Let me guide you step by step", "Have you received the email?"],
        avoid_phrases: ["Just do it yourself", "It's easy", "You should know this"]
      },
      keywords: {
        positive: ["help", "guide", "step", "verify", "email", "reset", "account", "security"],
        negative: ["difficult", "complicated", "can't", "won't", "impossible"],
        empathy: ["understand", "sorry", "apologize", "inconvenience", "frustrating"]
      }
    },
    {
      title: "Billing Complaint",
      difficulty: "intermediate",
      scenario: "A customer is upset about an unexpected charge on their bill. They're frustrated and want an immediate resolution.",
      customerPersona: {
        mood: "frustrated",
        patience: "medium",
        technical_skill: "medium",
        personality_traits: ["demanding", "emotional", "needs_validation"]
      },
      expectedOutcomes: {
        key_actions: ["acknowledge_frustration", "review_charges", "explain_clearly", "offer_solution"],
        good_phrases: ["I understand your frustration", "Let me review your account", "I'll make this right", "Here's what happened"],
        avoid_phrases: ["That's just how it works", "There's nothing I can do", "You should have read the terms"]
      },
      keywords: {
        positive: ["review", "check", "refund", "credit", "adjust", "fix", "understand", "help"],
        negative: ["policy", "can't", "unable", "system", "automatic"],
        empathy: ["frustrating", "understand", "sorry", "apologize", "inconvenience", "upset"]
      }
    },
    {
      title: "Service Outage Crisis",
      difficulty: "advanced",
      scenario: "Multiple customers are reporting a critical service outage. Tensions are high and you need to manage expectations while providing updates.",
      customerPersona: {
        mood: "angry",
        patience: "low",
        technical_skill: "high",
        personality_traits: ["demanding", "time_sensitive", "business_critical", "needs_facts"]
      },
      expectedOutcomes: {
        key_actions: ["acknowledge_urgency", "provide_eta", "offer_proactive_updates", "set_expectations", "show_accountability"],
        good_phrases: ["Our team is actively working on this", "I'll provide updates every 30 minutes", "This is our top priority", "Here's what we know"],
        avoid_phrases: ["I don't know", "Maybe later", "Check back yourself", "Not my problem"]
      },
      keywords: {
        positive: ["working", "priority", "team", "update", "eta", "fix", "restore", "monitoring"],
        negative: ["don't know", "maybe", "uncertain", "wait", "later"],
        empathy: ["critical", "urgent", "understand", "impact", "apologize", "priority"]
      }
    },
    {
      title: "Product Return Request",
      difficulty: "beginner",
      scenario: "A customer wants to return a product they purchased last week. They are polite and just need to know the process.",
      customerPersona: {
        mood: "neutral",
        patience: "high",
        technical_skill: "medium",
        personality_traits: ["polite", "straightforward", "needs_process"]
      },
      expectedOutcomes: {
        key_actions: ["verify_purchase", "explain_policy", "provide_return_label", "set_expectations"],
        good_phrases: ["I'll help you process that return", "Here's how it works", "You'll receive a return label", "Expect your refund in 5-7 days"],
        avoid_phrases: ["Why do you want to return it?", "Too bad", "You're out of luck"]
      },
      keywords: {
        positive: ["return", "refund", "label", "process", "help", "easy", "simple"],
        negative: ["can't", "won't", "denied", "too late"],
        empathy: ["understand", "help", "glad to assist"]
      }
    },
    {
      title: "Feature Request Discussion",
      difficulty: "intermediate",
      scenario: "A customer is requesting a feature that doesn't currently exist. They're passionate about the product and want to see improvements.",
      customerPersona: {
        mood: "enthusiastic",
        patience: "medium",
        technical_skill: "high",
        personality_traits: ["engaged", "detailed", "forward_thinking"]
      },
      expectedOutcomes: {
        key_actions: ["acknowledge_feedback", "explain_process", "document_request", "manage_expectations"],
        good_phrases: ["That's great feedback", "I'll pass this to our product team", "We appreciate your input", "Here's how we prioritize features"],
        avoid_phrases: ["That's not possible", "We'll never do that", "That's a bad idea"]
      },
      keywords: {
        positive: ["feedback", "product team", "appreciate", "consider", "roadmap", "document"],
        negative: ["never", "impossible", "won't", "can't"],
        empathy: ["understand", "appreciate", "valuable", "important"]
      }
    }
  ];

  for (const simulation of simulations) {
    await storage.createSimulation(simulation as any);
  }

  // Seed achievements
  const achievements = [
    {
      name: "First Perfect Score",
      description: "Score 100% on any simulation",
      icon: "trophy",
      xpReward: 100,
      criteria: { type: "perfect_score" }
    },
    {
      name: "7-Day Streak",
      description: "Complete training 7 days in a row",
      icon: "flame",
      xpReward: 150,
      criteria: { type: "streak", days: 7 }
    },
    {
      name: "Peer Helper",
      description: "Achieve top 10 on leaderboard",
      icon: "users",
      xpReward: 200,
      criteria: { type: "leaderboard", rank: 10 }
    },
    {
      name: "Speed Demon",
      description: "Complete 10 simulations with average handle time under 2 minutes",
      icon: "target",
      xpReward: 175,
      criteria: { type: "speed", count: 10, time: 120 }
    },
    {
      name: "Master Trainer",
      description: "Complete all training modules",
      icon: "star",
      xpReward: 300,
      criteria: { type: "modules_completed", count: 6 }
    },
    {
      name: "Top Performer",
      description: "Reach #1 on leaderboard",
      icon: "award",
      xpReward: 500,
      criteria: { type: "leaderboard", rank: 1 }
    },
    {
      name: "Quick Learner",
      description: "Earn 1000 XP",
      icon: "star",
      xpReward: 100,
      criteria: { type: "total_xp", amount: 1000 }
    }
  ];

  for (const achievement of achievements) {
    await storage.createAchievement(achievement as any);
  }

  // Seed knowledge articles
  const articles = [
    {
      title: "How to handle angry customers",
      content: "When dealing with angry customers, remember the LEAP framework: Listen actively to their concerns without interrupting. Empathize with their situation by acknowledging their feelings. Apologize for the inconvenience, even if it wasn't directly your fault. Provide a clear solution or path forward. Stay calm and professional throughout the interaction.",
      category: "Conflict Resolution",
      keywords: ["angry", "upset", "frustrated", "calm", "deescalate", "LEAP", "complaints"],
      viewCount: 1247
    },
    {
      title: "Password reset procedures",
      content: "To help customers reset their password: 1) Verify their identity using security questions or email verification. 2) Guide them to the login page. 3) Have them click 'Forgot Password'. 4) Ensure they enter the correct email address. 5) Instruct them to check their inbox and spam folder. 6) Walk them through the reset link process. 7) Confirm they can now log in successfully.",
      category: "Technical Support",
      keywords: ["password", "reset", "forgot", "login", "account", "access", "email"],
      viewCount: 892
    },
    {
      title: "Refund policy guidelines",
      content: "Our refund policy: Customers can request refunds within 30 days of purchase for most products. Digital products have a 14-day window. To process: 1) Verify purchase date and order number. 2) Confirm the item is eligible. 3) Process refund through admin panel. 4) Send confirmation email. 5) Refunds appear in 5-7 business days. Exceptions may apply for sale items.",
      category: "Policies",
      keywords: ["refund", "return", "money back", "policy", "purchase", "cancel"],
      viewCount: 756
    },
    {
      title: "Billing cycle information",
      content: "Billing cycles run from the 1st to the last day of each month. Charges are processed on the 1st of each month. For new sign-ups mid-month, we pro-rate the first bill. Customers can view their billing history in the account dashboard. Payment method updates take effect on the next billing cycle.",
      category: "Billing",
      keywords: ["billing", "payment", "charge", "cycle", "invoice", "subscription"],
      viewCount: 634
    },
    {
      title: "Escalation procedures",
      content: "Escalate to a supervisor when: 1) You cannot resolve the issue within 10 minutes. 2) The customer explicitly requests a supervisor. 3) The issue involves potential legal matters. 4) The situation is emotionally escalating despite de-escalation attempts. Before escalating: Document all details in the CRM, brief the supervisor on the situation, and remain professional during the handoff.",
      category: "Policies",
      keywords: ["escalate", "supervisor", "manager", "transfer", "handoff"],
      viewCount: 543
    },
    {
      title: "Common troubleshooting steps",
      content: "Universal troubleshooting checklist: 1) Verify the issue - ask the customer to describe what's happening. 2) Check connections - ensure all cables and internet are properly connected. 3) Restart the device/application. 4) Clear cache and cookies. 5) Update software to latest version. 6) Check for known outages. 7) Try on a different device/browser. Document each step attempted.",
      category: "Technical Support",
      keywords: ["troubleshoot", "fix", "problem", "issue", "resolve", "debug", "error"],
      viewCount: 821
    }
  ];

  for (const article of articles) {
    await storage.createKnowledgeArticle(article as any);
  }

  console.log("Database seeded successfully!");
}
