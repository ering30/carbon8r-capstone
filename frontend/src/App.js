import { Routes, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import React, {useState} from 'react';
import { Container } from '@material-ui/core';

// import ResponsiveAppBar from './components/ResponsiveAppBar';

// styling ---------------
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// pages ---------------

import Results from './pages/Results';
import Calculator from './pages/Calculator';
import Home from './pages/Home'
import Info from './pages/Info'
// import ResultsFlight from './pages/ResultsFlight';
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Admin from './pages/Admin';



// contexts ---------------------
export const UsersContext = React.createContext();
export const CurrentUserContext = React.createContext();
export const journeySavedContext = React.createContext();
// journeysLoaded context

// -------
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },
  pageWrapper: {
    width: '80%',
    marginLeft: '0 auto',
    textAlign: 'center',
    flexGrow: 1,
    height: '90vh',
    overflow: 'scroll',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
},
}));

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [journeySaved, setjourneySaved] = useState(true)

  return (
    <UsersContext.Provider value={{users, setUsers}}>
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <journeySavedContext.Provider value={{journeySaved, setjourneySaved}}>
          <div className={classes.root}>
            <CssBaseline />
            <Header />
            <Container className={classes.pageWrapper} maxWidth="lg">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/calculator' element={<Calculator />} />
              <Route path='/info' element={<Info />} />
              <Route path='/admin' element={<Admin />} />
              
              <Route path='/results' element={<Results />} />
              {/* <Route path='/results/flight' element={<ResultsFlight />} /> */}
              
              <Route path='*' element={<ErrorPage />} />
            </Routes>
            </Container>
          </div>
        </journeySavedContext.Provider>
      </CurrentUserContext.Provider>
    </UsersContext.Provider>
  );
      
}

export default App;
