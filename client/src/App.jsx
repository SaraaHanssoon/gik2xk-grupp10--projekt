import { Link, Outlet } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from '@mui/material';

function App() {
  return (
    <>
      <Box component="header" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* Uppdatera Typography för att inte använda Link direkt */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Produkter
            </Typography>
            {/* Använd Link som en component prop till Button */}
            <Button color="inherit" component={Link} to="/">Hem</Button>
            <Button color="inherit" component={Link} to="/admin">Lägg till produkt</Button>
            <Button color="inherit" component={Link} to="/cart">Kundvagn</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
