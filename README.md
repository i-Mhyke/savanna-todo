# Savannah Todo App

## Step 1 - Clone the repository

In you command line terminal, please run `git clone https://github.com/i-Mhyke/savanna-todo.git` to get the code on you local machine.
After cloning move into the directory using the command `cd /savanna-todo`

## Step 2 - Install dependencies

To get all the dependencies using in the application run `npm install` or `yarn install`.

## Step 3 - Development server

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Step 4 - Environment variables

Create a file in the base directory called `.env.local` and copy the content in `.example.env.local` into the the newly created file.
This would enable you use the firebase setup conveniently.

## Step 5 - Create firebase app (Optional)

I understand that providing environment variables over a public repository is ethically incorrect, I made the decision to include it in the code to enable easy
submission and also review. If providing the env is incorrect please follow the steps in the documentation below to create and use a firebase application.

`Create Firebase:` [https://firebase.google.com/docs/firestore/quickstart][https://firebase.google.com/docs/firestore/quickstart]
