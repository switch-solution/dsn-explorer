export default function Legal({
    name,
    email,
    cloud,
    cloudSocialReason,
    cloudAdress,
}: {
    name: string,
    email: string,
    cloud: string,
    cloudSocialReason: string,
    cloudAdress: string,
}



) {
    return (
        <div className="flex flex-col">
            <span>Identité : {name}</span>
            <span>Email : {email}</span>
            <span>Herbergeur : {cloud}</span>
            <span>Raison social de l&apos;herbergeur : {cloudSocialReason}</span>
            <span>Adresse de l&apos;herbergeur : {cloudAdress}</span>

        </div>
    )

}