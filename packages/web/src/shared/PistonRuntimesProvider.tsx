import { createContext, useEffect, useState } from 'react';

export const RuntimesContext = createContext<any>({});

export const RuntimesProvider: React.FC = ({ children }) => {
  const [runtimes, setRuntimes] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await fetch('https://emkc.org/api/v2/piston/runtimes');
      const json = await res.json();
      setRuntimes(json);
    })();
  }, []);

  return (
    <RuntimesContext.Provider value={runtimes}>
      {children}
    </RuntimesContext.Provider>
  );
};
