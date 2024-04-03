'use server'

import { getAllEntityItems } from "@/lib/actions/entities"
import RenderEntityIcon from "./entities/RenderEntityIcon"

const StatsDisplay = ({ content, label, type }: { content?: number, label: string, type: string }) => {
    return (
        <div className="bg-teal-700 text-zinc-50 rounded p-2 aspect-square flex content-center justify-center items-center flex-col gap-1">
            <RenderEntityIcon entityType={type} size="w-6 h-6" />
            <div className="text-base font-semibold pb-2 text-zinc-100">
                {label}
            </div>
            <p className="text-2xl">
                {content}
            </p>
        </div>
    )
}

const Stats = async () => {
    const contacts = await getAllEntityItems('contacts');
    const organisations = await getAllEntityItems('organisations');
    const connections = await getAllEntityItems('connections');
    const interactions = await getAllEntityItems('interactions');

    return (
        <div className="grid sm:grid-cols-4 gap-2">
            <StatsDisplay content={contacts?.data.length} label="Contacts" type="ContactModel" />
            <StatsDisplay content={organisations?.data.length} label="Organisations" type="OrganisationModel" />
            <StatsDisplay content={connections?.data.length} label="Connections" type="ConnectionModel" />
            <StatsDisplay content={interactions?.data.length} label="Interactions" type="InteractionModel" />
        </div>
    )
}

export default Stats;