import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        name: z.string().min(1),
        address: z.string().min(1),
        email: z.string().min(1),
        cloud: z.string().min(1),
        cloudSocialReason: z.string().min(1),
        cloudAddress: z.string().min(1),
        siren: z.string().min(1),
    },
    client: {
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        name: process.env.NAME,
        address: process.env.ADDRESS,
        email: process.env.EMAIL,
        cloud: process.env.CLOUD_PROVIDER,
        cloudSocialReason: process.env.CLOUD_SOCIAL_REASON,
        cloudAddress: process.env.CLOUD_ADDRESS,
        siren: process.env.SIREN,
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    // experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    // }
});