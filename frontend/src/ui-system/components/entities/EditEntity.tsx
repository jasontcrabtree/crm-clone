'use client'
import { EntityTypes } from "@/lib/types/utils";
import { Button } from "@/ui-system/components/ui/button";
import { useRouter } from 'next/navigation';

const EditEntity = ({ entityType, label }: { entityType: EntityTypes, label: string }) => {
    const router = useRouter();

    return (
        <Button onClick={() => router.push(`?edit`)}>{label}</Button>
    )
}

export default EditEntity;