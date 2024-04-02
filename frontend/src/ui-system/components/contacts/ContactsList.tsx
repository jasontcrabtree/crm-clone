'use server';

import { getAllContacts } from "@/lib/actions/contacts";
import { Contact } from "@/lib/types/entities";
import ContactCard from "./ContactCard";

export const ContactsList = async (
    { size, length = 7 }: { size: string, length?: number }
) => {
    const { data, total } = await getAllContacts() as { data: Contact[], total: number };

    const gridSize = size === "full" ? "grid-cols-3" : "grid-cols-auto-fit";

    return (
        <div className="p-3 bg-zinc-100 rounded-[8px]">
            {length < 7 &&
                <h2 className="text-lg font-semibold pb-2 text-zinc-700">Contacts</h2>
            }
            <div className={`grid md:${gridSize} gap-2`}>
                {data.slice(0, length).map((contact: Contact) => {
                    return (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                        />
                    )
                })}
            </div>
        </div>
    )
}