'use client'
import { useActionSlotParams } from "@/hooks/useActionSlotParams";
import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { EditContactForm } from "@/ui-system/components/contacts/EditContactForm";
import { NewContactForm } from "@/ui-system/components/contacts/NewContactForm";
import { Button } from "@/ui-system/components/ui/button";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Page = () => {
    const { actionState, setActionState, entity } = useActionSlotParams({ entityType: 'contacts' });

    return (
        <ActionSlot>
            <div className="flex gap-6 flex-col">
                <div className="flex flex-row w-full justify-between gap-1 items-center px-2 pb-2">
                    <h2>Actions</h2>
                    <Button className="px-1 border-none bg-transparent shadow-none" onClick={(() => setActionState('default'))}>
                        <XCircleIcon widths={24} height={24} />
                    </Button>
                </div>
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

export default Page;