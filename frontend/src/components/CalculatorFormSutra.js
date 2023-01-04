import React, { useState, useRef } from 'react'
import { CardActions, Input } from '@material-ui/core';
import FetchCarbonSutra from './FetchCarbonSutra';
import { makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import { Skeleton, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { Button } from "@material-ui/core";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



// require('dotenv').config()

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
        fontWeight: '300'
    },
    AutocompleteField: {
        width: '100px',
        padding: '2px',
    },
    formButton: {
        width: '50%',
        background: '#357a38',
        color: '#FAFAFA'
    },
    formButtonClear: {
        width: '50%',
        background: '#7a7a7a',
        color: '#FAFAFA',
    }
}));

export default function CalculatorFormSutra(props) {
    const classes = useStyles(); 

    const [distance, setDistance] = useState(0)
    const [directionsResponse, setDirectionsResponse] = useState({})

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()

    let transportMode = props.vehicleType

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    })

    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        } 
        else if (transportMode='Car-Size-Average' ){
            // eslint-disable-next-line no-undef
            const directionsService = new google.maps.DirectionsService()
            const results = await directionsService.route({
                origin: originRef.current.value,
                destination: destinationRef.current.value,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
            })
            console.log(results);
            setDirectionsResponse(results)
            setDistance((results.routes[0].legs[0].distance.value)/1000)
        }
        else if (transportMode='Bus-LocalAverage'){
            // eslint-disable-next-line no-undef
            const directionsService = new google.maps.DirectionsService()
            const results = await directionsService.route({
                origin: originRef.current.value,
                destination: destinationRef.current.value,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TransitMode.BUS,
            })
            setDirectionsResponse(results)
            setDistance((results.routes[0].legs[0].distance.value)/1000)
        }
        else if(transportMode='Train-National'){
             // eslint-disable-next-line no-undef
            const directionsService = new google.maps.DirectionsService()
            const results = await directionsService.route({
                origin: originRef.current.value,
                destination: destinationRef.current.value,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TransitMode.TRAIN,
            })
            setDirectionsResponse(results)
            setDistance((results.routes[0].legs[0].distance.value)/1000)
        }
    }
    
    function clearRoute() {
        setDirectionsResponse({})
        setDistance(0)

        originRef.current.value = ''
        destinationRef.current.value = ''
    }

    if (!isLoaded) {
        return <Skeleton />
    }

    return (
        <>
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
                        <Autocomplete>
                            <TextField 
                                required
                                label="required"
                                autoFocus
                                type='text' 
                                name="origin"
                                placeholder='Origin' 
                                helperText="Start typing a location for options"
                                variant="filled"
                                inputRef={originRef} 
                                sx={{ width: '100%' }}
                            />
                        </Autocomplete>
                        <Autocomplete >
                            <TextField
                                required
                                label="required"
                                name="destination"
                                type='text'
                                placeholder='Destination'
                                helperText="Start typing a location for options"
                                variant="filled"
                                inputRef={destinationRef}
                                sx={{ width: '100%' }}
                            />
                        </Autocomplete>
                    </Stack>  
                </CardContent>       
                <div>
                { (originRef !== '') && (destinationRef !== '')?
                <Stack direction="row" spacing={2} justifyContent='space-between' sx={{margin: '0 auto', width: '80%'}}>
                    <Button 
                        className={classes.formButton}
                        variant="contained"
                        onClick={calculateRoute} 
                    > 
                    get distance
                    </Button>
                    <Button 
                        className={classes.formButtonClear}
                        variant="contained"
                        onClick={clearRoute} 
                    > 
                    clear
                    </Button>
                </Stack>
                : null }
                    {distance >0 ? 
                        <>
                        <h4 className={classes.instructions}>Distance: {distance}km </h4>
                        <FetchCarbonSutra distance={distance} vehicle={transportMode} googleResponse={directionsResponse}/> 
                        </>
                    : null}
                </div>
                </Card>
            </ThemeProvider>
        </>
    )
}
