
import { createContext, useContext, useEffect, useState } from "react";
import Calls from "../utils/api";

// Defaultní hodnota pro lepší napovídání v IDE
const SessionContext = createContext({
    session: { data: null, status: "loading" },
    setSession: () => {}
});

export function useSession() {
    return useContext(SessionContext);
}

export const SessionProvider = ({ children }) => {
    const [sessionState, setSessionState] = useState({ data: null, status: "loading" });

    useEffect(() => {
        Calls.journalList()
            .then(data => setSessionState({ data, status: "authenticated" }))
            .catch(e => {
                if (e.response && e.response.status === 401) {
                    setSessionState({ data: null, status: "unauthenticated" });
                } else {
                    throw e;
                }
            });
    }, []);

    return (
        <SessionContext.Provider value={{ session: sessionState, setSession: setSessionState }}>
            {children}
        </SessionContext.Provider>
    );
};
