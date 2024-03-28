'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { SaveOrgForm } from "@/ui-system/components/organisations/SaveOrgForm";
import { Organisation } from "@/lib/types/entities";
import { getEntityById } from "@/lib/actions/entities";
import { Button } from "@/ui-system/components/ui/button";
import { XCircleIcon } from "@heroicons/react/16/solid";

const OrganisationActionSlot = async () => {
    const searchParams = useSearchParams();

    const [actionState, setActionState] = useState('default');
    const [entity, setEntity] = useState<Organisation | null>(null);

    useEffect(() => {
        if (searchParams.has('new')) {
            setActionState('new');
        } else if (searchParams.get('edit')) {
            setActionState('edit');
            (async () => {
                const entityData: any = await getEntityById(
                    parseInt(searchParams.get('edit') as string),
                    'organisations'
                );
                setEntity(entityData)
            })();
        }
    }, [searchParams])

    return (
        <ActionSlot>
            <div className="flex gap-6 flex-col">
                <div className="flex flex-row w-full justify-between gap-1 items-center px-2 pb-2">
                    <h2>Organisations</h2>
                    <Button className="px-1 border-none bg-transparent shadow-none" onClick={(() => setActionState('default'))}>
                        <XCircleIcon widths={24} height={24} />
                    </Button>
                </div>

                {actionState === "default" && (
                    <div>
                        Default
                    </div>
                )}

                {actionState === "new" && (
                    <SaveOrgForm />
                )}

                {actionState === "edit" && (
                    <SaveOrgForm organisation={entity} />
                )}
            </div>
        </ActionSlot>
    )
}

export default OrganisationActionSlot;