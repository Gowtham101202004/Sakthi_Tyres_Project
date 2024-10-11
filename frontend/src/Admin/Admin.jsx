import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar'; // For profile picture
import './Admin.css'; // Import custom CSS

const drawerWidth = 240;

const Admin = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [adminData, setAdminData] = React.useState({});

  React.useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const data = JSON.parse(storedData).data;
      setAdminData(data);
    }
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      bgcolor="#2c3e50" 
      color="white"
    >
      {/* Profile Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        {adminData.name ? (
          <>
            <Avatar
              alt={adminData.name.toUpperCase()}
              src={adminData.name.charAt(0).toUpperCase()}
              sx={{ width: 50, height: 50, marginBottom: '8px' }}
            />
            <Typography variant="h6" color="white">
              {adminData.name}
            </Typography>
            <Typography variant="body2" color="rgb(230, 230, 230)">
              {adminData.email}
            </Typography>
          </>
        ) : (
          <Typography variant="h6" color="white">
            Loading...
          </Typography>
        )}
      </Box>
      <Divider sx={{ bgcolor: 'grey.400' }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin">
            <ListItemIcon sx={{ color: 'white' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="manageuser">
            <ListItemIcon sx={{ color: 'white' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Manage Users"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="manageproduct">
            <ListItemIcon sx={{ color: 'white' }}>
              <WorkspacePremiumIcon />
            </ListItemIcon>
            <ListItemText primary={"Manage Products"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ bgcolor: 'grey.400' }} />
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/">
          <ListItemIcon sx={{ color: 'white' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: '#2c3e50',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#2c3e50',
              color: 'white',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#2c3e50',
              color: 'white',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { sm: `${drawerWidth}px` }, 
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: '100vh',
          }}
        >
          <Toolbar /> {/* Adds space for AppBar */}
          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              marginTop: '0',
              boxShadow: 'none',
            }}
          >
            <Outlet />
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Admin;