'use client'
import { Button } from "@/ui-system/components/ui/button";
import { useRouter } from 'next/navigation';

const NewInteractionButton = () => {
    const router = useRouter();

    return (
        <Button onClick={() => router.push('/interactions?new')}>Add Interaction</Button>
    )
}

export default NewInteractionButton;