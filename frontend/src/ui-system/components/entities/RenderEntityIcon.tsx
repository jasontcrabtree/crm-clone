import { UserGroupIcon, BuildingOffice2Icon, ArrowPathIcon, BoltIcon } from "@heroicons/react/24/outline";

const RenderEntityIcon = ({ entityType, size = "w-5" }: { entityType: string, size?: string }): JSX.Element => {
    console.log('entityType', entityType, size)
    if (entityType === 'ContactModel') {
        return <UserGroupIcon className={`${size}`} />
    } else if (entityType === 'OrganisationModel') {
        return <BuildingOffice2Icon className={`${size}`} />
    } else if (entityType === 'ConnectionModel') {
        return <ArrowPathIcon className={`${size}`} />
    } else if (entityType === "InteractionModel") {
        return <BoltIcon className={`${size}`} />
    } else {
        return <></>
    }
};

export default RenderEntityIcon;