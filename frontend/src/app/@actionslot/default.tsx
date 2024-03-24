import ActionSlot from "@/ui-system/components/action-slot/action-slot";
import { ContactsList } from "@/ui-system/components/contacts/ContactsList";
// import { NewContact } from "@/ui-system/components/contacts/NewContactForm";

// import { useSelectedLayoutSegment } from 'next/navigation'

const Page = () => {
    // const contactsSegment = useSelectedLayoutSegment('contacts')
    // console.log('contactsSegment', contactsSegment)
    return (
        <ActionSlot>
            <div className="w-full bg-zinc-50">
                <h1 className="text-xl font-bold pt-10 pl-4 text-teal-700">Contacts</h1>
                <div className="grid">
                    <div>
                        Contact stats
                    </div>
                    <div>
                        Search
                    </div>
                    {/* <NewContact />
                    <ContactsList /> */}
                </div>

            </div>
        </ActionSlot>
    )
}

export default Page;