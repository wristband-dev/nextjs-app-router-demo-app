'use client';

import frontendApiService from '@/services/frontend-api-service';
import { clientRedirectToLogin, isUnauthorizedError } from '@/utils/helpers';

const FetchButton: React.FC = () => {
  const sayHello = async () => {
    try {
      const data = await frontendApiService.sayHello();
      alert(data.message);
    } catch (error: unknown) {
      console.error(error);

      /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
      if (isUnauthorizedError(error)) {
        clientRedirectToLogin(window.location.href);
        return;
      }

      alert(error);
    }
  };

  return (
    <div>
      <button
        id="say-hello-button"
        type="button"
        tabIndex={0}
        onClick={sayHello}
        className="shadow-md cursor-pointer w-full bg-[#00ffc1] hover:brightness-90 text-[#0c0c0c] rounded py-2 px-3 font-semibold text-lg transition ease-in-out duration-200"
      >
        Say Hello
      </button>
    </div>
  );
};

export default FetchButton;
