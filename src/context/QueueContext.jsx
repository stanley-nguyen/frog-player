import React, { createContext, useContext, useState } from 'react';

const QueueContext = createContext({});

export default function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);

  return (
    <QueueContext.Provider
      value={{
        queue, setQueue
      }}>
      {children}
    </QueueContext.Provider>
  );
}

export const useQueue = () => {
  return useContext(QueueContext);
}