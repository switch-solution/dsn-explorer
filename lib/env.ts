import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        name: z.string().min(1),
        adress: z.string().min(1),
        email: z.string().min(1),
        cloud: z.string().min(1),
        cloudSocialReason: z.string().min(1),
        cloudAdress: z.string().min(1),
    },
    client: {
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        name: process.env.name,
        adress: process.env.adress,
        email: process.env.email,
        cloud: process.env.cloud,
        cloudSocialReason: process.env.cloudSocialReason,
        cloudAdress: process.env.cloudAdress,
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    // experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    // }
});