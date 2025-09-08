import { useState } from 'react';

import {
  AppRegistration,
  AssignmentAdd,
  Checklist,
  DeveloperBoard,
  Home,
  Menu,
  PeopleAlt
} from '@mui/icons-material';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router';

import type { SidebarProps, SidebarRouteMapper } from './interface';
import { pt } from '../../constants';

const sidebarOptionsMapper: SidebarRouteMapper = {
  '/': {
    text: 'Página Inicial',
    icon: <Home />,
  },
  '/cadastro': {
    text: 'Cadastro',
    icon: <AssignmentAdd />,
  },
  '/alunos': {
    text: 'Alunos',
    icon: <PeopleAlt />,
  },
  '/frequencia': {
    text: 'Frequência',
    icon: <Checklist />,
  },
  '/atividades': {
    text: 'Atividades',
    icon: <AppRegistration />,
  },
  ...(import.meta.env.DEV && {
    '/tech-demo': {
      text: 'Tech Demo',
      icon: <DeveloperBoard />,
    }
  }),
};

export function Sidebar({ allowedRoutes }: SidebarProps) {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const visibleRoutes = Object.keys(sidebarOptionsMapper)
    .filter(route => allowedRoutes.includes(route));
  
  const drawerWidth = (() => {
    switch (true) {
    case !isSidebarOpen:
      return '90px';
    case isSidebarOpen && isMobile:
      return '100%';
    default:
      return '300px';
    }
  })();

  function onSidebarToggle() {
    setIsSidebarOpen(isSidebarOpen => !isSidebarOpen);
  }

  return (
    <Drawer
      component="nav"
      sx={{
        width: drawerWidth,
        zIndex: 0,
        overflow: 'hidden',
        transition: '.5s all ease',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          padding: 2,
          overflow: 'hidden',
          boxSizing: 'border-box',
          boxShadow: '1px 0px 5px background.paper',
          transition: '.5s all ease',
          backgroundColor: 'background.default',
        },
      }}
      variant="permanent"
      anchor="left"
      open={isSidebarOpen}
    >
      <IconButton
        aria-label={pt.header.openSidebar}
        data-cy="header-sidebar-button"
        onClick={onSidebarToggle}
        sx={{ maxWidth: 'fit-content' }}
      >
        <Menu sx={{
          color: 'primary.main',
          fontSize: { xs: 30, md: 40 },
        }} />
      </IconButton>

      <List sx={{ overflowY: 'auto' }}>
        {visibleRoutes.map((route) => {
          const { text, icon } = sidebarOptionsMapper[route];

          return (
            <ListItem key={route} disablePadding>
              <ListItemButton
                aria-label={pt.sidebar.listIcon({ to: route })}
                onClick={() => navigate(route)}
                sx={{
                  backgroundColor: 'grey.100',
                  borderRadius: '.7em',
                  padding: '.7em 1em',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  marginBottom: '1em',
                  ':hover': {
                    backgroundColor: 'background.paper'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 'fit-content' }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: 'bold',
                      textWrap: 'nowrap',
                      overflow: 'hidden',
                      marginLeft: '1em'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
