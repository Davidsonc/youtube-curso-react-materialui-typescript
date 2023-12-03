import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from './shared/themes';

export const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
    </ThemeProvider>
  );
}