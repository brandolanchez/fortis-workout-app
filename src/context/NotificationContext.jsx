import React, { createContext, useState, useMemo } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (productData) => {
    setNotification(productData);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const contextValue = useMemo(() => ({
    notification,
    showNotification,
    hideNotification,
  }), [notification]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
