import { 
  Box,			CssBaseline,
  AppBar,		Toolbar,
  Divider,		List, 
  ListItem,		ListItemButton, 
  ListItemText,	Drawer
} from '@mui/material';
import React from 'react';

const drawerWidth = 240;

interface MyName {
  SetCipherName: React.Dispatch<React.SetStateAction<string>>;
}

export default function MyDrawer({ SetCipherName }: MyName) {
  const cipherOptions = ['Affine', 'Mono-Alphabetic', 'Vigenere', 'Hill', 'Playfair', 'Extended GCD'];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {Name}
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#4A6B7D',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {cipherOptions.map((text) => (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => SetCipherName(text)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
