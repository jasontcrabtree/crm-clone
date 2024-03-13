import { getContactById } from "@/lib/actions/contacts";
import { Contact } from "@/lib/types/contacts";

const Page = async ({ params }: { params: { id: number } }) => {
    const { id } = params;

    const contactData: Contact = await getContactById(id);

    return (
        <div className="w-full bg-zinc-50">
            <div>
                {contactData.contactFirstName
                    && (<h1>{contactData.contactFirstName}</h1>)}
                {contactData.contactEmail && (<p>{contactData.contactEmail}</p>)}
                {contactData.contactPhone && (<p>{contactData.contactPhone}</p>)}
                {contactData.contactNotes && (<p>{contactData.contactNotes}</p>)}
                {contactData.contactSurname && (<p>{contactData.contactSurname}</p>)}
            </div>

            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default Page;