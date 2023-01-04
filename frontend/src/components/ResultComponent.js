import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
    },
    detailButton: {
        background: '#357a38',
        color: '#FAFAFA'
    }
}));

// component displays and formats data to pass & save into DB
export default function ResultComponent(props) {
    const classes = useStyles();

    let { data, origin, destination } = props
    let tableData = data
    let vehicle= data.vehicle_type

    return (
        <>
            {props.data.co2e_gm > 0 ? 
                    <>
                    <CardContent id="calc-result" sx={{ minWidth: 275 }}>
                    <h2 className={classes.resultHeading} >
                        Your total emissions from this journey is <span className={classes.resultText} >{props.data.co2e_mt} tonnes CO<sub>2e</sub></span>
                    </h2> 
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
                            <Button className={classes.detailButton}variant="contained" >Show Details</Button>
                        </Link>
                    </CardActions>
                    </>
                : null
            }
        </>
    )
}
