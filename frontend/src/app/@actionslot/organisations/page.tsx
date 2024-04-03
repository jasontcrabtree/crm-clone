'use server';
import { getAllOrganisationInteractions } from "@/lib/actions/organisations"
import OrganisationActionSlot from "@/ui-system/components/organisations/OrganisationActionSlot";

const Page = async () => {
    const data = await getAllOrganisationInteractions()
    return (
        <>
            <OrganisationActionSlot items={data} />
        </>
    )
}

export default Page;

