export function Ul({ children }: { children: React.ReactNode }) {
    return (<ul className="w-100%">
        {children}
    </ul>)
}

export function Li({
    name,
    value,
    dsnId
}: {
    name: string,
    value: string,
    dsnId: string

}) {
    return (<li className="flex flex-row w-100% justify-between">
        <span className="text-sm">{dsnId} {name}</span>
        <span className="text-sm">{value}</span>
    </li>)
}