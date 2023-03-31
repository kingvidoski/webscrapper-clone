'use client'

import { Toaster } from 'react-hot-toast';

function ClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toaster />

            {children}

        </>
    )
}

export default ClientProvider
