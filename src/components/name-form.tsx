'use client';

import { useActionState } from 'react';

import { sayName } from '@/app/lib/actions';
import { clientRedirectToLogin } from '@/utils/helpers';
import { SayNameButton } from '@/components/say-name-button';

export default function NameForm() {
  const [state, formAction] = useActionState(sayName, { message: 'Please say your name...', authError: false });

  return (
    <form action={formAction} className="bg-white p-8 rounded shadow-md w-full max-w-md">
      {!state.authError && (
        <>
          <input
            type="text"
            name="username"
            placeholder="Your name..."
            required
            className="shadow-md border border-gray-300 rounded p-2 w-full mb-4"
          />
          <SayNameButton />
        </>
      )}
      {state.authError && (
        <button
          type="button"
          className="shadow-md cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:brightness-90 transition ease-in-out duration-200"
          onClick={() => clientRedirectToLogin()}
        >
          Login
        </button>
      )}
      <p className="mt-4 font-light">{state?.message}</p>
      {state.authError && <p className="my-4 font-light">Please login again.</p>}
    </form>
  );
}
