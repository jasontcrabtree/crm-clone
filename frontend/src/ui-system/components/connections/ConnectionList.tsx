'use server';

import { Connection } from "@/lib/types/entities";
import ConnectionCard from "./ConnectionCard";
import { getAllEntityItems } from "@/lib/actions/entities";

const ConnectionList = async (
    { size, length = 7 }: { size: string, length?: number }
) => {
    const { data, total } = await getAllEntityItems('connections') as { data: Connection[], total: number };

    const gridSize = size === "full" ? "grid-cols-3" : "grid-cols-auto-fit";

    return (
        <div className="p-3 bg-zinc-100 rounded-[8px]">
            {length < 7 &&
                <h2 className="text-lg font-semibold pb-2 text-zinc-700">Connections</h2>
            }
            <div className={`grid md:${gridSize} gap-2 p-2`}>
                {data.slice(0, length).map((connection: Connection) => {
                    return (
                        <ConnectionCard
                            key={connection.id}
                            connection={connection}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ConnectionList;