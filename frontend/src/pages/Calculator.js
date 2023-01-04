
import { makeStyles } from '@material-ui/core/styles';
import React, {useState, useEffect } from 'react'
import CalculatorFormSutra from '../components/CalculatorFormSutra';
import FlightCalculatorForm from '../components/FlightCalculatorForm';
import { Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '10%',
        textAlign: 'center',
    },
    titleInfo: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '300',
        fontSize: '1.5rem',
    },
    vehicleButton: {
        margin: '2%',
        background: '#357a38',
        color: '#FAFAFA'
    }
}));



export default function Calculator() {
    const [calcType, setCalcType] = useState('')
    const classes = useStyles(); 

    useEffect(() => {
        window.scrollTo({bottom: 0, left: 0, behavior: 'smooth'});
        }, []);

    const handleCarCalculator = () => {
        setCalcType('Car-Size-Average')
    }
    const handleBusCalculator = () => {
        setCalcType('Bus-LocalAverage')
    }
    const handleTrainCalculator = () => {
        setCalcType('Train-National')
    }
    const handlePlaneCalculator = () => {
        setCalcType('plane')
    }
    
    return (
        <>
            
            {calcType === '' ? 
            <>
                <h1 className={classes.titleInfo}>SELECT TRANSPORT MODE TO BEGIN</h1>
                <Button className={classes.vehicleButton} variant="contained" onClick={handleCarCalculator}>Car</Button>
                <Button className={classes.vehicleButton} variant="contained" onClick={handleBusCalculator}>Bus</Button>
                <Button className={classes.vehicleButton} variant="contained" onClick={handleTrainCalculator}>Train</Button>
                <Button className={classes.vehicleButton} variant="contained" onClick={handlePlaneCalculator}>Airplane</Button>
            </>: null}
            
            {calcType === 'Car-Size-Average' || calcType === 'Bus-LocalAverage' || calcType === 'Train-National' ? 
            <>
            <h1 className={classes.titleInfo}>ENTER YOUR START AND END LOCATIONS</h1>
            <CalculatorFormSutra vehicleType={calcType}/>
            </>
            : calcType === 'plane' ?
            <>
            <h1 className={classes.titleInfo}>ENTER YOUR START AND DESTINATION AIRPORTS</h1>
            <FlightCalculatorForm/>
            </>
            : null
            }
            <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
        </>
    )
}
