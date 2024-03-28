'use client'

import { getEntityById } from "@/lib/actions/entities";
import { Contact } from "@/lib/types/entities";
import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { EditContactForm } from "@/ui-system/components/contacts/EditContactForm";
import { NewContactForm } from "@/ui-system/components/contacts/NewContactForm";
import { Button } from "@/ui-system/components/ui/button";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ContactOverviewSlot = async ({ params }: { params: any }) => {
    const [actionParam, setActionParam] = useState("");
    const searchParams = useSearchParams();
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    useEffect(() => {
        if (searchParams.get('new')) {
            setActionParam('new');
        } else if (searchParams.get('edit')) {

            console.log('searchParams.get(edit)', searchParams.get('edit'))

            setActionParam('edit');

            const id = parseInt(searchParams.get('edit') as string);

            (async () => {
                const contactData: any = await getEntityById(id, 'contacts');
                setSelectedContact(contactData)
            })();
        }

    }, [searchParams])

    const closeSlot = () => {
        setActionParam("");
    }

    return (
        <ActionSlot>
            <div className="flex gap-6 flex-col">
                <div className="flex flex-row w-full justify-between gap-1 items-center px-2 pb-2">
                    <h2>Actions</h2>
                    {/* {actionParam && (
                    )} */}
                    <Button className="px-1 border-none bg-transparent shadow-none" onClick={closeSlot}>
                        <XCircleIcon widths={24} height={24} />
                    </Button>
                </div>
                <NewContactForm />
                {/* {actionParam === "new" && (
                    )}

                {actionParam === "edit" && (
                    )} */}
                <EditContactForm contact={selectedContact} />
            </div>
        </ActionSlot>
    )
}

export default ContactOverviewSlot;