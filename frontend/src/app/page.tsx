

import { DashboardSkeleton } from "@/ui-system/skeletons/dashboard";
import { Suspense } from "react";

const EntityCard = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="bg-white p-2">
      {children}
    </div>
  )
}

export const coreEntities = ['Contacts', 'Organisations', 'Interactions', 'Connections', 'Messages', 'Support'];

export async function fetchWeather() {
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

  console.log('weather', weather)

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
    </div>
  )
}

const Page = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h1 className="bg-white w-full text-xl text-indigo-900 px-4 py-10  font-semibold">Dashboard</h1>
        <Suspense fallback={<DashboardSkeleton />}>
          <ShowWeather />
        </Suspense>
      </div>
    </>
  )
}

export default Page;