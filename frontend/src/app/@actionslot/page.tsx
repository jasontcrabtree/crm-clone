import ActionSlot from "@/ui-system/components/action-slot/action-slot";

const OverviewActionSlot = ({ params }: { params: any }) => {
    console.log('params', params)
    return (
        <ActionSlot>
            <h2>Action Slot</h2>
        </ActionSlot>
    )
}

export default OverviewActionSlot;