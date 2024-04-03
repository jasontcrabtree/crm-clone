'use server';
import { getAllContactInteractions } from "@/lib/actions/contacts"
import ContactActionSlot from "@/ui-system/components/contacts/ContactActionSlot";

const Page = async () => {
    const data = await getAllContactInteractions()
    return (
        <>
            <ContactActionSlot contactInteractions={data} />
        </>
    )
}

export default Page;