import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useContext, useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { CurrentUserContext, UsersContext } from '../App';
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
        margin: 5
    },
    mainCard: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        textAlign: 'center'
    },
    validateMsg: {
        fontWeight: '200',
        marginTop: 0
    },
    formButton: {
        paddingTop: 3
    }
}));

export default function Login() {
    let {setCurrentUser} = useContext(CurrentUserContext)
    const [Lemail, setLemail] = useState('')
    const [LPassWord, setLPassWord] = useState('') 
    const {users, setUsers} = useContext(UsersContext)
    const [validateMsg, setValidateMsg] = useState('')
    let navigate = useNavigate();
    const classes = useStyles();

  //get the users
    useEffect(()=> {
        console.log('Fetching user information')
        axios.get('http://localhost:4000/users/all')
        .then(response=> {console.log(response); setUsers(response.data);})
        .catch(error => {console.log(error)})
        },[])

    //email & password in if condition, seperate if telling user which to change
    //more states for error message, results, username didn't match, password matches but user doesn't
    //etc - redirect if both are successful
    //where to think about, where to store information (context) available to all refresh will remove
    //stored data - localStorage https://blog.logrocket.com/using-localstorage-react-hooks/

    //validate the logins
    const validateLogin=()=>
    {   console.log(users);
    
        let matchedEmail=false
            for (let u of users)
            {
            if (Lemail===u.email)
            {
                matchedEmail=true
                if (LPassWord===u.user_password)
                {
                console.log(u.email, u.user_password, u.userAdmin, u.username)
                setCurrentUser(u)
                localStorage.setItem('currentUser', JSON.stringify(u))
                navigate('/profile');
                }
                else 
                {
                    setValidateMsg('Incorrect password, please try again.');
                }
            }
            }
            if (!matchedEmail) 
            {
            setValidateMsg('Incorrect username, please register first.');
            }
        }
    
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
        <Card elevation={4} className={classes.mainCard}
                sx={{
                    bgcolor: '#fafbed',
                    pt: 1,
                    pb: 1,
                    borderRadius: 3,
                    minWidth: 275,
                    maxWidth: '50%',
                    marginTop: 1,
                    marginBottom: 2,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
                >
                    <CardContent>
                            <h3 className={classes.validateMsg} style={{color: '#d50000'}}>{validateMsg}</h3>
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
                                value={Lemail}
                                onChange={e=>setLemail(e.target.value)}
                                color="primary"
                                />
                            </div>
                        {/* <TextField type='password' value={LPassWord} onChange={e=>setLPassWord(e.target.value)}></TextField> */}
                        <TextField
                        required
                        className={classes.textInput}
                        variant="filled"
                        label="required"
                        type="password"
                        name="password"
                        helperText='Password'
                        value={LPassWord}
                        onChange={e=>setLPassWord(e.target.value)}
                        color="primary"
                        />
                        <div><Button size="small" variant='contained' onClick={validateLogin}>Login</Button></div>
                    </CardContent>
                </Card>
                <Card elevation={4} className={classes.mainCard}
                sx={{
                    bgcolor: '#fafbed',
                    pt: 1,
                    pb: 1,
                    borderRadius: 3,
                    minWidth: 275,
                    maxWidth: '50%',
                    marginTop: 1,
                    marginBottom: 1,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
                >
                    <CardContent >
                        <div><h2 className={classes.validateMsg}>OR</h2></div>
                        <Button size="small" variant='contained' href={"/register/"}>Create a new account</Button>
                    </CardContent>
                </Card>
            </main>
      {/* Footer */}
    </ThemeProvider>
        );
}