'use server';

import { getSettingsData } from '../lib/actions';

// Server Component
export default async function SettingsPage() {
  const data = await getSettingsData();
  return (
    <section className="flex flex-col justify-center text-center">
      <div className="mt-0 mb-4 mx-auto">
        <h1 className="text-3xl font-bold underline">Settings</h1>
      </div>

      <div className="my-8 mx-auto">
        <h2 className="mb-4 mx-auto font-bold">Server Component</h2>
        <pre className="text-left break-word whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
}
