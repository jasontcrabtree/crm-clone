'use client'

import { newContact } from "@/lib/actions/contacts";
import { Button } from "../ui/button";


export const NewContact = () => {

    return (
        <Button
            // onClick={newContact}
            onClick={async () => {
                const data = await newContact();
                console.log('data', data);
            }}
        >
            New contact
        </Button>
    )
}