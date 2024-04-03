'use server';

import { getAllConnectionInterations } from "@/lib/actions/connections";
import { getAllEntityItems } from "@/lib/actions/entities";
import ConnectionActionSlot from "@/ui-system/components/connections/ConnectionActionSlot";

const Page = async () => {
    const contacts = await getAllEntityItems('contacts')
    const organisations = await getAllEntityItems('organisations')
    const connectionInteractions = await getAllConnectionInterations()

    if (contacts === null || organisations === null || connectionInteractions === null) {
        return null
    }

    return (
        <>
            <ConnectionActionSlot contactData={contacts} organisationData={organisations} interactions={connectionInteractions} />
        </>
    )
}

export default Page;