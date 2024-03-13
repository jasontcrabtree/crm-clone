'use client'

import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { NewContactForm } from "@/ui-system/components/contacts/NewContactForm";
import { Button } from "@/ui-system/components/ui/button";
import { XCircleIcon } from "@heroicons/react/24/outline";
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

    const closeSlot = () => {
        setActionParam("");
    }

    return (
        <ActionSlot>
            <>
                <div className="flex flex-row w-full justify-between gap-1 items-center px-2 pb-2">
                    <h2>Actions</h2>
                    {actionParam && (
                        <Button className="px-1 border-none bg-transparent shadow-none" onClick={closeSlot}>
                            <XCircleIcon widths={24} height={24} />
                        </Button>
                    )}
                </div>

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