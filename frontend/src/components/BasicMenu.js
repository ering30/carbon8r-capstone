import * as React from 'react';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Navigate, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Calculator from '../pages/Calculator';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: '#357a38',
        fontSize: '3rem',
    },
    menuText: {
        textColor: '#357a38',
    }
}));

export default function BasicMenu() {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);

    const classes= useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    // to close / open menu from icon
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // //user logs out
    // const logOff = () => {
    //     localStorage.removeItem('currentUser');
    //     navigate('/login');
    //     }

    // handle navigate and close menu list items
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClickCalculator = () => {
        navigate('/calculator');
        handleClose()
    }
    const handleMenuClickInfo = () => {
        navigate('/info');
        handleClose()
    }
    const handleMenuClickHome = () => {
        navigate('/');
        handleClose()
    }
    // const handleMenuClickLogout = () => {
    //     logOff()
    //     handleClose()
    // }
    const handleMenuClickProfile = () => {
        navigate('/profile');
        handleClose()
    }

    const handleMenuClickUsers = () => {
        navigate('/users');
        handleClose()
    }


    return (
        <div>
            <MenuIcon 
            onClick={handleClick} 
            className={classes.icon} 
            disableripple="true"/>
            <Menu
                id="basic-menu"
                disableripple="true"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                sx : {
                    backgroundColor: "#fafbed",
                    color: '#357a38'
                }
                }}
            >
                <MenuItem name="home" onClick={handleMenuClickHome} ><HomeIcon/>&nbsp;&nbsp;Home</MenuItem>
                <MenuItem name="info" onClick={handleMenuClickInfo}><InfoIcon/>&nbsp;&nbsp;Info</MenuItem>
                
                {/* conditional menu items based on logged in / userAdmin status */}
                {currentUser ? 
                <MenuItem name="calculator" onClick={handleMenuClickCalculator}><CalculateIcon/>&nbsp;&nbsp;Calculator</MenuItem> : null}
                {currentUser ? 
                <MenuItem name="profile" onClick={handleMenuClickProfile}><AccountCircleIcon/>&nbsp;&nbsp;Profile</MenuItem>: null}
                {currentUser && currentUser.userAdmin ?
                <MenuItem name="users" onClick={handleMenuClickUsers}><GroupIcon/>&nbsp;&nbsp;Users</MenuItem>
                : null}
            </Menu>
        </div>
    );
}
