'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { FaSpinner } from 'react-icons/fa6';
import { redirectToLogin } from '@wristband/react-client-auth';

import { revealTenant } from '@/app/actions';
import { ResponseBox } from '@/components';

export function RequireAuthServerActionForm() {
  const [state, formAction] = useActionState(revealTenant, { message: '', authError: false });
  const { pending } = useFormStatus();

  return (
    <>
      <p className="mb-6 mx-auto">
        This Server Action uses the requireServerActionAuth() function to enforce an authenticated session.
      </p>
      <form action={formAction} className="w-full max-w-md mx-auto">
        {!state.authError && (
          <>
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
                'Reveal Tenant'
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
        <div className="my-4 text-left break-word whitespace-pre-wrap">
          {state?.message && <ResponseBox title={''} message={state.message} />}
        </div>
      </form>
    </>
  );
}
