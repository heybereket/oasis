import React, { createContext, useEffect, useState } from 'react';

export const RuntimesContext = createContext<any>({});

export const RuntimesProvider: React.FC = ({ children }) => {
  const [runtimes, setRuntimes] = useState<any>();

  useEffect(() => {
    const getRuntimes = async () => {
      const fetchRuntimes = await fetch(
        'https://emkc.org/api/v2/piston/runtimes'
      ).then((res) => res.json());
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
