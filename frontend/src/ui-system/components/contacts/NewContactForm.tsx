'use client'
import { createContact } from "@/lib/actions/contacts";
import { Button } from "../ui/button";
import { useFormState } from "react-dom";

export const NewContactForm = (props: any) => {
    const initialState: any = {
        message: null,
        errors: {}
    }

    const [state, formAction] = useFormState(createContact, initialState)

    return (
        <div className=''>
            <form className="flex flex-col gap-2" action={formAction}>
                <label htmlFor="contactFirstName">
                    <span className="font-medium">
                        First Name
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue="" name="contactFirstName" required />
                </label>
                <label htmlFor="contactSurname">
                    <span className="font-medium">
                        Surname
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue="" name="contactSurname" required />
                </label>
                <label htmlFor="contactEmail">
                    <span className="font-medium">
                        Email
                    </span>
                    <input className="text-zinc-800" type="email" defaultValue="" name="contactEmail" required />
                </label>
                <label htmlFor="contactPhone">
                    <span className="font-medium">
                        Phone
                    </span>
                    <input className="text-zinc-800" type="tel" defaultValue="" name="contactPhone" />
                </label>
                <label htmlFor="contactNotes">
                    Contact Notes
                    <textarea className="text-zinc-800 w-full p-2 rounded-s" name="contactNotes" id="" cols={16} rows={4}>
                    </textarea>
                </label>
                <Button>Create Contact</Button>
            </form>
        </div>
    )
}