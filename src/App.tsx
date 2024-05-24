import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { TabBar } from '@/features/ui/header';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Search } from '@/pages/Search';
import { NewBookForm } from '@/pages/NewBookForm';
import React from 'react';
import { getTheme } from '@/theme';
import { BarChart } from '@/pages/BarChart';
import { ColumnChart } from '@/pages/ColumnChart';
import { useAuth } from '@/features/auth';
import { Forbidden } from '@/pages/Forbidden';
import { BookDetail } from '@/pages/BookDetail';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const { writePermission } = useAuth();
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search/" element={<Search />} />
            <Route path="book/:bookId" element={<Home />} />
            <Route
              path="new"
              element={writePermission ? <NewBookForm /> : <Forbidden />}
            />
            <Route path="barchart" element={<BarChart />} />
            <Route path="columnchart" element={<ColumnChart />} />
            <Route path="book/:id" element={<BookDetail />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function Layout() {
  return (
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
}

export default App;
