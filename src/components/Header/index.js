import { AppBar, Toolbar, Typography, makeStyles, Button, IconButton, Drawer, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { Link } from "react-router-dom";

const headersData = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Lançamentos",
      href: "/lancamentos",
    },
    {
      label: "Sair",
      href: "/logout"
    }
  ];

const useStyles = makeStyles(() => ({
    header: {
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    logo: {
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
    },
    menuButton: {
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
     toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        padding: "20px 30px",
    }
  }));

export default function Header() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = React.useState({
    mobileView: false,
    drawerOpen: false
  });
  const { mobileView, drawerOpen } = state;

  React.useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
    <Toolbar className={toolbar}>
        {Logo}
        <div>{getMenuButtons()}</div>
    </Toolbar>);
  };

  const displayMobile = () => {
    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <div>{Logo}</div>
        </Toolbar>
    );
  };

  const Logo = (
    <Typography className={logo} variant="h6" component="h1">
        Lançamentos Financeiros
    </Typography>
  );

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link to={href} color="inherit" style={{'textDecoration': "none" }} key={label}>
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button to={href} color="inherit" component={Link} className={menuButton} key={label}>
          {label}
        </Button>
      );
    });
  };
  
  return (
    <header>
      <AppBar className={header}>{mobileView ? displayMobile() : displayDesktop()}</AppBar>
    </header>
  );
}