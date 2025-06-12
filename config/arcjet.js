import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import {ARCJET_KEY} from "./env.js";


const aj = arcjet({
    key: ARCJET_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        shield({ mode: "LIVE" }),
        // detectBot({
        //     mode: "LIVE",
        //     allow: [
        //         "CATEGORY:SEARCH_ENGINE",
        //         "USER_AGENT:PostmanRuntime", // <== allow Postman
        //         "USER_AGENT:Postman",        // <== broader match just in case
        //         "*"                          // <== allow everything (DEV only)
        //     ],
        // }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 1, // Refill 5 tokens per interval
            interval: 10, // Refill every 10 seconds
            capacity: 3, // Bucket capacity of 10 tokens
        }),
    ],
});


export default aj;