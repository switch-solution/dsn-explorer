import { env } from "@/lib/env";
import Legal from "@/components/legal";
export default function Page() {
    return (
        <Legal name={env.name} email={env.email} cloud={env.cloud} cloudAdress={env.cloudAdress} cloudSocialReason={env.cloudSocialReason} />
    )
}