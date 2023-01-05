import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Button } from '@material-ui/core';
import {NavLink, useNavigate } from 'react-router-dom'
import BasicMenu from './BasicMenu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: "none",
        fontFamily: 'Unbounded',
    },
    icon: {
        color: '#357a38',
        fontSize: '3rem',
    },
    appbarTitle : {
        flexGrow: '1',
        flexShrink: '1',
        color: '#357a38',
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto'
    },
    logoNav:{
        color: '#357a38',
        textDecoration: "none",
    },
    loginLink: {
        color: '#357a38',
        fontWeight: '400'
    },
    detailButton:{
        background: '#357a38',
        color: '#FAFAFA',
    }
}));


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
        {props.children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
    };

export default function Header(props) {
    const users = <NavLink to='/users'>Users</NavLink>

    //gets the logged in user / local storage of user status
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    console.log("logged in:" , currentUser)
    
    const classes = useStyles();
    let navigate = useNavigate();

    const logOff = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    }

    return <div>
        <HideOnScroll {...props}>
        <AppBar className={classes.appbar} elevation={0} >
            <Toolbar className={classes.appbarWrapper}>
                <h1 className={classes.appbarTitle}><a className={classes.logoNav} href="/">CARBON8R</a></h1>
                {/* extra component for user page link/ login */}
                {currentUser ? 
                <Button 
                size="small"
                disableRipple 
                className={classes.detailButton} 
                variant="contained" 
                onClick={logOff}>
                    Log out
                    </Button>  : 
                    <Button 
                    disableRipple 
                    size="small"
                    className={classes.detailButton} 
                    variant="contained" 
                    onClick={() => {navigate('/login') }}>
                        Log in
                        </Button> }

                <IconButton disableRipple>
                    <BasicMenu />
                </IconButton>    
            </Toolbar>
        </AppBar>
        </HideOnScroll>
    </div>
}