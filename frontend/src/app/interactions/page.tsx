'use server'
import { InteractionList } from "@/ui-system/components/interactions/InteractionList";
import NewInteractionButton from "@/ui-system/components/interactions/NewInteractionButton";
import { getAllEntityItems } from "@/lib/actions/entities";
import { Interaction } from "@/lib/types/entities";

const Page = async () => {

    const { data, total } = await getAllEntityItems('interactions') as { data: Interaction[], total: number };

    return (
        <div className={`w-full bg-zinc-50 max-h-screen overflow-y-scroll`}>
            <div className="flex flex-row justify-between gap-2 w-full p-4">
                <h1 className="text-xl font-bold
            text-teal-700">
                    Interactions
                </h1>
                <NewInteractionButton />
            </div>
            <div className="grid md:grid-cols-3 gap-2 p-2">
                {/* <EntityActivity />
                <EntityStats />
                <EntitySearch label="Search Contacts" /> */}
            </div>
            <InteractionList length={32} items={data} />
        </div>
    )
}

export default Page;