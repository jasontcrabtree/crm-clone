'use client'

import { newContact } from "@/lib/actions/contacts";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'

export const NewContact = () => {
    const router = useRouter()

    return (
        <>
            <Button onClick={() => router.push('/contacts?new')}>
                Add Contact
            </Button>
            {/* <Button
            onClick={async () => {
                const data = await newContact();
                console.log('data', data);
            }}
        >
            New contact
            </Button> */}
        </>
    )
}