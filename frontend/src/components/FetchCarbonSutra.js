import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import CircularLoading from "./CircularLoading";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import ErrorBoundary from "./ErrorBoundary";
const LazyResult = React.lazy(() => import("./ResultComponent")) // lazy load of result component

const theme = createTheme({
    palette: {
        primary: {
        main: '#357a38'
        }
    },
});

const useStyles = makeStyles((theme) => ({
    fetchButton: {
        margin: '2%',
        background: '#357a38',
        color: '#FAFAFA',
        width: '50%',
    }
}));

function FetchCarbonSutra(props) {
    const classes = useStyles();
    const resultRef = useRef(null)
    const [carbon, setCarbon] = useState('');

const encodedParams = new URLSearchParams();
encodedParams.append("vehicle_type", props.vehicle);
encodedParams.append("distance_value", props.distance);
encodedParams.append("distance_unit", "km");

// set params for API call
const options = {
    method: 'POST',
    url: 'https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_type',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx',
        'X-RapidAPI-Key': process.env.REACT_APP_CARBON_SUTRA_API_KEY,
        'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
    },
    data: encodedParams
};

const apiGet = () => {
axios.request(options).then(function (response) {
	console.log(response.data.data);
    setCarbon(response.data.data)
}).catch(function (error) {
	console.error(error);
})
}

useEffect(() => {
    scrollToBottom()
}, [carbon]);

const scrollToBottom = () => {
    resultRef.current?.scrollIntoView({ behavior: "smooth" })
}

let requestOrigin = props.googleResponse.request.origin.query
let requestDestination= props.googleResponse.request.destination.query

    return (
    <div>
        <ThemeProvider theme={theme}>
            <Button className={classes.fetchButton} variant="contained" onClick={apiGet}>CARBON8!</Button>
                {{carbon} != 0 ? 
                <ErrorBoundary>
                <React.Suspense fallback={<CircularLoading sx={{margin: '0 auto'}} />} >
                <LazyResult data={carbon} origin={requestOrigin} destination ={requestDestination}/>
                </React.Suspense>
                <div ref={resultRef} />
                </ErrorBoundary>
                : null
                }
        </ThemeProvider>
    </div>
    );
}

export default FetchCarbonSutra;