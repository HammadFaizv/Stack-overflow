import React, { createContext, useState } from "react";

const AiVerifiedContext = createContext();

export const ChatAiProvider = ({ children }) => {
  const [isVerfied, setIsVerified] = useState(false);

  const toggleVerifed = () => {
    setIsVerified(!isVerfied);
  };

  return (
    <AiVerifiedContext.Provider value={{ isVerfied, toggleVerifed }}>
      {children}
    </AiVerifiedContext.Provider>
  );
};

export default AiVerifiedContext;