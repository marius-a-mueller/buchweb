import { Box } from '@mui/material';
import { TabBar } from './components/tabbar/TabBar';

function App() {
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
      <Box sx={{ flexGrow: 2 }} />
    </Box>
  );
}

export default App;
