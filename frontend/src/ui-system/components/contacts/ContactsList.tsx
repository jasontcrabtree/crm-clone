'use server'

import { getAllContacts } from "@/lib/actions/contacts";
import CustomLink from "../custom-link";
import { Contact } from "@/lib/types/contacts";

export const ContactsList = async () => {
    const contacts = await getAllContacts();
    console.log('contacts,', contacts)

    return (
        <div className="p-4 border-gray-700 border-[1px]">
            {contacts.map((contact: Contact, index: string) => {
                console.log('contact', contact);
                return (
                    <div className="flex flex-row gap-2" key={index}>
                        <h2>
                            <CustomLink href={`/contacts/${contact.id}`} classes="text-indigo-700 underline">
                                {contact.contactFirstName}
                            </CustomLink>
                        </h2>
                        <h3>
                            {contact.contactNotes}
                        </h3>
                    </div>
                )
            })}
        </div>
    )
}