'use server';
import { getAllContacts } from "@/lib/actions/contacts";
import ConnectionList from "@/ui-system/components/connections/ConnectionList";
import { ContactsList } from "@/ui-system/components/contacts/ContactsList";
import { InteractionList } from "@/ui-system/components/interactions/InteractionList";
import { OrgList } from "@/ui-system/components/organisations/OrgList";
import { DashboardSkeleton } from "@/ui-system/skeletons/dashboard";
import { Suspense } from "react";


const Page = async () => {
  // const contacts = await getAllContacts();
  // console.log(contacts)

  return (
    <>
      <div className={`w-full bg-zinc-50 max-h-screen overflow-y-scroll`}>
        <h1 className="bg-white w-full text-xl text-indigo-900 px-4 pt-10 pb-4 font-semibold">Dashboard</h1>
        <div className="grid grid-cols-2 gap-2 mt-auto h-auto">
          <InteractionList size="full" length={6} />
          <ContactsList size="full" length={6} />
          <OrgList size="full" length={6} />
          <ConnectionList size="full" length={6} />
        </div>
      </div>
    </>
  )
}

export default Page;