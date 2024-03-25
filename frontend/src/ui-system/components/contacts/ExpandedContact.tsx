'use client';

import { getEntityById } from "@/lib/actions/entities";
import { Contact } from "@/lib/types/contacts";
import { UserIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

const ExpandedEntity = async ({ id }: { id: number }) => {

    const [contactData, setContactData] = useState<Contact | null>(null);

    useEffect(() => {
        (async () => {
            const contactData: Contact = await getEntityById(id, 'contacts');
            console.log('contactData', contactData)
            setContactData(contactData)
        })

    }, [id])

    return (
        <div className="w-full bg-zinc-50">
            Expanded
            <div>
                <UserIcon className="w-6" />
                {contactData?.contactFirstName
                    && (<h1>{contactData?.contactFirstName}</h1>)}
                {contactData?.contactSurname && (<p>{contactData.contactSurname}</p>)}
            </div>
            <div>
                {contactData?.contactEmail && (<p>{contactData?.contactEmail}</p>)}

                {contactData?.contactPhone && (<p>{contactData?.contactPhone}</p>)}
            </div>
            {contactData?.contactNotes && (<p>{contactData.contactNotes}</p>)}
        </div>
    )
}

export default ExpandedEntity;