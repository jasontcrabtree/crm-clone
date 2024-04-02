'use client'
import { Button } from "../ui/button";
import { useFormState } from "react-dom";
import { createOrganisation } from "@/lib/actions/organisations";
import { Organisation } from "@/lib/types/entities";
import { updateEntityById } from "@/lib/actions/entities";
import CustomSelect from "../ui/CustomSelect";

export const SaveInteractionForm = async ({ organisation, ...props }: {
    organisation?: Organisation | null, props?: any
}) => {
    const initialState: any = {
        message: null,
        errors: {}
    }

    const [state, formAction] = useFormState(createOrganisation, initialState)

    const handleEditForm = async (formData: FormData) => {
        if (!organisation) throw new Error('Organisation required to edit');

        const updateEntity = await updateEntityById(organisation.id, formData, 'organisations');

        return updateEntity
    }

    return (
        <div className=''>
            <form className="flex flex-col gap-2" action={organisation ? handleEditForm : formAction}>
                <label htmlFor="organisationName">
                    <span className="font-medium">
                        Name
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue={organisation?.organisationName} name="organisationName" required />
                </label>

                <label htmlFor="organisationWebsite">
                    <span className="font-medium">
                        Website
                    </span>
                    <input className="text-zinc-800" type="url" defaultValue={organisation?.organisationWebsite} name="organisationWebsite" required />
                </label>

                <label htmlFor="organisationPhone">
                    <span className="font-medium">
                        Phone
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue={organisation?.organisationPhone} name="organisationPhone" required />
                </label>

                <label htmlFor="organisationAddress">
                    <span className="font-medium">
                        Address
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue={organisation?.organisationAddress} name="organisationAddress" required />
                </label>

                <label htmlFor="organisationCity">
                    <span className="font-medium">
                        City
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue={organisation?.organisationCity} name="organisationCity" required />
                </label>

                <label htmlFor="organisationCountry">
                    <span className="font-medium">
                        Country
                    </span>
                    <input className="text-zinc-800" type="text" defaultValue={organisation?.organisationCountry} name="organisationCountry" required />
                </label>

                <label htmlFor="organisationNotes">
                    Notes
                    <textarea className="text-zinc-800 w-full p-2 rounded-s" name="organisationNotes" id="" cols={16} rows={4}>
                        {organisation?.organisationNotes && organisation.organisationNotes}
                    </textarea>
                </label>

                <Button>{organisation ? "Edit" : "Add"}</Button>
            </form>
        </div>
    )
}