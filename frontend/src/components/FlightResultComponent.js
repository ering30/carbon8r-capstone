import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const useStyles = makeStyles((theme) => ({
    resultText: {
        color: 'red'
    },
    resultHeading: {
        fontFamily: 'Roboto',
        fontWeight: '200',
    },
    linkButton : {
        textDecoration: "none",
        margin: '0 auto',
        background: '#357a38',
        color: '#FAFAFA',
    },
    card: {
        marginTop: '5%',
        margin: '0 auto',
        width: '75%',
    }
}));
export default function FlightResultComponent(props) {
const classes = useStyles();

let tableData = props.data
console.log(tableData);
    return (
        <>
            {props.data.co2e_gm > 0 ? 
                <Card sx={{ minWidth: 275 }} className={classes.card} style={{backgroundColor: "#fafbed"}}>
                    <CardContent>
                    <h2 className={classes.resultHeading} >Your total emissions from this journey is <span className={classes.resultText} >{props.data.co2e_mt} tonnes CO<sub>2e</sub></span></h2> 
                    </CardContent>
                    <CardActions>
                        <Link 
                            className={classes.linkButton} 
                            to= '/results/flight'
                            state={{ data: tableData }}>
                                <Button variant="contained" >Show Details</Button>
                        </Link>
                    </CardActions>
                </Card>
                : null
            }
        </>
    )
}