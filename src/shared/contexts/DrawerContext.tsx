import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

export const DrawerContext = createContext({} as IDrawerContextData);

interface IAppDrawerProviderProps {
    children: React.ReactNode
}

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

// eslint-disable-next-line react/prop-types
export const DrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) =>{
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawerOpen = useCallback(()=>{
    setDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);
    
  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

// function useCallBack(arg0: () => void, arg1: never[]) {
//   throw new Error('Function not implemented.');
// }
