import { useAuth } from '@/features/auth';
import { TabBar } from '@/features/ui/header';
import { BookBarChart } from '@/pages/BookBarChart';
import { BookDetail } from '@/pages/BookDetail';
import { Forbidden } from '@/pages/Forbidden';
import { Home } from '@/pages/Home';
import { NewBook } from '@/pages/NewBook';
import { NotFound } from '@/pages/NotFound';
import { Search } from '@/pages/Search';
import { getTheme } from '@/theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/naming-convention
import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { BookPieChart } from './pages/BookPieChart';

const ColorModeContext = React.createContext({
  // eslint-disable-next-line no-empty-function
  toggleColorMode: () => {},
});

const Layout = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      width: '100svw',
      height: '100svh',
    }}
  >
    <TabBar />
    <Outlet />
  </Box>
);

const App = () => {
  const { writePermission } = useAuth();
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="buchweb" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="book/:id" element={<BookDetail />} />
            <Route
              path="new"
              element={writePermission ? <NewBook /> : <Forbidden />}
            />
            <Route path="barchart" element={<BookBarChart />} />
            <Route path="piechart" element={<BookPieChart />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { App, ColorModeContext };
