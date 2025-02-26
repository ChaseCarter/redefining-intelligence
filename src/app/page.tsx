"use client";

import Image from "next/image";
import Quiz from "./quiz";
import FishRoleplay from "./fishRoleplay";
import PlateGame from "./plateGame";
import FishJump from "./fishJump";
import MonkeyRoleplay from "./monkeyRoleplay";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Redefining Intelligence</h1>
        <p className="text-lg mb-8 max-w-2xl text-center sm:text-left">
          Intelligence as typically defined is centered around human capabilities, making it a measure that is in some sense 'rigged' in our favor from the start. There are other kinds of intelligence exhibited by other species which we often overlook.
        </p>

        <div className="w-full max-w-2xl flex flex-col gap-4">

          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Cleaner Wrasse Intelligence
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 pt-0 flex flex-col gap-3">
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Cookie Game
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  <PlateGame />
                  <div className="mt-4 p-4 bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145] rounded-lg text-sm">
                    <p className="mb-2">This experiment tests pattern recognition and strategic decision-making. In each round, two plates appear with cookies, but choosing one plate causes the other to disappear - unless you pick the correct plate first. There is always one "safe" plate that allows you to get both cookies if selected first.</p>
                    <p>While humans often take several rounds to figure out the pattern, Cleaner Wrasse fish typically identify the correct strategy within just 3 rounds, demonstrating their remarkable cognitive abilities in sequential decision-making and memory tasks.</p>
                  </div>
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Interactive Roleplay
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  <FishRoleplay />
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Social Cognition
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  Cleaner wrasse fish can recognize individual client fish, remember their interactions with them, and adjust their behavior based on the client's species and status.
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Strategic Decision Making
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  They make complex decisions about which clients to prioritize, when to cheat (by taking a bite of healthy tissue), and how to manage their reputation in the reef community.
                </div>
              </details>
            </div>
          </details>

          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Goby Fish Intelligence
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
          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Octopus Intelligence
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

          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Corvid Intelligence
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

          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Elephant Intelligence
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

          <details className="group border border-black/[.08] dark:border-white/[.145] rounded-lg">
            <summary className="cursor-pointer p-4 font-semibold flex items-center justify-between">
              Campbell's Monkey Intelligence
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 pt-0 flex flex-col gap-3">
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
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Social Learning
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  Young Campbell's monkeys learn their complex call system through social observation and practice, demonstrating sophisticated learning abilities and cultural transmission of knowledge.
                </div>
              </details>
              <details className="group/inner border border-black/[.08] dark:border-white/[.145] rounded-lg">
                <summary className="cursor-pointer p-3 flex items-center justify-between">
                  Threat Assessment
                  <span className="transition-transform group-open/inner:rotate-180">▼</span>
                </summary>
                <div className="p-3 pt-0">
                  These monkeys show remarkable ability to assess different types of threats and communicate them specifically to their group, displaying advanced cognitive abilities in threat discrimination and social coordination.
                </div>
              </details>
            </div>
          </details>
        </div>

        <div className="mt-8 flex gap-4 items-center flex-col sm:flex-row">
          { /* 
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute Research
          </a>
          */}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
