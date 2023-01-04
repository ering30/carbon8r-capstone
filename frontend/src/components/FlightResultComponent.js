import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
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
        color: '#FAFAFA'
    },
    card: {
        marginTop: '5%',
        margin: '0 auto',
        width: '75%',
    }
}));

// component displays and formats data to pass & save into DB
export default function FlightResultComponent(props) {
const classes = useStyles();

let { data, origin, destination } = props

let tableData = data
let vehicle = 'airplane'

console.log(tableData);
    return (
        <>
            {props.data.co2e_gm > 0 ? 
                <>
                    <CardContent sx={{ minWidth: 275 }}>
                    <h2 className={classes.resultHeading} >Your total emissions from this journey is <span className={classes.resultText} >{props.data.co2e_mt} tonnes CO<sub>2e</sub></span></h2> 
                    </CardContent>
                    <CardActions>
                        <Link 
                            className={classes.linkButton} 
                            to= '/results'
                            state={{ 
                                data: tableData, 
                                origin: origin,
                                destination: destination,
                                vehicle: vehicle
                                }}>
                            <Button className={classes.linkButton} variant="contained" >Show Details</Button>
                        </Link>
                    </CardActions>
                </>                   
                : null
            }
        </>
    )
}