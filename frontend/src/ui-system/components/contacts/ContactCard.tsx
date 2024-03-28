'use client';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Contact } from "@/lib/types/entities";
import { deleteEntityById } from "@/lib/actions/entities";

const ContactCard = ({ contact }: { contact: Contact }) => {
    const router = useRouter()

    return (
        <div className="flex flex-col gap-2 border-gray-200 border-[1px] rounded p-2">
            <div className="flex flex-row gap-1 align-center">
                <Button onClick={() => router.push(`/contacts?edit=${contact.id}`)}>
                    Edit
                </Button>
                <Button onClick={(() => deleteEntityById(contact.id, 'contacts'))}>
                    Delete
                </Button>
            </div>
            <h2>
                <p className="text-indigo-700">
                    {contact.contactFirstName && contact.contactFirstName} {contact.contactSurname && contact.contactSurname}
                </p>
            </h2>
            <h3>
                {contact.contactNotes}
            </h3>
        </div>
    )
}

export default ContactCard;