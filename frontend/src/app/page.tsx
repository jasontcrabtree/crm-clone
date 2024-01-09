const CorePageLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex w-full bg-blue-100 flex-col-reverse sm:flex-row">
      {children}
    </div>
  )
}

const EntityCard = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="bg-white p-2">
      {children}
    </div>
  )
}

export const coreEntities = ['Contacts', 'Organisations', 'Actions', 'Connections', 'Messages', 'Support'];

const Page = () => {
  return (
    <CorePageLayout>
      <>
        <div className="bg-yellow-100 w-full grid grid-cols-3 gap-1 p-1">
          {coreEntities.map((entity, key) => {
            return (
              <EntityCard key={key}>
                <div className="bg-white p-2">
                  {entity}
                </div>
              </EntityCard>
            )
          })}
        </div>
        <div className="bg-teal-100 w-full sm:min-w-24 sm:max-w-48 sm:h-screen">
          Action slot
        </div>
      </>
    </CorePageLayout>
  )
}

export default Page;