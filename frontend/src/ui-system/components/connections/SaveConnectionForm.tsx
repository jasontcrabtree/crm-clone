'use client'
import { Button } from "../ui/button";
import { useFormState } from "react-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/components/ui/select";
import { createConnection } from "@/lib/actions/connections";
import { Connection, ConnectionType } from "@/lib/types/entities";
import { updateEntityById } from "@/lib/actions/entities";
import CustomSelect from "../ui/CustomSelect";
import { ContactConnectionDropdown, OrganisationConnectionDropdown } from "./ConnectionDropdowns";

export const SaveConnectionForm = async ({ connection, ...props }: {
    connection?: Connection | null, props?: any
}) => {
    const initialState: any = {
        message: null,
        errors: {}
    }

    const [state, formAction] = useFormState(createConnection, initialState)

    const handleEditForm = async (formData: FormData) => {
        if (!connection) throw new Error('connection required to edit');

        const updateEntity = await updateEntityById(connection.id, formData, 'connections');

        return updateEntity
    }

    const connectionTypes = [
        { value: "0", label: "Employee" },
        { value: "1", label: "External Partner" },
        { value: "2", label: "Stakeholder" },
        { value: "3", label: "Customer" },
        { value: "4", label: "Referral" },
        { value: "5", label: "Custom" },
    ]

    return (
        <div className=''>
            <form className="flex flex-col gap-2" action={connection ? handleEditForm : formAction}>
                <label htmlFor="connectionLabel">
                    <span className="font-medium">
                        Label
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue={connection?.connectionLabel} name="connectionLabel" required />
                </label>


                <CustomSelect options={connectionTypes} placeholder="Choose connection" selectLabel="Connection Type" defaultValue={connection?.connectionType} />

                <ContactConnectionDropdown />

                <OrganisationConnectionDropdown />

                <Select>
                    <>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                    </>
                    <SelectContent>
                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                </Select>

                <Button>{connection ? "Edit" : "Add"}</Button>
            </form>
        </div>
    )
}