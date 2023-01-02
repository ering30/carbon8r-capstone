import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import CircularLoading from "./CircularLoading";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import ErrorBoundary from "./ErrorBoundary";
const LazyResult = React.lazy(() => import("./ResultComponent")) // lazy load of result component

const useStyles = makeStyles((theme) => ({
    fetchButton: {
        margin: '2%',
        background: '#357a38',
        color: '#FAFAFA'
    }
}));

function FetchCarbonSutra(props) {
    const classes = useStyles();
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
        'X-RapidAPI-Key': '1fe01a0209msha5fef6f92cde9a7p1763f4jsn01ad7a24385e',
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
});
}

    return (
    <div>
        <br />
        <Button className={classes.fetchButton} variant="contained" onClick={apiGet}>CARBON8!</Button>
        <br />
        <div>
            {{carbon} != 0 ? 
            <ErrorBoundary>
            <React.Suspense fallback={<CircularLoading/>} >
            <LazyResult data={carbon}/>
            </React.Suspense>
            </ErrorBoundary>
            : null
            }
        </div>
    </div>
    );
}

export default FetchCarbonSutra;