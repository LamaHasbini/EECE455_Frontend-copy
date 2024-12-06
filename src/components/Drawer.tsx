// import { 
//   Box,			CssBaseline,
//   AppBar,		Toolbar,
//   Divider,		List, 
//   ListItem,		ListItemButton, 
//   ListItemText,	Drawer
// } from '@mui/material';
// import React from 'react';

// const drawerWidth = 240;

// interface MyName {
//   SetCipherName: React.Dispatch<React.SetStateAction<string>>;
// }

// export default function MyDrawer({ SetCipherName }: MyName) {
//   const cipherOptions = ['Affine', 'Mono-Alphabetic', 'Vigenere', 'Hill', 'Playfair', 'Extended GCD'];

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
//       >
//         {/* <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             {Name}
//           </Typography>
//         </Toolbar> */}
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             backgroundColor: '#4A6B7D',
//             color: 'white',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Divider />
//         <List>
//           {cipherOptions.map((text) => (
//             <React.Fragment key={text}>
//               <ListItem disablePadding>
//                 <ListItemButton onClick={() => SetCipherName(text)}>
//                   <ListItemText primary={text} />
//                 </ListItemButton>
//               </ListItem>
//               <Divider />
//             </React.Fragment>
//           ))}
//         </List>
//       </Drawer>
//     </Box>
//   );
// }

import { 
  Box, CssBaseline, AppBar, Toolbar, Divider, List, ListItem, ListItemButton, ListItemText, Drawer, IconButton 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function MyDrawer() {
  const navigate = useNavigate();
  const cipherOptions = [
    { name: 'Affine', path: '/affine' },
    { name: 'Mono-Alphabetic', path: '/monoalphabetic' },
    { name: 'Vigenere', path: '/vigenere' },
    { name: 'Hill', path: '/hill' },
    { name: 'Playfair', path: '/playfair' },
    { name: 'Extended GCD', path: '/extendedgcd' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* You can add a toolbar or header here if needed */}
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
          {cipherOptions.map((option) => (
            <React.Fragment key={option.name}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate(option.path)}>
                  <ListItemText primary={option.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} /> {/* This Box takes up the remaining space */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-start' }}>
          <IconButton onClick={() => navigate('/')} sx={{ color: 'white' }}>
            <HomeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
      </Drawer>
    </Box>
  );
}