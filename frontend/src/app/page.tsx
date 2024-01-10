

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
    // Artificially delay a reponse for demo purposes.
    // Don't do this in real life :)

    console.log('Fetching revenue data...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    const data = await fetch('https://crm-clone.azurewebsites.net/weatherforecast')
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));

    console.log('Data fetch complete after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

const ShowWeather = async () => {
  const weather = await fetchWeather();

  console.log('weather', weather)

  return (
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
  )
}

const Page = () => {
  return (
    <>
      <Suspense fallback={<DashboardSkeleton />}>
        <ShowWeather />
      </Suspense>
    </>
  )
}

export default Page;