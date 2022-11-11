export const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL
? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
: "http://localhost:3000";

export const url = `${baseURL}/api/trpc`;