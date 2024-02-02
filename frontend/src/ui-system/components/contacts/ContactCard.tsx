'use client';

import CustomLink from "../custom-link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Contact } from "@/lib/types/contacts";

const ContactCard = ({ contact }: { contact: Contact }) => {
    const router = useRouter()

    return (
        <div className="flex flex-col gap-2 border-gray-200 border-[1px] rounded p-2">
            <Button onClick={() => router.push('/contacts?edit')}>
                Edit
            </Button>
            <h2>
                <CustomLink href={`/contacts/${contact.id}`} classes="text-indigo-700 underline">
                    {contact.contactFirstName && contact.contactFirstName} {contact.contactSurname && contact.contactSurname}
                </CustomLink>
            </h2>
            <h3>
                {contact.contactNotes}
            </h3>
        </div>
    )
}

export default ContactCard;