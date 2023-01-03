import React, { useState, useRef } from 'react'
import { Input } from '@material-ui/core';
import FetchCarbonSutra from './FetchCarbonSutra';
import { makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import {
    useJsApiLoader,
    // GoogleMap,
    // Marker,
    Autocomplete,
    // DirectionsRenderer,
} from '@react-google-maps/api'
import { Skeleton } from '@mui/material';
import GetStartedButton from './GetStartedButton';
import { Stack } from '@mui/system';



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
        fontWeight: '200'
    },
    AutocompleteField: {
        width: '100px',
        padding: '2px',
    }
}));

export default function CalculatorFormSutra(props) {
    // const {number1, setNumber1} = useState('')
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [distance, setDistance] = useState('')
    const [directionsResponse, setDirectionsResponse] = useState(null)

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()

    const transportMode = props.vehicleType

    // change travel mode for google directions
    // {transportMode === 'Car-Size-Average' ? TravelMode === TravelMode.DRIVING :
    // transportMode === 'Bus-LocalAverage' ? TravelMode === TransitMode.BUS :
    // transportMode === 'Train-National' ? TravelMode === TransitMode.TRAIN :
    // TravelMode === TravelMode.DRIVING}

    const classes = useStyles

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    })

    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }
        console.log("origin ref", originRef.current.value);
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: origin,
            destination: destination,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
    }
    
    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setOrigin('')
        setDestination('')
    }

    if (!isLoaded) {
        return <Skeleton />
    }

    return (

            <>
            <ThemeProvider theme={theme}>
                <Stack direction="row" spacing={2} justifyContent='space-between' sx={{margin: '0 auto', width: '50%'}}>
                    <Autocomplete>
                    <Input type='text' placeholder='Origin' inputRef={originRef} />
                        {/* <Input
                            inputRef={originRef}
                            // required
                            // autoFocus
                            // className={classes.textInput}
                            // variant="filled"
                            // label="required"
                            type="text"
                            // name="origin"
                            placeholder="Origin"
                            // value={origin}
                            // onChange={e=>setOrigin(e.target.value)}
                            // color="primary"
                        /> */}
                    </Autocomplete>
                    <Autocomplete >
                    <Input
                        type='text'
                        placeholder='Destination'
                        inputRef={destinationRef}
                    />
                        {/* <Input
                            className={classes.AutocompleteField}
                            required
                            variant="filled"
                            label="required"
                            type="text"
                            name="destination"
                            placeholder="Destination"
                            value={destination}
                            onChange={e=>{setDestination(e.target.value); console.log(destination);}
                            }
                            color="primary"
                        /> */}
                    </Autocomplete>
                </Stack>
                    {/* <TextField
                        className={classes.textInput}
                        variant="filled"
                        label="required"
                        type="text"
                        name="num1"
                        helperText="Enter a distance in km e.g. 2500"
                        value={number1}
                        onChange={e=>setNumber1(e.target.value)}
                        color="primary"
                    /> */}
                    {/* <Box position='absolute' left={'0'} top={'0'} h='100%' w='100%'>
                        <GoogleMap
                            center={center}
                            zoom={15}
                            mapContainerStyle={{width: '100%', height: '100%'}}
                            // options={{
                            //     zoomControl: false,
                            //     streetViewControl: false,
                            //     mapTypeControl: false,
                            //     fullscreenControl: false,
                            // }}
                            onLoad={googlemap => setGoogleMap(googlemap)}
                            >
                        </GoogleMap>
                    </Box> */}
                <div>
                { originRef && destinationRef ?
                // originRef.current.value && destinationRef.current.value ? 
                <>
                <GetStartedButton 
                buttonText={"show route"} 
                buttonFunc={calculateRoute} 
                /> 
                <GetStartedButton 
                buttonText={"clear"} 
                buttonFunc={clearRoute} />
                </>
                : null}
                {distance >0 ? 
                <>
                <FetchCarbonSutra distance={distance} vehicle={transportMode}/> 
                </>
                : null}
                </div>
            </ThemeProvider>
            </>
        )
}


//&& this.state.number2>0 // end={number2} transportMode={transportMode}