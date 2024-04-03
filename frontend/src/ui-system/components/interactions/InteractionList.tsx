import { Contact, Interaction, Organisation } from "@/lib/types/entities";
import { InteractionCard } from "./InteractionCard";

export const InteractionList = (
    { items, length = 7 }: { items: any, length?: number }
) => {
    return (
        <div className="bg-transparent rounded-[8px]">
            {length < 7 &&
                <h2 className="text-lg font-semibold pb-2 text-zinc-700">
                    Interactions
                </h2>
            }
            <div className={`flex flex-col gap-3`}>
                {items?.slice(0, length).map((item: any) => {
                    return (
                        <InteractionCard
                            key={item.id}
                            interaction={item}
                        />
                    )
                })}
            </div>
        </div>
    )
}