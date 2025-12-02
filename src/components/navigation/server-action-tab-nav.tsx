'use client';

import { useState } from 'react';

import { ManualCheckServerActionForm, RequireAuthServerActionForm, TabSelectorButton } from '@/components';

export function ServerActionTabNav() {
  const [activeTab, setActiveTab] = useState<'manual' | 'require'>('manual');

  return (
    <div className="flex flex-col gap-2 w-full">
      <hr className="my-2" />
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <TabSelectorButton
          title="Server Action - Manual Check"
          isActive={activeTab === 'manual'}
          onClick={() => setActiveTab('manual')}
        />
        <TabSelectorButton
          title="Server Action - Require Auth"
          isActive={activeTab === 'require'}
          onClick={() => setActiveTab('require')}
        />
      </div>
      <div className="my-2 mx-auto">
        {activeTab === 'manual' && <ManualCheckServerActionForm />}
        {activeTab === 'require' && <RequireAuthServerActionForm />}
      </div>
    </div>
  );
}
