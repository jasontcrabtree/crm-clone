'use client';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import { deleteEntityById } from "@/lib/actions/entities";

const InteractionCard = ({ interaction }: { interaction: any }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-2 border-gray-200 border-[1px] rounded p-2">
            <div className="flex flex-row gap-1 align-center">
                <Button onClick={() => router.push(`/interactions?edit=${interaction.id}`)}>
                    Edit
                </Button>
                <Button onClick={(() => deleteEntityById(interaction.id, 'interactions'))}>
                    Delete
                </Button>
            </div>

            <h2 className="text-indigo-700 font-bold">
                {/* {interaction?.interactionName && interaction.interactionName} */}
                INTERACTION
            </h2>
        </div>
    )
}

export default InteractionCard;