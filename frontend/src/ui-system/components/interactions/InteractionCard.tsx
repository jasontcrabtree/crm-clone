'use client';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import { deleteEntityById } from "@/lib/actions/entities";
import { Interaction } from "@/lib/types/entities";
import { formatDate } from "@/lib/client/client-utils"
import { UserGroupIcon, BuildingOffice2Icon, ArrowPathIcon } from "@heroicons/react/24/outline";


function getEntityIcon(interaction: { entityType: string }): JSX.Element {
    switch (interaction.entityType) {
        case 'ContactModel':
            return <UserGroupIcon className="w-5" />
        case 'OrganisationModel':
            return <BuildingOffice2Icon className="w-5" />
        case 'ConnectionModel':
            return <ArrowPathIcon className="w-5" />
        default:
            return <></>
    }
};

const InteractionCard = ({ interaction }: { interaction: Interaction }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-2 bg-slate-100 border-gray-200 border-[1px] rounded p-2 text-zinc-700 text-sm">
            {/* <div className="flex flex-row gap-1 align-center">
                <Button onClick={() => router.push(`/interactions?edit=${interaction.id}`)}>
                    Edit
                </Button>
                <Button className="bg-zinc-100 border-red-700 text-red-700 hover:bg-red-700 hover:text-white" onClick={(() => deleteEntityById(interaction.id, 'interactions'))}>
                    Delete
                </Button>
            </div> */}

            <div className="flex flex-row gap-2 content-center w-full flex-start flex-wrap">
                {interaction?.entityType && (
                    <p className="text-zinc-500">
                        {getEntityIcon({ entityType: interaction.entityType })}
                    </p>
                )}

                <h2 className="text-indigo-700 font-bold">
                    {interaction?.interactionTitle && interaction.interactionTitle}
                </h2>
            </div>

            <p>
                {interaction?.interactionDate && formatDate(interaction.interactionDate)}
            </p>

            {interaction?.customInteractionType && (
                <p className="text-indigo-700">
                    Custom Interaction: {interaction.customInteractionType}
                </p>
            )}

            {interaction?.interactionNotes && (
                <p className="text-green-500">
                    {interaction.interactionNotes}
                </p>
            )}
        </div>
    )
}

export default InteractionCard;