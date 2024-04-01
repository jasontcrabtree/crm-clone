import CustomSelect from "../ui/CustomSelect";
import { getAllEntityItems } from "@/lib/actions/entities"

export const ContactConnectionDropdown = () => {
    // const contacts = await getAllEntityItems('contacts');
    // console.log('contacts', contacts);

    const options = [{ value: "chooseContact", label: "Choose Contact" }]

    const connectionTypes = [
        { value: "0", label: "Employee" },
        { value: "1", label: "External Partner" },
        { value: "2", label: "Stakeholder" },
        { value: "3", label: "Customer" },
        { value: "4", label: "Referral" },
        { value: "5", label: "Custom" },
    ]

    return (
        <div>
            <CustomSelect options={options} placeholder="Select" selectLabel="Choose Contact" defaultValue="chooseContact" />

            {/* <CustomSelect options={connectionTypes} placeholder="Choose connection" selectLabel="Connection Type" defaultValue="" /> */}
        </div>
    )
}

export const OrganisationConnectionDropdown = async () => {
    // const organisations = await getAllEntityItems('organisations')
    // console.log('organisations', organisations)
    return (
        <div>
            Contact
        </div>
    )
}