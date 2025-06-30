'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',   // ⬅️ send cookies so /api/logout can clear them
        })
        router.replace('/login')     // push user back to login page
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
            {loading ? 'Signing out…' : 'Logout'}
        </button>
    )
}
