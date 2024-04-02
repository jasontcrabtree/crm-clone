'use server';

import InteractionCard from "./InteractionCard";
import { getAllEntityItems } from "@/lib/actions/entities";

export const InteractionList = async (
    { size, length = 7 }: { size: string, length?: number }
) => {
    const interactions = await getAllEntityItems('interactions');

    const gridSize = size === "full" ? "grid-cols-3" : "grid-cols-auto-fit";

    return (
        <div className="bg-transparent rounded-[8px]">
            {length < 7 &&
                <h2 className="text-lg font-semibold pb-2 text-zinc-700">Interactions</h2>
            }
            <div className={`flex flex-col gap-3`}>
                {interactions.slice(0, length).map((organisation: any) => {
                    return (
                        <InteractionCard
                            key={organisation.id}
                            interaction={organisation}
                        />
                    )
                })}
            </div>
        </div>
    )
}