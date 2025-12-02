'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { FaSpinner } from 'react-icons/fa6';
import { redirectToLogin } from '@wristband/react-client-auth';

import { updateTenantDescription } from '@/app/actions';
import { ResponseBox } from '@/components';

export function ManualCheckServerActionForm() {
  const [state, formAction] = useActionState(updateTenantDescription, { message: '', authError: false });
  const { pending } = useFormStatus();

  return (
    <>
      <p className="mb-6 mx-auto">
        This Server Action uses the session data from getServerActionSession() to perform a manual auth check. The new
        description is saved with saveServerActionSession(). The session is destroyed with destroyServerActionSession()
        if not unauthenticated.
      </p>
      <form action={formAction} className="w-full max-w-md mx-auto">
        {!state.authError && (
          <>
            <h3>Enter a new description for your tenant.</h3>
            <input
              type="text"
              name="description"
              required
              maxLength={100}
              placeholder="Enter description..."
              className="shadow-md border border-gray-300 text-gray-700 rounded p-2 w-full my-4"
            />
            <button
              type="submit"
              aria-disabled={pending}
              disabled={pending}
              className={`relative inline-flex items-center shadow-md cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:brightness-90 transition ease-in-out duration-200 ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {pending ? (
                <>
                  <FaSpinner className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" />
                  Fetching...
                </>
              ) : (
                'Update'
              )}
            </button>
          </>
        )}
        {state.authError && (
          /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
          <button
            type="button"
            className="shadow-md cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:brightness-90 transition ease-in-out duration-200"
            onClick={() => redirectToLogin('/api/auth/login')}
          >
            Login
          </button>
        )}
        <div className="my-4 break-word whitespace-pre-wrap">
          {state?.message && <ResponseBox title={'New Tenant Description:'} message={state.message} />}
        </div>
      </form>
    </>
  );
}
