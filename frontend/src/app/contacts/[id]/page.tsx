'use client'
import { getContactById } from "@/lib/actions/contacts";
import { getEntityById } from "@/lib/actions/entities";
import { Contact } from "@/lib/types/contacts";
import EditEntity from "@/ui-system/components/entities/EditEntity";
import { Button } from "@/ui-system/components/ui/button";
import { UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = async ({ params }: { params: { id: number } }) => {
    const { id } = params;
    const router = useRouter()

    // const contactData: Contact = await getContactById(id);

    useEffect(() => {
        // const [contactData] = await Promise.all([
        //     getContactById(id)
        // ])
        (async () => {
            const contactData: Contact = await getEntityById(id, 'contacts');
            console.log('contactData', contactData)
        })

    }, [id])


    // const contactData = {}

    return (
        <div className="w-full bg-zinc-50">

            <div>
                {/* <div>
                    <UserIcon className="w-6" />
                    {contactData.contactFirstName
                        && (<h1>{contactData.contactFirstName}</h1>)}
                    {contactData.contactSurname && (<p>{contactData.contactSurname}</p>)}
                </div>
                <div>
                    {contactData.contactEmail && (<p>{contactData.contactEmail}</p>)}

                    {contactData.contactPhone && (<p>{contactData.contactPhone}</p>)}
                </div>
                {contactData.contactNotes && (<p>{contactData.contactNotes}</p>)} */}

            </div>
            <div>
                <Button onClick={() => router.push(`?edit=${id}`)}>
                    Edit B
                </Button>
                <EditEntity entityType="contacts" label="Edit" />
                <button>Delete</button>
            </div>
        </div>
    )
}

export default Page;