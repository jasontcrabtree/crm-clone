'use server';

import { getAllOrganisations } from "@/lib/actions/organisations";
import { Organisation } from "@/lib/types/entities";
import OrgCard from "./OrgCard";

export const OrgList = async (
    { size, length = 7 }: { size: string, length?: number }
) => {
    const { data, total } = await getAllOrganisations() as { data: Organisation[], total: number };

    const gridSize = size === "full" ? "grid-cols-3" : "grid-cols-auto-fit";

    return (
        <div className="p-3 bg-zinc-100 rounded-[8px]">
            {length < 7 &&
                <h2 className="text-lg font-semibold pb-2 text-zinc-700">Organisations</h2>
            }
            <div className={`grid md:${gridSize} gap-2 p-2`}>
                {data.slice(0, length).map((organisation: Organisation) => {
                    return (
                        <OrgCard
                            key={organisation.id}
                            organisation={organisation}
                        />
                    )
                })}
            </div>
        </div>
    )
}