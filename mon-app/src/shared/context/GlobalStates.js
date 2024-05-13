import { useContext, createContext, useState } from "react";

const LoadingErrorContext = createContext();

export const GlobalStatesProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(
    localStorage.getItem("user_ref_lpMds")
      ? JSON.parse(localStorage.getItem("user_ref_lpMds"))
      : null
  );

  const setUser = async (token, userId, username) => {
    if (token && userId) {
      localStorage.setItem(
        "user_ref_lpMds",
        JSON.stringify({ token, id: userId, username }),
        {
          expires: 1,
        }
      );

      setUserSession({ token, userId, username });
    } else {
      localStorage.removeItem("user_ref_lpMds");
      setUserSession(null);
    }
  };

  const GlobalStatesContextValues = {
    userSession,
    setUserSession,

    setUser,
  };

  return (
    <LoadingErrorContext.Provider value={GlobalStatesContextValues}>
      {children}
    </LoadingErrorContext.Provider>
  );
};

export const useGlobalStatesContext = () => {
  return useContext(LoadingErrorContext);
};
