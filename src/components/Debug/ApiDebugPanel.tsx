'use client';

import { useState } from 'react';
import { usePsyberAuth } from '@/contexts/PsyberAuthContext';
import apiClient from '@/lib/api/client';

export default function ApiDebugPanel() {
  const { user, isAuthenticated, debugState, refreshUser } = usePsyberAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('/api/user/me');
  const [apiResult, setApiResult] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const handleTestApi = async () => {
    try {
      setApiError(null);
      const result = await apiClient.get(apiEndpoint);
      setApiResult(result);
    } catch (err: any) {
      setApiError(err.message || 'API request failed');
      setApiResult(null);
    }
  };
  
  const handleClearToken = () => {
    apiClient.clearToken();
    window.location.reload();
  };
  
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-gray-800 p-2 text-xs text-white shadow-lg"
        >
          Debug
        </button>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md rounded-lg bg-white p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">API Debug Panel</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      
      <div className="mt-2 space-y-2 text-xs">
        <div className="space-y-1">
          <div className="font-semibold">Auth Status:</div>
          <div className="rounded bg-gray-100 p-1">
            {isAuthenticated ? 'Authenticated ✅' : 'Not authenticated ❌'}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="font-semibold">User Info:</div>
          <pre className="max-h-20 overflow-auto rounded bg-gray-100 p-1">
            {user ? JSON.stringify(user, null, 2) : 'No user data'}
          </pre>
        </div>
        
        <div className="space-y-1">
          <div className="font-semibold">Debug State:</div>
          <pre className="max-h-32 overflow-auto rounded bg-gray-100 p-1">
            {JSON.stringify(debugState, null, 2)}
          </pre>
        </div>
        
        <div className="space-y-1">
          <div className="font-semibold">Test API Endpoint:</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              className="flex-1 rounded border px-2 py-1 text-xs"
            />
            <button
              onClick={handleTestApi}
              className="rounded bg-blue-500 px-2 py-1 text-white"
            >
              Test
            </button>
          </div>
          
          {apiError && (
            <div className="mt-1 rounded bg-red-100 p-1 text-red-700">
              {apiError}
            </div>
          )}
          
          {apiResult && (
            <pre className="mt-1 max-h-32 overflow-auto rounded bg-gray-100 p-1">
              {JSON.stringify(apiResult, null, 2)}
            </pre>
          )}
        </div>
        
        <div className="flex justify-between pt-2">
          <button
            onClick={refreshUser}
            className="rounded bg-green-500 px-2 py-1 text-white"
          >
            Refresh User
          </button>
          
          <button
            onClick={handleClearToken}
            className="rounded bg-red-500 px-2 py-1 text-white"
          >
            Clear Token
          </button>
        </div>
      </div>
    </div>
  );
}