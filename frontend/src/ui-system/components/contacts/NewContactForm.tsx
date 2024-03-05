'use client'

import { newContact } from "@/lib/actions/contacts";
import { Button } from "../ui/button";
import { useFormState } from "react-dom";
import { styleComponentType } from "@/lib/utils";


export const NewContactForm = (props: any) => {
    const initialState: any = {
        message: null,
        errors: {}
    }

    const [state, dispatch] = useFormState(
        newContact, initialState
    )

    return (
        <div className={`${styleComponentType()}`}>
            <form className="" action={dispatch}>
                <label htmlFor="">
                    <span className="font-medium">
                        First Name
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue="" name="contactFirstName" />
                </label>
                <label htmlFor="">
                    <span className="font-medium">
                        Surname
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue="" name="contactSurname" />
                </label>
                <label htmlFor="">
                    <span className="font-medium">
                        Email
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue="" name="contactEmail" />
                </label>
                <label htmlFor="">
                    <span className="font-medium">
                        Phone
                    </span>
                    <input className="text-zinc-800" type="tel" defaultValue="" name="contactPhone" />
                </label>
                <label htmlFor="">
                    Contact Notes
                    <textarea className="text-zinc-800 w-full p-2 rounded-s" name="contactNotes" id="" cols={30} rows={10}>
                    </textarea>
                </label>
                <Button type="submit">Save Contact</Button>
            </form>
            {/* <Button
                onClick={async () => {
                    const data = await newContact(newContactState);
                    console.log('data', data);
                }}
            >
                New contact
            </Button> */}
        </div>
    )
}