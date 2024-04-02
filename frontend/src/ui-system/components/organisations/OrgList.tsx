'use server';

import { getAllOrganisations } from "@/lib/actions/organisations";
import { Organisation } from "@/lib/types/entities";
import OrgCard from "./OrgCard";

export const OrgList = async (
    { size, length = 7 }: { size: string, length?: number }
) => {
    const organisations = await getAllOrganisations();

    const gridSize = size === "full" ? "grid-cols-3" : "grid-cols-auto-fit";

    return (
        <div className="p-4 bg-zinc-100">
            <h2 className="text-lg">Organisations</h2>
            <div className={`grid md:${gridSize} gap-2 p-2`}>
                {organisations.slice(0, length).map((organisation: Organisation) => {
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