import React , {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core';
import FetchCO2FlightData from './FetchCO2FlightData'
import { TextField } from '@material-ui/core';
import ErrorBoundary from './ErrorBoundary';

const useStyles = makeStyles((theme) => ({
    instructions: {
        fontFamily: 'Unbounded',
        fontWeight: '200'
    },
    textInput:{
        margin: '2%'
    }
}));

export default function FlightCalculatorForm() {
    const classes = useStyles();
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [errorMessage, setErrorMessage] = useState("Enter 3-letter airport code e.g. SYD = Sydney Kingsford Smith");

    const MAX_LENGTH = 3
    useEffect(() => {
        // Set errorMessage only if text is equal or bigger than MAX_LENGTH
        if ((start.length > MAX_LENGTH) || (end.length > MAX_LENGTH)) {
            setErrorMessage(
                "The input has exceeded the maximum number of characters"
            );
            }
        }, [start, end]);

    useEffect(() => {
            if ((start.length < MAX_LENGTH) || (end.length < MAX_LENGTH) && errorMessage) {
                setErrorMessage("Enter 3-letter airport code e.g. SYD = Sydney Kingsford Smith");
            }
    }, [start, end, errorMessage]);
    
    const handleInputChange = event => {
        event.target.name === "flight-start"
        ? setStart(event.target.value)        
        : event.target.name === "flight-end"
        ? setEnd(event.target.value)
        : console.log("error")
    }

    return (
        <div>
            <TextField
                required
                autoFocus
                className={classes.textInput}
                variant="filled"
                label="required"
                type="text"
                name="flight-start"
                helperText={errorMessage}
                value={start}
                onChange={handleInputChange}
                error={start.length > MAX_LENGTH}
                color="primary"
                    />
            <TextField
                required
                className={classes.textInput}
                variant="filled"
                label="required"
                type="text"
                name="flight-end"
                helperText={errorMessage}
                value={end}
                onChange={handleInputChange}
                error={end.length > MAX_LENGTH}
                color="primary"
                    />
                
                {(start != false) && (end != false) ? 
                <>
                <ErrorBoundary>
                <FetchCO2FlightData startAirport={start} destinationAirport={end}/>
                </ErrorBoundary>
                </>
                : null}
            
        </div>
    )
}
