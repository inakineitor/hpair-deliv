import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import firebase from 'firebase/compat/app';

import { AppBar } from './AppBar.tsx';
import { Avatar, Stack } from '@mui/material';
import { ColorModeToggle } from './ColorModeToggle.tsx';

export type MenuBarProps = {
  open: boolean;
  toggleDrawer: () => void;
  isSignedIn: boolean;
};

export function MenuBar({ open, toggleDrawer, isSignedIn }: MenuBarProps) {
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Outreach Contacts
        </Typography>
        <Typography
          component="h1"
          variant="body1"
          color="inherit"
          noWrap
          sx={{
            display: isSignedIn ? 'inline' : 'none',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              sx={{
                marginLeft: '5px',
                marginRight: '5px',
              }}
              src={firebase.auth().currentUser?.photoURL}
            >
              {firebase.auth().currentUser?.displayName ??
                firebase.auth().currentUser?.email ??
                'U'}
            </Avatar>
            <span>{firebase.auth().currentUser?.displayName}</span>
          </Stack>
        </Typography>
        <ColorModeToggle />
        <Button
          variant="contained"
          size="small"
          sx={{
            marginLeft: '20px',
            marginTop: '5px',
            marginBottom: '5px',
            display: isSignedIn ? 'inline' : 'none',
          }}
          onClick={() => firebase.auth().signOut()}
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
