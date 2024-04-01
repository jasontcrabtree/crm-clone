import { ContactConnectionDropdown, OrganisationConnectionDropdown } from "@/ui-system/components/connections/ConnectionDropdowns";
import NewConnectionButton from "@/ui-system/components/connections/NewConnectionButton";

const Page = () => {
    return (
        <div className="w-full bg-zinc-50">

            <div className={`w-full bg-zinc-50 max-h-screen overflow-y-scroll`}>
                <div className="flex flex-row justify-between gap-2 w-full p-4">
                    <h1 className="text-xl font-bold
            text-teal-700">
                        Connections
                    </h1>
                    <NewConnectionButton />
                </div>
                <div className="grid md:grid-cols-3 gap-2 p-2">
                    {/* <EntityActivity />
                    <EntityStats />
                    <EntitySearch label="Search Contacts" /> */}
                </div>
                {/* <ContactsList size="full" length={32} /> */}
            </div>
        </div>
    )
}

export default Page;