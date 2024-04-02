'use client';
import { getEntityById } from '@/lib/actions/entities';
import { Connection, Contact, Organisation } from '@/lib/types/entities';
import { EntityTypes } from '@/lib/types/utils';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useActionSlotParams = ({
  entityType,
}: {
  entityType: EntityTypes;
}) => {
  const searchParams = useSearchParams();

  const [actionState, setActionState] = useState('default');
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    if (searchParams.has('new')) {
      setActionState('new');
    } else if (searchParams.get('edit')) {
      setActionState('edit');
      (async () => {
        const entityData: any = await getEntityById(
          parseInt(searchParams.get('edit') as string),
          entityType
        );
        setEntity(entityData);
      })();
    }
  }, [searchParams.get('new'), searchParams.get('edit')]);

  return {
    actionState,
    setActionState,
    entity,
  };
};
