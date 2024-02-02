'use server'

import { ContactsList } from "@/ui-system/components/contacts/ContactsList";
import { NewContact } from "@/ui-system/components/contacts/NewContact";

const EntityActivity = () => {
    return (
        <div className="p-2 bg-zinc-100 border-zinc-200 border-[1px] rounded">
            <div className="font-medium underline text-sm uppercase text-zinc-600">Latest Activity</div>
            <ul className="list-disc ml-4" style={{ paddingInlineStart: '4px' }}>
                <li>Contact updated</li>
                <li>Email from contact</li>
                <li>Connected to org</li>
            </ul>
        </div>
    )
}

const EntityStats = () => {
    return (
        <div style={{ background: "lightgray" }}>
            <div>Stats</div>
        </div>
    )
}

const EntitySearch = () => {
    return (
        <div style={{ background: "light" }}>
            <p>
                Entity Search
            </p>
            <input type="text" />
        </div>
    )
}



const Page = async () => {
    return (
        <div className="w-full bg-zinc-50 max-h-screen overflow-y-scroll">
            <div className="flex flex-row justify-between gap-2 w-full p-4">
                <h1 className="text-xl font-bold
            text-teal-700">Contacts</h1>
                <NewContact />
            </div>
            <div className="grid md:grid-cols-3 gap-2 p-2">
                <EntityActivity />
                <EntityStats />
                <EntitySearch />
            </div>
            <ContactsList size="full" />
        </div>
    )
}

export default Page;