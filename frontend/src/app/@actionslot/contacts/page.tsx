'use client'

import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { NewContactForm } from "@/ui-system/components/contacts/NewContactForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ContactOverviewSlot = () => {
    const [actionParam, setActionParam] = useState("");
    const searchParams = useSearchParams();

    useEffect(() => {
        switch (searchParams.toString()) {
            case 'new=':
                setActionParam('new');
                break;
            case 'edit=':
                setActionParam('edit');
                break;
            default:
                setActionParam('');
                break;
        }

    }, [searchParams])

    return (
        <ActionSlot>
            <>
                <h2>Contact Action Slot</h2>

                {actionParam === "new" && (
                    <NewContactForm />
                )}

                {actionParam === "edit" && (
                    <div>Edit</div>
                )}
            </>
        </ActionSlot>
    )
}

export default ContactOverviewSlot;