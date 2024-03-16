import { createContext, useCallback, useContext, useState } from 'react';
interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}
interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption  [];
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
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
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
  
  const toggleDrawerOpen = useCallback(()=>{
    setDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);
  
  const handlerSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[])=>{
    setDrawerOptions(newDrawerOptions );  
  }, [isDrawerOpen,drawerOptions]);
    
  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handlerSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};

// function useCallBack(arg0: () => void, arg1: never[]) {
//   throw new Error('Function not implemented.');
// }
