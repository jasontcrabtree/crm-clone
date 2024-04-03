'use client';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Connection } from "@/lib/types/entities";
import { deleteEntityById } from "@/lib/actions/entities";
import Link from "next/link";
import { displayConnectionType, displayOrganisationType } from "@/lib/client/client-utils";

const ConnectionCard = ({ connection }: { connection: Connection }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-2 border-gray-200 border-[1px] rounded p-2">
            <div className="flex flex-row gap-1 align-center">
                <Button onClick={() => router.push(`/connections?edit=${connection.id}`)}>
                    Edit
                </Button>
                <Button className="bg-zinc-100 border-red-700 text-red-700 hover:bg-red-700 hover:text-white" onClick={(() => deleteEntityById(connection.id, 'connections'))}>
                    Delete
                </Button>
            </div>

            <div className="flex flex-row gap-1 content-center w-full justify-between flex-wrap">
                {connection?.connectionLabel && (
                    <h2 className="text-indigo-700 font-bold">
                        {connection?.connectionLabel}
                    </h2>
                )}


                {displayConnectionType(parseInt(connection?.connectionType)) !== connection?.connectionLabel && (
                    <p className="text-green-700">
                        {displayConnectionType(parseInt(connection?.connectionType))}
                    </p>
                )}
            </div>

            <hr />

            {connection?.contactDetails && (
                <>
                    {connection?.contactDetails?.contactEmail ? (
                        <Link href={`mailto${connection?.contactDetails?.contactEmail}`}>
                            {connection?.contactDetails?.contactFirstName} {connection?.contactDetails?.contactSurname}
                        </Link>
                    ) : (
                        <p className="">
                            {connection?.contactDetails?.contactFirstName} {connection?.contactDetails?.contactSurname}
                        </p>
                    )}
                </>
            )}

            <hr />

            {connection?.organisationDetails && (
                <>
                    <div className="flex flex-row gap-1 content-center w-full justify-between flex-wrap">
                        <p className="">
                            {connection?.organisationDetails?.organisationName}
                        </p>

                        <p className="text-red-700">
                            {displayOrganisationType(parseInt(connection?.organisationDetails?.organisationType))}
                        </p>
                    </div>

                    {connection?.organisationDetails?.organisationWebsite && (
                        <Link href={connection?.organisationDetails?.organisationWebsite}>
                            {connection?.organisationDetails?.organisationWebsite}
                        </Link>
                    )}

                    <p>
                        {connection?.organisationDetails?.organisationCity && (
                            <>
                                {connection?.organisationDetails?.organisationCity},{' '}
                            </>
                        )}
                        {connection?.organisationDetails?.organisationCountry && (
                            <>
                                {connection?.organisationDetails?.organisationCountry}
                            </>
                        )}
                    </p>
                </>
            )}
        </div>
    )
}

export default ConnectionCard;