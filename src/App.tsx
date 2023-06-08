import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import SplashScreen from './components/SplashScreen';
import useAuth from './hooks/useAuth';
import useScrollReset from './hooks/useScrollReset';
import useSettings from './hooks/useSettings';
import routes from './routes';
import { createCustomTheme } from './theme';
import AuthGuard from './components/AuthGuard';

const App: FC = () => {
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const auth = useAuth();

  useScrollReset();

  const theme = createCustomTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" />
      <AuthGuard>
        {auth.isInitialized ? content : <SplashScreen />}
      </AuthGuard>
    </ThemeProvider>
  );
};

export default App;
