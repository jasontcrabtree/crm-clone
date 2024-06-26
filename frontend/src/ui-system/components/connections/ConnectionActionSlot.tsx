'use client'

import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { SaveOrgForm } from "@/ui-system/components/organisations/SaveOrgForm";
import { Button } from "@/ui-system/components/ui/button";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useActionSlotParams } from "@/hooks/useActionSlotParams";
import { SaveConnectionForm } from "@/ui-system/components/connections/SaveConnectionForm";
import { ContactConnectionDropdown } from "@/ui-system/components/connections/ConnectionDropdowns";
import { Contact, Interaction, Organisation } from "@/lib/types/entities";
import { InteractionList } from "../interactions/InteractionList";

const ConnectionActionSlot = ({ contactData, organisationData, interactions }:
    {
        contactData: {
            data: Contact[];
            total: number;
        },
        organisationData: {
            data: Organisation[];
            total: number;
        }
        interactions: Interaction[];
    }) => {

    const { actionState, setActionState, entity } = useActionSlotParams({ entityType: "organisations" });

    return (
        <ActionSlot>
            <div className="flex gap-6 flex-col">
                <div className="flex flex-row w-full justify-between gap-1 items-center px-2 pb-2">
                    <h2>Connections</h2>
                    <Button className="px-1 border-none bg-transparent shadow-none" onClick={(() => setActionState('default'))}
                    >
                        <XCircleIcon widths={24} height={24} />
                    </Button>
                </div>

                <InteractionList items={interactions} length={12} />

                {actionState === "new" && (
                    <SaveConnectionForm contacts={contactData?.data} organisations={organisationData?.data} />
                )}

                {actionState === "edit" && (
                    <SaveConnectionForm connection={entity} contacts={contactData?.data} organisations={organisationData?.data} />
                )}
            </div>
        </ActionSlot>
    )
}

export default ConnectionActionSlot;