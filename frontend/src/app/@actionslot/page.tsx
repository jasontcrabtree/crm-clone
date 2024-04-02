import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { InteractionList } from "@/ui-system/components/interactions/InteractionList";

const Page = () => {
    return (
        <ActionSlot>
            <>
                <h3 className="text-lg font-semibold pb-2 text-zinc-100">
                    Latest Interactions ...
                </h3>
                <InteractionList size="full" length={12} />
            </>
        </ActionSlot>
    )
}

export default Page;