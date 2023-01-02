import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import ResultComponent from "./ResultComponent";
import FlightResultComponent from "./FlightResultComponent";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import ErrorBoundary from "./ErrorBoundary";

const useStyles = makeStyles((theme) => ({
    fetchButton: {
        margin: '2%',
        background: '#357a38',
        color: '#FAFAFA'
    }
}));

function FetchCO2FlightData(props) {
    const classes = useStyles();
    const [flightData, setFlightData] = useState('');


    // set params for API call
    const encodedParams = new URLSearchParams();
    encodedParams.append("iata_airport_from", props.startAirport);
    encodedParams.append("iata_airport_to", props.destinationAirport);
    encodedParams.append("flight_class", "economy");
    encodedParams.append("round_trip", "N");
    encodedParams.append("add_rf", "Y");
    encodedParams.append("number_of_passengers", "1");
    
    const options = {
        method: 'POST',
        url: 'https://carbonsutra1.p.rapidapi.com/flight_estimate',
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
            setFlightData(response.data.data)
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <>
        <div>
            <Button className={classes.fetchButton} variant="contained" onClick={apiGet}>CARBON8!</Button>
        </div>
        <div>
            {{flightData} != 0 ? <ErrorBoundary><FlightResultComponent data={flightData}/></ErrorBoundary> : null}
        </div>
        </>
    );
}

export default FetchCO2FlightData;