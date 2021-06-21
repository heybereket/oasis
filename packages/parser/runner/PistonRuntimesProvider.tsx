import React, { createContext, useEffect, useState } from 'react';
import { request } from '@oasis-sh/shared';

export const RuntimesContext = createContext<any>({});

export const RuntimesProvider: React.FC = ({ children }) => {
  const [runtimes, setRuntimes] = useState<any>();

  useEffect(() => {
    const getRuntimes = async () => {
      const fetchRuntimes = await request(
        'https://emkc.org/api/v2/piston/runtimes'
      ).then((res: any) => res.json());
      setRuntimes(fetchRuntimes);
    };

    getRuntimes();
  }, []);

  return (
    <RuntimesContext.Provider value={runtimes}>
      {children}
    </RuntimesContext.Provider>
  );
};
