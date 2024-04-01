'use client';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Organisation } from "@/lib/types/entities";
import { deleteEntityById } from "@/lib/actions/entities";

const OrgCard = ({ organisation }: { organisation: Organisation }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-2 border-gray-200 border-[1px] rounded p-2">
            <div className="flex flex-row gap-1 align-center">
                <Button onClick={() => router.push(`/organisations?edit=${organisation.id}`)}>
                    Edit
                </Button>
                <Button onClick={(() => deleteEntityById(organisation.id, 'organisations'))}>
                    Delete
                </Button>
            </div>

            <h2 className="text-indigo-700 font-bold">{organisation?.organisationName && organisation.organisationName}</h2>
            <p>{organisation?.organisationAddress && organisation.organisationAddress}</p>
            <p>{organisation?.organisationPhone && organisation.organisationPhone}</p>
            <p>{organisation?.organisationCity && organisation.organisationCity}</p>
            <p>{organisation?.organisationCountry && organisation.organisationCountry}</p>
            {organisation?.organisationNotes && (
                <p>{organisation?.organisationNotes}</p>
            )}

            {organisation?.organisationWebsite && (
                <a href={organisation.organisationWebsite}>
                    {organisation.organisationWebsite}
                </a>
            )}
        </div>
    )
}

export default OrgCard;