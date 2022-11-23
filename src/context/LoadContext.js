import React, { useContext, useState } from "react";

const LoadContext = React.createContext("");

const LoadContextProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  return (
    <LoadContext.Provider value={{loading, setLoading}}>
      {children}
    </LoadContext.Provider>
  );
};

export default LoadContextProvider;

export const useLoader = () => useContext(LoadContext);