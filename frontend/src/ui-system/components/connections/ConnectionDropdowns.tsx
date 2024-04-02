import { Contact, Organisation } from "@/lib/types/entities";
import CustomSelect from "../ui/CustomSelect";

export const ContactConnectionDropdown = (contactData: { contactData: Contact[]; }) => {
    const options = contactData.contactData.map((contact: Contact) => {
        return {
            value: `${contact.id}`,
            label: `${contact.contactFirstName} ${contact.contactSurname}`
        }
    });

    return (
        <CustomSelect options={options} placeholder="Select contact" selectLabel="Contact" />
    )
}

export const OrganisationConnectionDropdown = (organisationData: { organisationData: Organisation[] }) => {
    const options = organisationData.organisationData.map((organisation: any) => {
        return {
            value: `${organisation.id}`,
            label: `${organisation.organisationName}`
        }
    })

    return (
        <CustomSelect options={options} placeholder="Select organisation" selectLabel="Organisation" />
    )
}