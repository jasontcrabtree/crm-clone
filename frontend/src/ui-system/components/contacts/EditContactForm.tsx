import React from "react";
import { Button } from "../ui/button";
import { Contact } from "@/lib/types/entities";
import { updateEntityById } from "@/lib/actions/entities";

export const EditContactForm = ({ contact }: { contact: Contact | null }) => {

    const handleEditForm = async (formData: FormData) => {
        if (!contact) throw new Error('Contact required');

        console.log('formData', formData)

        const update = await updateEntityById(contact.id, formData, 'contacts');

        console.log('update', update);
    }

    return (
        <div className="">
            <form className="flex flex-col gap-2" action={handleEditForm}>
                <label htmlFor="contactFirstName">
                    <span className="font-medium">
                        First Name
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue={contact?.contactFirstName} name="contactFirstName" />
                </label>
                <label htmlFor="contactSurname">
                    <span className="font-medium">
                        Surname
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue={contact?.contactSurname} name="contactSurname" />
                </label>
                <label htmlFor="contactEmail">
                    <span className="font-medium">
                        Email
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue={contact?.contactEmail} name="contactEmail" />
                </label>
                <label htmlFor="contactPhone">
                    <span className="font-medium">
                        Phone
                    </span>
                    <input className="text-zinc-800" type="tel" defaultValue={contact?.contactPhone} name="contactPhone" />
                </label>
                <label htmlFor="contactNotes">
                    Contact Notes
                    <textarea className="text-zinc-800 w-full p-2 rounded-s" name="contactNotes" id="" cols={16} rows={4}>
                        {contact?.contactNotes && contact.contactNotes}
                    </textarea>
                </label>
                <Button>Edit</Button>
            </form>
        </div>
    )
}