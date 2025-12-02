import { cookies } from 'next/headers';

import { ResponseBox, ServerActionTabNav } from '@/components';
import { getServerComponentSession } from '@/wristband';

export default async function ServerComponentPage() {
  const cookieStore = await cookies();
  const session = await getServerComponentSession(cookieStore);
  const { email, isAuthenticated } = session;
  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  const message = isAuthenticated && email ? email : 'You are not authenticated. Please log in again.';

  return (
    <section className="flex flex-col justify-center text-center">
      <div className="mt-8 mb-4 mx-auto">
        <h1 className="text-2xl font-bold underline">Server Components and Actions</h1>
        <p className="mt-8 mx-auto">
          This Server Component page is protcted by the auth middleware/proxy before rendering. Once the page is
          rendered, it relies on the getServerComponentSession() function to perform an auth check before displaying the
          email address.
        </p>
        <div className="my-4 mx-auto break-word whitespace-pre-wrap">
          <ResponseBox title={'Current User Email:'} message={message} />
        </div>
        <hr className="my-8 border border-pink" />
        <p className="mt-8 mx-auto">
          Server Actions are <strong>not</strong> protected by the auth middleware/proxy.
        </p>
      </div>
      <ServerActionTabNav />
    </section>
  );
}
