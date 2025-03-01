"use client";

import Image from "next/image";
import Quiz from "./quiz";
import FishRoleplay from "./fishRoleplay";
import PlateGame from "./plateGame";
import FishJump from "./fishJump";
import MonkeyRoleplay from "./monkeyRoleplay";
import { useState } from "react";

export default function Home() {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Redefining Intelligence</h1>
        <p className="text-lg mb-8 max-w-2xl text-center sm:text-left">
          Intelligence as typically defined is centered around human capabilities, making it a measure that is in some sense 'rigged' in our favor from the start. There are other kinds of intelligence exhibited by other species which we often overlook.
        </p>
        <p className="text-lg mb-8 max-w-2xl text-center sm:text-left">
        The anthropomorphism or "humanization" of other species and their intelligence is a major barrier to understanding non-human experiences. While it may be tempting to compare what we know about other animals to our lives and faculties as humans, it's important to try decentering our perspective when understanding other species. Our purpose is to showcase other, nonhuman forms of intelligence. Below, you will find games, quizzes and interactive roleplay scenarios that illustrate the intelligence of different species. 
        </p>
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {/* Cleaner Wrasse Fish */}
          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Cleaner Wrasse Fish
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 pt-0 flex flex-col gap-3">
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Cookie Game
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  <p>Are you smarter than a cleaner wrasse?</p>
                  <p>Try to eat as many cookies as you can in 10 rounds!</p>
                </div>
                <div className="p-3 pt-0">
                  <PlateGame onGameComplete={(completed) => setShowDescription(completed)} />
                  {showDescription && (
                    <div className="mt-4 p-4 bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145] rounded-lg text-sm">
                      <p className="mb-2">This experiment tests pattern recognition and strategic decision-making. In each round, two plates appear with cookies, but choosing one plate causes the other to disappear - unless you pick the correct plate first. There is always one "safe" plate that allows you to get both cookies if selected first.</p>
                      <p>While humans often take several rounds to figure out the pattern, Cleaner Wrasse fish typically identify the correct strategy within just 3 rounds, demonstrating their remarkable cognitive abilities in sequential decision-making and memory tasks.</p>
                      <p>A 2012 study showed that cleaner wrasses outperformed chimps and orangutans (who often take up to 100 rounds to figure out the pattern) on this task. How did you do?</p>
                    </div>
                  )}
                  {!showDescription && (
                    <div className="mt-4 p-4 bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145] rounded-lg text-sm">
                    <p className="mb-2">Complete all 10 rounds to find out how this intelligence test works</p>
                  </div>
                  )}
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Social Cognition
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                Cleaner wrasse fish can recognize individual client fish, remember their interactions with them, and adjust their behavior based on the client's species and status. Since scales, skin and other live fish tissue are more nutritious than the parasites they are "hired" to remove from their clients, cleaner wrasses will sometimes cheat by taking a small bite out of the fish they are cleaning. 
In order to decide whether or not they can get away with this, cleaner wrasses can remember up to 100 individual clients, and whether or not their last experience at the cleaning station was positive or negative. 
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Strategic Decision Making
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                The fish mentally group their clients into one of 3 categories: dangerous predators, transient "floater" fish that travel across the reef and have several cleaning stations to choose from, and small resident fish. Wrasses will almost never bite the predators (lest they get eaten!) or the visiting customers (so they come back for their next cleaning). In fact, if the wrasse gave the client bad service during their last cleaning, they will "apologize" by giving them a fin massage. 

Small resident fish get the worst service by far. Since they live in the area, they're guaranteed to keep coming back to the cleaning station, so the wrasse doesn't have to give them special treatment to keep their business. As a result, cleaner wrasses are far more likely to bite the small residents and often keep them waiting while a higher-priority client gets their cleaning.

                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Cleaning Station Roleplay
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  <FishRoleplay />
                </div>
              </details>
            </div>
          </details>

          {/* Goby Fish */}
          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Goby Fish
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 pt-0 flex flex-col gap-3">
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Spatial Memory
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  <div className="mt-4 p-4 bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145] rounded-lg text-sm">
                    <p className="mb-2">In their natural environment, fish need to remember the locations of various features like hiding spots, feeding areas, and safe passages.</p>
                    <p>Goby fish, in particular, show exceptional ability to memorize landmarks and the topography of their environment, so much so that they can make blind jumps to other nearby pools after the tide goes out.</p>
                  </div>
                  <FishJump />
                </div>
              </details>
            </div>
          </details>

          {/* Monkey */}
          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Campbell's Monkey
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 pt-0 flex flex-col gap-3">
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Social Learning
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                Much like how baby humans learn to speak, baby monkeys learn their calls by listening to and imitating other members of their group.
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Threat Assessment
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                Campbell's monkeys react differently to different kinds of threats and use different calls to warn other members of their group. Campbell's monkey calls are actually quite complex. They have a repertoire of at least six calls, and they can be combined into sequences to fit different contexts. Linguists have compared the vocal communication system of Campbell's monkeys to a "grammar" of sorts. While it's important to remember not to anthropomorphize, the complexity of the monkeys' call system is impressive!
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Complex Communication
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  <MonkeyRoleplay />
                  <div className="mt-4 p-4 bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145] rounded-lg text-sm">
                    <p className="mb-2">Campbell's monkeys demonstrate remarkable linguistic abilities through their sophisticated alarm call system. They use a combination of basic calls and modifiers to create different meanings, showing evidence of primitive syntax in non-human communication.</p>
                    <p>Their calls exhibit properties similar to human language, including compositionality (combining elements to create new meanings) and reference (specific calls for specific threats). This suggests a level of cognitive sophistication previously underappreciated in non-human primates.</p>
                  </div>
                </div>
              </details>
            </div>
          </details>

          {/* Octopus */}
          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Octopus
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 pt-0 flex flex-col gap-3">
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Problem Solving
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <Quiz
                  title="Quiz: Test your knowledge about octopus problem-solving abilities"
                  question="How long can octopi remember solutions to problems they've solved?"
                  options={[
                    {
                      value: "days",
                      label: "A few days",
                      isCorrect: false,
                      feedback: "Incorrect - they can remember much longer!"
                    },
                    {
                      value: "weeks",
                      label: "Several weeks",
                      isCorrect: false,
                      feedback: "Incorrect - they can remember much longer!"
                    },
                    {
                      value: "months",
                      label: "Several months",
                      isCorrect: true,
                      feedback: "Correct! Octopi have excellent long-term memory."
                    },
                    {
                      value: "years",
                      label: "Multiple years",
                      isCorrect: false,
                      feedback: "Incorrect - not quite that long!"
                    }
                  ]}
                  additionalInfoId="octopus-info"
                />

                <div id="octopus-info" className="hidden mt-4 p-3">
                  Octopi can solve complex puzzles, open jars, and navigate mazes. They remember solutions to problems they encountered months ago and can learn from watching other octopi.
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Tool Usage
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  They use coconut shells as shelter, manipulate objects as tools, and can even use water jets to move items at a distance.
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Adaptive Learning
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  Octopi can quickly adapt to new environments, learn from their mistakes, and modify their behavior based on past experiences.
                </div>
              </details>
            </div>
          </details>

          {/* Corvid */}    
          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Corvid
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 pt-0 flex flex-col gap-3">
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Tool Creation
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  Crows craft and modify tools, bending wire into hooks and adapting natural objects to solve specific problems.
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Social Intelligence
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  They recognize human faces, hold grudges, and pass information about dangerous individuals to their offspring.
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Abstract Thinking
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  Ravens demonstrate planning abilities, understand cause-and-effect relationships, and show signs of metacognition.
                </div>
              </details>
            </div>
          </details>

          {/* Elephant */}        
          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Elephant
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 pt-0 flex flex-col gap-3">
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Emotional Intelligence
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  Elephants display complex emotions, comfort distressed companions, and show signs of grief when mourning their dead.
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Social Memory
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  They can remember and recognize hundreds of individuals over decades, maintaining complex social networks.
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Self-Awareness
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  Elephants can recognize themselves in mirrors, understand their body as their own, and show awareness of their physical presence.
                </div>
              </details>
            </div>
          </details>

        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.aiforanimals.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          AI for Animals →
        </a>
      </footer>
    </div>
  );
}
