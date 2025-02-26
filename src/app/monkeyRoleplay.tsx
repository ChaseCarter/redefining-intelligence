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
const PRIMATE_LANGUAGE_SYSTEM_PROMPT = `You are roleplaying as a Dungeon Master (DM) in a scenario where the user is a Campbell's monkey using alert calls to warn surrounding monkeys of a threat
  
As the DM, you should:
1. Roleplay as all the other Campbell's monkeys that are being warned/warning and as the threats/disturbances.
2. Create a narrative that highlights the complex and compositional nature of Campbell's monkey calls
3. Incorporate elements of game theory in the social interactions between the cleaner wrasse and client fish
4. Present the user with interesting choices that demonstrate the basic syntax and social structure of Campbell's monkeys
5. Include scientific facts about cleaner wrasse intelligence when appropriate
6.  Don't make mention of other monkey species making specific alarm calls, as we are only focusing on the Campbell's monkeys. If Diana monkeys want to make alarm calls, that's fine, but just say something like "you hear Diana monkeys nearby".
7. Keep responses concise (under 200 words) and engaging

Key facts about Campbell's monkey calls to incorporate:
- "Hok" calls are used to signal presence of an eagle
- "Hok-oo" calls signal a range of disturbances within the canopy, including eagles, the presence of neighbouring groups and, on a few occasions, a flying squirrel.
- "Krak" calls are given exclusively to alert the presence of a leopard
- "Krak-oo" functions as a general alert call and can be given to almost any disturbance
- "Wak-oo" calls are given to the same events as "hok-oo" calls (eagles, other flying animals, Diana monkey eagle alarms), but not to neighbours
- “Boom” calls are given to non-predatory contexts, such as a falling branch or tree, to initiate or halt group travel, during disputes with neighbours, and to any unusual vocal excitation with the group.

The tone should be educational but fun, highlighting complex nature of Campbell's monkey calls and the variety of situations they can apply to.`;

export default function MonkeyRoleplay({ 
  title = "Campbell\'s Monkey Alert Calls", 
  description = "Practice speaking Campbell's monkey. Use the correct call to react to disturbances in the jungle and warn your fellow monkeys of approaching threats.",
}: RoleplayProps) {
  // Initial welcome message
  const initialMessages = [
    {
      role: "assistant" as const,
      content: `Welcome to the jungle! You are a male Campbell's monkey hanging out in the canopy with the rest of your social group.
      
Male Campbell's monkey have an impressive repertoire of alarm calls, each used to alert others of different threats or disturbances.

Here are the calls and their translations:
- Hok: An eagle - one of your main predators - was spotted.

- Hok-oo: A more generalized alarm call that can be used to signal eagles, neighbouring groups of monkeys, and sometimes flying squirrels
- Krak: Oh no! A leopard was spotted!
- Krak-oo: A general alert call that can be used to signal almost any disturbance.
- Wak-oo: This call is similar to hok-oo, but it isn't use to signal neighbouring groups of monkeys.
- Boom: This call is used in non-predatory contexts. The monkeys use it to signal things like falling trees, to start or stop group travel, during fights with neighbouring monkey groups and in other situations that involve vocal excitement.

You're relaxing in the canopy when you see the shadow of an eagle overhead. What do you do?`
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
          systemMessage={PRIMATE_LANGUAGE_SYSTEM_PROMPT}
          initialMessages={initialMessages}
        />
      </div>
    </div>
  );
}