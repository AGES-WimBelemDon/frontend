import { useState, type ReactNode } from 'react';

import { AppRegistration, AssignmentAdd, Checklist, Home, PeopleAlt } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Fade, useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Wrapper
const DrawerWrapper = ({ children, isOpen, isMobile }: { children: ReactNode[], isOpen: boolean, isMobile: boolean }) => {
  const drawerWidth = isMobile ? '100%' : '300px';

  return (
    <Drawer
      sx={{
        width: isOpen ? drawerWidth : '80px',
        flexShrink: 0,
        overflow: 'hidden',
        transition: '.5s all ease',
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidth : '80px',
          padding: '1em',
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '1px 0px 5px #efefef',
          transition: '.5s all ease',
        },
      }}
      variant="persistent"
      anchor="left"
      open={isMobile ? isOpen : true}
    >
      {children}
    </Drawer>
  );
};

// Sidebar Header
const DrawerHeader = ({ handleDrawerClose, isOpen }: { handleDrawerClose: () => void, isOpen: boolean }) => {
  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isOpen ? '1fr 1fr 1fr' : '1fr'
      }}>
        {
          isOpen && (
            <Fade in={isOpen}>
              <img
                alt="WBD Logo"
                src="logo.png"
                style={{
                  height: 40,
                  gridColumn: '2',
                  justifySelf: 'center',
                }}
              />
            </Fade>
          )
        }

        <IconButton
          aria-label='close/toggle drawer'
          onClick={handleDrawerClose}
          sx={{
            color: 'primary.main',
            justifySelf: isOpen ? 'end' : 'center',
            rotate: isOpen ? '0deg' : '180deg',
            transition: '.5s all ease',
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
const DrawerMenu = () => {
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
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            marginBottom: '1em',
          }} aria-label='menu item'>
            <ListItemIcon sx={{ color: 'primary.main', minWidth: 'fit-content' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ '& .MuiListItemText-primary': { fontWeight: 'bold', textWrap: 'nowrap', overflow: 'hidden', marginLeft: '1em' } }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleDrawerToggle = () => open ? setOpen(false) : setOpen(true);

  return (
    <>
      {
        isMobile && (
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ color: 'primary.main', m: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )
      }

      <DrawerWrapper isOpen={open} isMobile={isMobile}>
        <DrawerHeader handleDrawerClose={handleDrawerToggle} isOpen={open} />
        <DrawerMenu />
      </DrawerWrapper>

    </>
  );
};