'use client'

import ActionSlot from "@/ui-system/components/action-slot";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const OverviewActionSlot = (props: any) => {
    console.log('props', props.searchParams)

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
                    <div>New</div>
                )}

                {actionParam === "edit" && (
                    <div>Edit</div>
                )}
            </>
        </ActionSlot>
    )
}

export default OverviewActionSlot;