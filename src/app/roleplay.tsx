"use client";

import { useState, useRef, useEffect } from "react";
import GenerationClient from "./generationClient";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RoleplayProps {
  title?: string;
  description?: string;
}

// System prompt for the cleaner wrasse roleplay scenario
const CLEANER_WRASSE_SYSTEM_PROMPT = `You are roleplaying as a Dungeon Master (DM) in a scenario where the user is a Cleaner Wrasse fish at a cleaning station on a coral reef. 
  
As the DM, you should:
1. Roleplay as all the other fish species that interact with the user
2. Create a narrative that highlights the surprising intelligence of cleaner wrasse fish
3. Incorporate elements of game theory in the social interactions between the cleaner wrasse and client fish
4. Present the user with interesting choices that demonstrate the complex decision-making cleaner wrasse engage in
5. Include scientific facts about cleaner wrasse intelligence when appropriate
6. Keep responses concise (under 200 words) and engaging

Key facts about cleaner wrasse intelligence to incorporate:
- They can recognize individual client fish faces and remember past interactions
- They make strategic decisions about which clients to prioritize
- They understand the consequences of "cheating" (biting healthy tissue) versus honest cleaning
- They manage their reputation among different fish species
- They engage in complex social interactions that involve cooperation and occasional deception

The tone should be educational but fun, highlighting the fascinating cognitive abilities of these small fish.`;

export default function Roleplay({ 
  title = "Cleaner Wrasse Roleplay", 
  description = "Experience life as a cleaner wrasse fish at a cleaning station. Interact with various client fish species and navigate the complex social dynamics of the reef.",
}: RoleplayProps) {
  // Initial welcome message
  const initialMessages = [
    {
      role: "assistant" as const,
      content: `Welcome to the coral reef! You are a cleaner wrasse fish operating your own cleaning station. 
      
As a cleaner wrasse, you have the remarkable ability to remove parasites, dead skin, and other debris from larger "client" fish. This symbiotic relationship benefits both parties - you get a meal, and they get cleaned!

However, life as a cleaner wrasse is complex. You must:
- Decide which clients to prioritize (some are regulars, others are predators)
- Choose whether to clean honestly or cheat by taking a bite of healthy tissue
- Navigate complex social dynamics with other fish species
- Build a reputation that attracts more clients

Your first client of the day is approaching - a large grouper with parasites visible on its gills. What do you do?`
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto border border-black/[.08] dark:border-white/[.145] rounded-lg overflow-hidden">
      <div className="bg-black/[.03] dark:bg-white/[.05] p-4 border-b border-black/[.08] dark:border-white/[.145]">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-black/70 dark:text-white/70">{description}</p>
      </div>
      
      <div className="p-4">
        <GenerationClient 
          systemMessage={CLEANER_WRASSE_SYSTEM_PROMPT}
          initialMessages={initialMessages}
        />
      </div>
    </div>
  );
}
