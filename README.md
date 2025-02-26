# Redefining Intelligence

An interactive web application that showcases the intelligence of various animal species, challenging the human-centric definition of intelligence.

## Features

- Information about the intelligence of octopuses, corvids, elephants, and cleaner wrasse fish
- Interactive quizzes to test your knowledge
- Roleplay chat interface where you can experience life as a cleaner wrasse fish

## Cleaner Wrasse Roleplay

The cleaner wrasse roleplay feature uses the OpenAI API to create an interactive experience where you can:

- Experience life as a cleaner wrasse fish at a cleaning station
- Interact with various client fish species
- Navigate complex social dynamics and game theory scenarios
- Make strategic decisions about cleaning honestly vs. cheating
- Build and maintain your reputation in the reef community

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key to `.env`
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

The application uses the following environment variables:

- `ANTHROPIC_API_KEY`: Your Anthropic API key for the roleplay feature (securely stored on the server)

## Security

This application is designed with security in mind:
- API keys are stored only on the server and never exposed to the client
- All AI generation requests are processed through a secure server-side API
- The client only communicates with our own API, not directly with OpenAI

## Fallback Behavior

If no OpenAI API key is provided in the environment variables, the application will use predefined responses for the roleplay feature.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
