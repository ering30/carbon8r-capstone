import React , {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core';
import FetchCO2FlightData from './FetchCO2FlightData'
import { TextField } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { Stack } from '@mui/system';

const theme = createTheme({
    palette: {
        primary: {
        main: '#357a38'
        }
    },
});

const useStyles = makeStyles((theme) => ({
    instructions: {
        fontFamily: 'Unbounded',
        fontWeight: '200'
    },
    textInput:{
        margin: '2%',
        width: '100%'
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
        <ThemeProvider theme={theme}>
            <Card sx={{
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
            }} >
                <CardContent >
                    <Stack spacing={2} justifyContent='space-between'>
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
                />
                </Stack>
                    {(start != false) && (end != false) ? 
                    <>
                    <ErrorBoundary>
                    <FetchCO2FlightData startAirport={start} destinationAirport={end}/>
                    </ErrorBoundary>
                    </>
                    : null}
                </CardContent>
            </Card>
        </ThemeProvider>    
    )   
}
