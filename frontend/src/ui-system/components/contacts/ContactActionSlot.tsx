'use client'
import { useActionSlotParams } from "@/hooks/useActionSlotParams";
import { Contact } from "@/lib/types/entities";
import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { EditContactForm } from "@/ui-system/components/contacts/EditContactForm";
import { NewContactForm } from "@/ui-system/components/contacts/NewContactForm";
import { Button } from "@/ui-system/components/ui/button";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { InteractionList } from "../interactions/InteractionList";

const ContactActionSlot = ({ contactInteractions }: {
    contactInteractions: {
        data: Contact[];
        total: number;
    }
}) => {

    const { actionState, setActionState, entity } = useActionSlotParams({ entityType: 'contacts' });

    console.log('contactInteractions', contactInteractions)

    return (
        <ActionSlot>
            <div className="flex gap-6 flex-col">
                <div className="flex flex-row w-full justify-between gap-1 items-center px-2 pb-2">
                    <h2>Contact Actions</h2>
                    <Button className="px-1 border-none bg-transparent shadow-none" onClick={(() => setActionState('default'))}>
                        <XCircleIcon widths={24} height={24} />
                    </Button>
                </div>

                <InteractionList items={contactInteractions} length={12} />

                {actionState === "new" && (
                    <NewContactForm />
                )}

                {actionState === "edit" && (
                    <EditContactForm contact={entity} />
                )}
            </div>
        </ActionSlot>
    )
}

export default ContactActionSlot;