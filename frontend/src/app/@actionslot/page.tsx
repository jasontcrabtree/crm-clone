'use server'
import { getAllEntityItems } from "@/lib/actions/entities";
import { Interaction } from "@/lib/types/entities";
import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { InteractionList } from "@/ui-system/components/interactions/InteractionList";

const Page = async () => {
    const { data, total } = await getAllEntityItems('interactions') as { data: Interaction[], total: number };

    return (
        <ActionSlot>
            <>
                <h3 className="text-lg font-semibold pb-2 text-zinc-100">
                    Latest Interactions ...
                </h3>
                <InteractionList length={12} items={data} />
            </>
        </ActionSlot>
    )
}

export default Page;