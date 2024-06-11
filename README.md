# Caladria: Elevating Live Streams to Legendary Moments!

This is a live stream application built using a range of modern technologies. It provides functionalities similar to popular streaming platforms, including user authentication, live streaming capabilities, and user profile management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Ngrok Configuration](#ngrok-configuration)
- [Environment Variables](#environment-variables)
- [Database Configuration](#database-configuration)
- [Install Dependencies](#install-dependencies)
- [Getting Started](#getting-started)

## Features

- Live streaming with integration for OBS and similar programs using Livekit
- User authentication and management via Clerk
- User thumbnail storage using Uploadthing
- Real-time chat and interactions
- Responsive design with Tailwind CSS

## Technologies Used

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, shadcn-ui, lucide-react
- **State Management:** Zustand
- **Database:** MySQL (configurable to other databases via Prisma)
- **Authentication:** Clerk
- **Streaming:** Livekit
- **File Storage:** Uploadthing
- **Utilities:** usehooks-ts, sonner

## Setup Instructions

To set up and run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/patrickgunnar/caladria.git
   cd caladria

## Ngrok Configuration
To run this application on your local machine, you will need ngrok to expose your local server to the internet. Follow these steps to set up ngrok:

1. Download and install ngrok:
    - Download ngrok from ngrok.com and follow the installation instructions.

2. Start ngrok:
    - Run the following command to start ngrok and expose your local server:

```sh
    ngrok http 3000
```

3. Obtain the ngrok URL:
    - Copy the generated ngrok URL (e.g., https://"your-ngrok-id".ngrok.io).

### Set up webhooks:

- **Clerk**: Go to your Clerk dashboard and set the webhook URL to https://"your-ngrok-id".ngrok.io/api/webhooks/clerk.
- **Livekit**: Go to your Livekit dashboard and set the webhook URL to https://"your-ngrok-id".ngrok.io/api/webhooks/livekit.

## Environment Variables

Fill in the required keys and secrets in the .env file or rename .env_example to .env.

### Obtaining Keys and Secrets

#### To run this application, you must have accounts on the following platforms and obtain the necessary keys and secrets:

- **Livekit**: Required for live streaming capabilities. Sign up at Livekit and obtain the API URL, API key, API secret, and WebSocket URL.
- **Uploadthing**: Used to store user thumbnails. Sign up at Uploadthing and obtain the secret and app ID.
- **Clerk**: Handles authentication and user management. Sign up at Clerk and obtain the publishable key, secret key, and webhook secret.


### Ensure these values are correctly set in your .env file.

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
- CLERK_SECRET_KEY=""
- CLERK_WEBHOOK_SECRET=""

- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

- DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

- LIVEKIT_API_URL=""
- LIVEKIT_API_KEY=""
- LIVEKIT_API_SECRET=""
- NEXT_PUBLIC_LIVEKIT_WS_URL=""

- UPLOADTHING_SECRET=""
- UPLOADTHING_APP_ID=""

## Setup the database

1. Ensure your MySQL database is running.
2. Update the DATABASE_URL in the .env file with your database credentials.
3. Run the Prisma migrations and db push to set up your database schema:

```bash
npx prisma migrate dev
# then
npx prisma db push
```


**By default, this application uses MySQL as the database. You can change the database provider by updating the schema.prisma file in the prisma directory. Here’s how you can do it:**

1. Open prisma/schema.prisma.
2. Modify the provider field in the client block to your preferred database (e.g., postgresql, sqlite, etc.).
3. Update the DATABASE_URL in your .env file to match the new database connection string.
4. Run the Prisma migrations and db push to update the database schema

## Install dependencies
```bash
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) or Ngrok URL with your browser to see the result.
