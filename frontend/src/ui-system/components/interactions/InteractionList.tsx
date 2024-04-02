'use server';

import InteractionCard from "./InteractionCard";
import { getAllEntityItems } from "@/lib/actions/entities";

export const InteractionList = async (
    { size, length = 7 }: { size: string, length?: number }
) => {
    const interactions = await getAllEntityItems('interactions');

    const gridSize = size === "full" ? "grid-cols-3" : "grid-cols-auto-fit";

    return (
        <div className="p-4 bg-zinc-100">
            <h2 className="text-lg">Interactions</h2>
            <div className={`grid md:${gridSize} gap-2 p-2`}>
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