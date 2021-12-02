import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const Context = createContext( {isLoginView: false, setIsLoginView: (val: boolean) => {}});