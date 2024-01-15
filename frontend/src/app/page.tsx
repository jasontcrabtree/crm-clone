import { getAllContacts } from "@/lib/actions/contacts";
import { DashboardSkeleton } from "@/ui-system/skeletons/dashboard";
import { Suspense } from "react";

const EntityCard = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="bg-white p-2">
      {children}
    </div>
  )
}

const coreEntities = ['Contacts', 'Organisations', 'Interactions', 'Connections', 'Messages', 'Support'];

const fetchWeather = async () => {
  try {
    const data = await fetch('http://localhost:5298/weatherforecast')
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(String(error));
  }
}

const ShowWeather = async () => {
  const weather = await fetchWeather();

  return (
    <div className="bg-yellow-100 w-full h-full grid grid-cols-3 gap-1 p-1">
      {coreEntities.map((entity, key) => {
        return (
          <EntityCard key={key}>
            <div className="bg-white p-2">
              {entity}
            </div>
          </EntityCard>
        )
      })}
      <div className=" col-span-full flex flex-row gap-2">
        {weather.map((item: any, key: number) => {
          return (
            <div key={key} className="bg-white p-2 pb-4 h-fit">
              <p>{item.summary}</p>
              <p>{item.temperatureC}</p>
              <p>{item.date}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Page = async () => {

  const contacts = await getAllContacts();
  console.log(contacts)
  // console.log('contacts', contacts);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h1 className="bg-white w-full text-xl text-indigo-900 px-4 py-10  font-semibold">Dashboard</h1>
        <Suspense fallback={<DashboardSkeleton />}>
          <ShowWeather />
          <div>
            {contacts.map((contact, index) => {
              return (
                <div key={index}>
                  <h2>
                    {contact.contactFirstName}
                  </h2>
                  <h3>
                    {contact.contactNotes}
                  </h3>
                </div>
              )
            })}
          </div>
        </Suspense>
      </div>
    </>
  )
}

export default Page;