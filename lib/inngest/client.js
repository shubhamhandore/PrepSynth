import { Inngest } from "inngest";

export const inngest = new Inngest({
    id:"proprep",
    name:"ProPrep", 
    credentials:{
    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
    },
}})