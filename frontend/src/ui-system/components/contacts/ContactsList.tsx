'use server';

import { getAllContacts } from "@/lib/actions/contacts";
import { Contact } from "@/lib/types/entities";
import ContactCard from "./ContactCard";

export const ContactsList = async (
    { size, length = 7 }: { size: string, length?: number }
) => {
    const contacts = await getAllContacts();

    const gridSize = size === "full" ? "grid-cols-3" : "grid-cols-auto-fit";

    return (
        <div className={`grid md:${gridSize} gap-2 p-2`}>
            {contacts.slice(0, length).map((contact: Contact) => {
                return (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                    />
                )
            })}
        </div>
    )
}