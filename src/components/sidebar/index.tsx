import { useState, type ReactNode } from 'react';

import { AppRegistration, AssignmentAdd, Checklist, Home, PeopleAlt } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Wrapper
const DrawerWrapper = ({ children, isOpen }: { children: ReactNode[], isOpen: boolean }) => {
  const drawerWidth = 300;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          padding: '1em',
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '1px 0px 5px #efefef'
        },
      }}
      variant="persistent"
      anchor="left"
      open={isOpen}
    >
      {children}
    </Drawer>
  );
};

// Sidebar Header
const DrawerHeader = ({ handleDrawerClose }: { handleDrawerClose: () => void }) => {
  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr'
      }}>
        <img
          alt="logo"
          src="logo.png"
          style={{
            height: 40,
            gridColumn: '2',
            justifySelf: 'center'
          }}
        />
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            color: 'primary.main',
            justifySelf: 'end'
          }}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider sx={{
        backgroundColor: 'primary.main',
        marginY: '1em',
        height: '2px'
      }}
      />
    </>
  );
};

// Menu
const DrawerList = () => {
  const menuItems = [
    {
      text: 'Página Inicial',
      icon: <Home />,
    },
    {
      text: 'Cadastro',
      icon: <AssignmentAdd />,
    },
    {
      text: 'Alunos',
      icon: <PeopleAlt />,
    },
    {
      text: 'Frequência',
      icon: <Checklist />,
    },
    {
      text: 'Atividades',
      icon: <AppRegistration />,
    },
  ];

  return (
    <List
      sx={{
        color: 'primary.main',
      }}
    >
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton sx={{
            backgroundColor: '#efefef',
            borderRadius: '.7em',
            padding: '.7em 1em',
            marginBottom: '1em',
          }}>
            <ListItemIcon sx={{ color: 'primary.main', minWidth: '3em' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ '& .MuiListItemText-primary': { fontWeight: 'bold' } }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => open ? setOpen(false) : setOpen(true);

  return (
    <>
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{ color: 'primary.main', m: 1 }}
      >
        <MenuIcon />
      </IconButton>

      <DrawerWrapper isOpen={open}>
        <DrawerHeader handleDrawerClose={handleDrawerToggle} />
        <DrawerList />
      </DrawerWrapper>

    </>
  );
};

export default Sidebar;