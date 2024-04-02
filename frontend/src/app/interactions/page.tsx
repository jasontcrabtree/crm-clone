import { InteractionList } from "@/ui-system/components/interactions/InteractionList";
import NewInteractionButton from "@/ui-system/components/interactions/NewInteractionButton";

const Page = () => {
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
            <InteractionList size="full" length={32} />
        </div>
    )
}

export default Page;