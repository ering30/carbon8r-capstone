import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '10%',
        textAlign: 'center'
    },
    heroText: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        fontSize: '2rem',
    },
}));

export default function ErrorPage() {
    const classes = useStyles();
    return (
    <Container className={classes.pageWrapper} maxWidth="lg">
        <h3 className={classes.heroText} >Error: Page not found.</h3>
        <h3 className={classes.heroText} >Click the logo to go Home.</h3>
        <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
    </Container>
    )
}