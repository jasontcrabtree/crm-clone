'use server';
import ConnectionList from "@/ui-system/components/connections/ConnectionList";
import { ContactsList } from "@/ui-system/components/contacts/ContactsList";
import { OrgList } from "@/ui-system/components/organisations/OrgList";

const Page = async () => {
  return (
    <>
      <div className={`w-full bg-zinc-200 max-h-screen overflow-y-scroll`}>
        <h1 className="w-full text-xl text-teal-700 px-4 pt-6 pb-0 font-semibold">Dashboard</h1>
        <div className="grid grid-cols-2 gap-2 mt-auto h-auto p-4">
          <div>
            Starts panel
          </div>
          <ContactsList size="full" length={6} />
          <OrgList size="full" length={6} />
          <ConnectionList size="full" length={6} />
        </div>
      </div>
    </>
  )
}

export default Page;