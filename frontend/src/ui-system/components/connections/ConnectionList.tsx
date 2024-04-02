'use server';

import { Connection } from "@/lib/types/entities";
import ConnectionCard from "./ConnectionCard";
import { getAllEntityItems } from "@/lib/actions/entities";

const ConnectionList = async (
    { size, length = 7 }: { size: string, length?: number }
) => {
    const connections = await getAllEntityItems('connections');

    console.log('connections', connections);

    const gridSize = size === "full" ? "grid-cols-3" : "grid-cols-auto-fit";

    return (
        <div className="p-4 bg-zinc-100">
            <h2 className="text-lg">Connections</h2>
            <div className={`grid md:${gridSize} gap-2 p-2`}>
                {connections.slice(0, length).map((connection: Connection) => {
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