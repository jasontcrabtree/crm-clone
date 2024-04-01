'use client'
import { Button } from "@/ui-system/components/ui/button";
import { useRouter } from 'next/navigation';

const NewConnectionButton = () => {
    const router = useRouter();

    return (
        <Button onClick={() => router.push('/connections?new')}>Add Connection</Button>
    )
}

export default NewConnectionButton;