import { env } from "@/lib/env";
import Legal from "@/components/legal";
import { Container } from "@/components/layout/containter";
export default function Page() {
    return (
        <Container>
            <Legal name={env.name} email={env.email} cloud={env.cloud} cloudAdress={env.cloudAddress} cloudSocialReason={env.cloudSocialReason} address={env.address} siren={env.siren} />
        </Container>
    )
}