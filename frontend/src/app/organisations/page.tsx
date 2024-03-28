import { OrgList } from "@/ui-system/components/organisations/OrgList";
import NewOrgButton from "@/ui-system/components/organisations/NewOrgButton";

const Page = async () => {
    return (
        <div className={`w-full bg-zinc-50 max-h-screen overflow-y-scroll`}>
            <div className="flex flex-row justify-between gap-2 w-full p-4">
                <h1 className="text-xl font-bold
            text-teal-700">
                    Organisations
                </h1>
                <NewOrgButton />
            </div>
            <div className="grid md:grid-cols-3 gap-2 p-2">
                {/* <EntityActivity />
                <EntityStats />
                <EntitySearch label="Search Contacts" /> */}

            </div>
            {/* <OrgList size="full" length={32} /> */}
        </div>
    )
}

export default Page;