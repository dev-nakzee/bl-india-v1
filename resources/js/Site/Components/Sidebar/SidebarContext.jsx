import React, { createContext, useContext, useState } from 'react';

  const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
              {children}
    </SidebarContext.Provider>
  );
};
export default SidebarContext;
