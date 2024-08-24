import { createContext, useContext } from 'react';

const DirectoryContext = createContext({});

export default DirectoryContext;

export const useDir = () => {
    return useContext(DirectoryContext);
}