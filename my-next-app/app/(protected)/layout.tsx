import LogoutButton from '@/components/LogoutButton'

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* Sticky bar across the top */}
            <header className="fixed top-0 inset-x-0 h-14 flex items-center justify-end px-4 bg-gray-100 border-b">
                <LogoutButton />
            </header>

            {/* push real content below header */}
            <main className="pt-14">{children}</main>
        </>
    )
}
