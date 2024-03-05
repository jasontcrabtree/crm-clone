'use client'
import { Button } from "@/ui-system/components/ui/button";
import { useRouter } from 'next/navigation';

const NewContactButton = () => {
    const router = useRouter();

    return (
        <Button onClick={() => router.push('/contacts?new')}>Add Contact</Button>
    )
}

export default NewContactButton;