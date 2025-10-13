
// import { Inngest } from "inngest";

// export const inngest = new Inngest({
//   id: "finance-platform", // Unique app ID
//   name: "Finance Platform",
//   retryFunction: async (attempt) => ({
//     delay: Math.pow(2, attempt) * 1000, // Exponential backoff
//     maxAttempts: 2,
//   }),
// });


import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "finance-platform", // Unique app ID
  name: "Finance Platform",
  signingKey: process.env.INNGEST_SIGNING_KEY, // <-- add this
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});

console.log("Signing key:", process.env.INNGEST_SIGNING_KEY);
