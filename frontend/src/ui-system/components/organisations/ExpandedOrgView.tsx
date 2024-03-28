'use client';

import { getEntityById } from "@/lib/actions/entities";
import { Organisation } from "@/lib/types/entities";
import { UserIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

const ExpandedOrgView = ({ id }: { id: number }) => {

    const [contactData, setContactData] = useState<Organisation | null>(null);

    useEffect(() => {
        (async () => {
            const contactData: Organisation = await getEntityById(id, 'contacts');
            console.log('contactData', contactData)
            setContactData(contactData)
        })

    }, [id])

    return (
        <div className="w-full bg-zinc-50">
            Expanded
            {/* <div>
                <UserIcon className="w-6" />
                {contactData?.contactFirstName
                    && (<h1>{contactData?.contactFirstName}</h1>)}
                {contactData?.contactSurname && (<p>{contactData.contactSurname}</p>)}
            </div>
            <div>
                {contactData?.contactEmail && (<p>{contactData?.contactEmail}</p>)}

                {contactData?.contactPhone && (<p>{contactData?.contactPhone}</p>)}
            </div>
            {contactData?.contactNotes && (<p>{contactData.contactNotes}</p>)} */}
        </div>
    )
}

export default ExpandedOrgView;