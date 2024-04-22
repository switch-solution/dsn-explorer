export function Ul({ children }: { children: React.ReactNode }) {
    return (<ul className="w-100%">
        {children}
    </ul>)
}

export function Li({ children }: { children: React.ReactNode }) {
    return (<li className="flex flex-row w-100% justify-between">
        {children}
    </li>)
}