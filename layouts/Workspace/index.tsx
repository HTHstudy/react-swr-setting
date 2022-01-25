import React, { useState } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CodeIcon from '@material-ui/icons/Code';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import loadable from '@loadable/component';
import { useMenuList } from '@store';
import Api from '@utils/Api';

const CustomerService = loadable(() => import('@pages/CustomerService'));
const Tanent = loadable(() => import('@pages/Tanent'));
const Receipt = loadable(() => import('@pages/Receipt'));
const AdminSettings = loadable(() => import('@pages/AdminSettings'));
const SpotManagement = loadable(() => import('@pages/SpotManagement'));
const CodeManager = loadable(() => import('@pages/CodeManager'));

const MENU_ICONS: { [s: string]: JSX.Element } = {
  spot: <HomeWorkIcon />,
  user: <SettingsIcon />,
  consult: <LiveHelpIcon />,
  receipt: <CreditCardIcon />,
  tenant: <AssignmentIcon />,
  logout: <ExitToAppIcon />,
  code: <CodeIcon />,
};
const PAGES: { [s: string]: JSX.Element } = {
  spot: <SpotManagement />,
  user: <AdminSettings />,
  consult: <CustomerService />,
  receipt: <Receipt />,
  tenant: <Tanent />,
  code: <CodeManager />,
};

const drawerWidth = 240;

const Workspace = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const { menuList } = useMenuList();

  const userInfo = localStorage.getItem('userInfo');
  // userInfo && console.log(JSON.parse(userInfo));

  const API = Api();

  const logoutHandler = () => {
    API.logout();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {menuList && menuList[selected]?.menuName}
            </Typography>
          </div>
          {userInfo && (
            <Typography variant="subtitle2" noWrap>
              안녕하세요! {JSON.parse(userInfo).userName}님
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuList?.map((menu, index) => (
            <ListItem button key={menu.menuUrl} onClick={() => setSelected(index)}>
              <ListItemIcon>{MENU_ICONS[menu.menuUrl]}</ListItemIcon>
              <ListItemText primary={menu.menuName} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem button onClick={logoutHandler}>
          <ListItemIcon>{MENU_ICONS.logout}</ListItemIcon>
          <ListItemText primary="로그아웃" />
        </ListItem>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {menuList && PAGES[menuList[selected]?.menuUrl]}
      </main>
    </div>
  );
};

export default Workspace;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);
