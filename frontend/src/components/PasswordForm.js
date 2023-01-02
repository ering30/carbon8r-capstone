import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useContext, useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { CurrentUserContext } from '../App';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
        main: '#357a38'
        }
    },
});

const useStyles = makeStyles((theme) => ({
    textInput:{
        margin: '0.5rem'
    },
    mainCard: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        textAlign: 'center'
    },
    validateMsg: {
        fontWeight: '200',
    },
    formButton: {
        paddingTop: 3
    }
}));

export default function RegisterForm() {
    let {setCurrentUser} = useContext(CurrentUserContext)
    const [password, setPassword] = useState('') 
    const [newPassword, setNewPassword] = useState('') 
    const [validateMsg, setValidateMsg] = useState('')
    let navigate = useNavigate();
    const classes = useStyles();

  //add the new user info
    const addUser = (()=> {
        console.log('submitting user information')
        axios.post('http://localhost:4000/users/register', {
            email: RegEmail,
            username: RegUsername,
            user_password: RegPassword
    })
        .then(response=> {console.log(response); 
            alert(`Created a new profile for ${RegUsername}. Please login to continue.`)})
            .then(navigate('/login'))
        .catch(error => {console.log(error)})
        })

    //email & password in if condition, seperate if telling user which to change
    //more states for error message, results, username didn't match, password matches but user doesn't
    //etc - redirect if both are successful
    //where to think about, where to store information (context) available to all refresh will remove
    //stored data - localStorage https://blog.logrocket.com/using-localstorage-react-hooks/

    //validate the logins
    const handleSubmit=()=>{
            (RegEmail.length ===0 || !RegEmail.includes("@")) ? setValidateMsg("please enter a valid email address") :
            RegPassword.length === 0 ? setValidateMsg("Please enter a password") :
            RegUsername.length === 0 ? setValidateMsg("Please enter a username") :
            addUser(RegEmail, RegPassword, RegUsername)

    }
    
    return (
        <ThemeProvider theme={theme}>
            <h2 className={classes.validateMsg} style={{color: '#d50000'}}>{validateMsg}</h2>
            <TextField
                required
                autoFocus
                className={classes.textInput}
                variant="filled"
                label="required"
                type="password"
                name="old-password"
                placeholder='password'
                helperText='Old Password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
                color="primary"
            />
            <TextField
                required
                className={classes.textInput}
                variant="filled"
                label="required"
                type="password"
                name="password"
                helperText='Password'
                value={newPassword}
                onChange={e=>setNewPassword(e.target.value)}
                color="primary"
            />
            <Button size="small" type="submit" onClick={handleSubmit}>Register</Button>
      {/* Footer */}
    </ThemeProvider>
        );
}