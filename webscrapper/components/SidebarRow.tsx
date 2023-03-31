"use client"

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { DocumentData } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-spinkit';

type Props = {
    doc: DocumentData;
}

function SidebarRow({ doc }: Props) {
    const [active, setActive] = useState(false)
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname) return;
        setActive(pathname.includes(doc.id));
    }, [pathname, doc])

    return (
        <li
            onClick={() => router.push(`/search/${doc.id}`)}
            className={`flex justify-between px-2 py-4 md:p-4 cursor-pointer hover:bg-white hover:shadow-md rounded-lg ${active && "bg-white shadow-md"}`}
        >
            <div>
                <p className='text-xs md:text-base font-bold'>{doc.data().search}</p>
                {doc.data().status === "pending" && (
                    <p className='text-xs'>Scrapping information ...</p>
                )}
            </div>


            <span>
                {doc.data().status === "pending" ? (
                    <Spinner name='cube-grid' fadeIn="none" color="indigo" />
                ) : (
                    <CheckCircleIcon className='h-6 w-6 text-green-500' />
                )
                }
            </span>
        </li>
    )
}

export default SidebarRow
