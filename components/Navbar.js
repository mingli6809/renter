import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const navItems = [{ label: "Home", key: "all" }, { label: "About", key: "about" }, { label: "Help", key: "help" }]
const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, }}>
            <Link href={`/listings/all`}>Rental Listings Management System</Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.key} sx={{ color: '#fff' }}>
                {item.key === "all" ? (<Link href={`/listings/${item.key}`}>{item.label}</Link>) : (<Link href={`/${item.key}`}>{item.label}</Link>)}
              </Button>
            ))}
          </Box>
          {/* <Button color="inherit">Create New Listing</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;