import { useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';

import './App.css';

import { MainListItems } from './components/MainListItems.tsx';
import { SignInScreen } from './components/SignInScreen/SignInScreen.tsx';
import { MenuBar } from './components/MenuBar.tsx';
import { Drawer } from './components/Test.tsx';
import { ThemeContextProvider } from './contexts/theme-context.tsx';
import { MainContent } from './components/MainContent/MainContent.tsx';
import { AuthContext, AuthContextProvider } from './contexts/auth-context.tsx';

// App.js is the homepage and handles top-level functions like user auth.

export default function App() {
  // Navbar drawer functionality

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <AuthContext.Consumer>
          {({ isSignedIn }) => (
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <MenuBar
                open={open}
                toggleDrawer={toggleDrawer}
                isSignedIn={isSignedIn}
              />
              <Drawer variant="permanent" open={open}>
                <Toolbar
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                  }}
                >
                  <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                  </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                  <MainListItems />
                </List>
              </Drawer>
              <Box
                component="main"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
                }}
              >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  {isSignedIn ? ( // Main content of homescreen. This is displayed conditionally from user auth status
                    <MainContent />
                  ) : (
                    <SignInScreen />
                  )}
                </Container>
              </Box>
            </Box>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}
