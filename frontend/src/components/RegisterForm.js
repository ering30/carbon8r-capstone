import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useContext, useState} from 'react'
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
    const [RegEmail, setRegEmail] = useState('')
    const [RegUsername, setRegUsername] = useState('')
    const [RegPassword, setRegPassword] = useState('') 
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
            alert(`Created a new profile for ${RegUsername}. Please login to continue.`)
            navigate('/login')})
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
        <CssBaseline />
        <main>
        <Card elevation={4} className={classes.mainCard}
                sx={{
                    bgcolor: '#fafbed',
                    pt: 3,
                    pb: 3,
                    borderRadius: 3,
                    minWidth: 275,
                    maxWidth: '50%',
                    margin: '0 auto'
                }}
                >
                    <CardContent>
                            <h2 className={classes.validateMsg} style={{color: '#d50000'}}>{validateMsg}</h2>
                        {/* <TextField type="text" value={Lemail} onChange={e=>setLemail(e.target.value)}></TextField> */}
                            <div >
                                <TextField
                                required
                                autoFocus
                                className={classes.textInput}
                                variant="filled"
                                label="required"
                                type="text"
                                name="email"
                                placeholder='email@domain.com'
                                helperText='Email'
                                value={RegEmail}
                                onChange={e=>setRegEmail(e.target.value)}
                                color="primary"
                                />
                            </div>
                            <div >
                                <TextField
                                required
                                className={classes.textInput}
                                variant="filled"
                                label="required"
                                type="text"
                                name="username"
                                placeholder='enter up to 20 characters'
                                helperText='Username'
                                value={RegUsername}
                                onChange={e=>setRegUsername(e.target.value)}
                                color="primary"
                                />
                            </div>
                        <TextField
                        required
                        className={classes.textInput}
                        variant="filled"
                        label="required"
                        type="password"
                        name="password"
                        helperText='Password'
                        value={RegPassword}
                        onChange={e=>setRegPassword(e.target.value)}
                        color="primary"
                        />
                    </CardContent>
                    <CardContent>
                        <Button variant='contained' size="small" type="submit" onClick={handleSubmit}>Register</Button>
                        
                    </CardContent>
                </Card>
            </main>
      {/* Footer */}
    </ThemeProvider>
        );
}