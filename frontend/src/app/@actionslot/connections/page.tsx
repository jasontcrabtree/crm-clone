'use server';

import { getAllEntityItems } from "@/lib/actions/entities";
import ConnectionActionSlot from "@/ui-system/components/connections/ConnectionActionSlot";

const Page = async () => {
    const contacts = await getAllEntityItems('contacts')
    const organisations = await getAllEntityItems('organisations')

    return (
        <>
            <ConnectionActionSlot contactData={contacts} organisationData={organisations} />
        </>
    )
}

export default Page;