import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';


import { DarkTheme, LightTheme } from './../themes';


interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = createContext({} as IThemeContextData);

interface IAppThemeProviderProps {
    children: React.ReactNode
}

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

// eslint-disable-next-line react/prop-types
export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) =>{
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');
  const toggleTheme = useCallback(()=>{
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);
    
  const theme = useMemo(()=>{
    if(themeName === 'light') return LightTheme;
    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

function useCallBack(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
