'use client'
import { Button } from "@/ui-system/components/ui/button";
import { useRouter } from 'next/navigation';

const NewOrgButton = () => {
    const router = useRouter();

    return (
        <Button onClick={() => router.push('/organisations?new')}>Add Organisation</Button>
    )
}

export default NewOrgButton;