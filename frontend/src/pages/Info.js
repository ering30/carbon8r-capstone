import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Box } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '5%',
        textAlign: 'center',
        flexGrow: 1,
    },
    heroText: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        fontSize: '3rem',
    },
    card:{
        marginTop:'5%',
    }
}));

export default function Info() {
    const classes = useStyles();
    return (
        <Container className={classes.pageWrapper} maxWidth="lg">
            <Card sx={{ minWidth: 275 }} className={classes.card} style={{backgroundColor: "#fafbed"}}>
                <CardContent>
                    <h1 className={classes.heroText} >CARBON FOOTPRINTS</h1>
                    <p className={classes.bodyText}>
                    A carbon footprint is the total greenhouse gas (GHG) emissions caused by an individual, 
                    event, organization, service, place or product, expressed as carbon dioxide equivalent 
                    (CO<sub>2e</sub>). Greenhouse gases, including the carbon-containing gases carbon dioxide 
                    and methane, can be emitted through the burning of fossil fuels, land clearance, and the 
                    production and consumption of food, manufactured goods, materials, wood, roads, buildings, 
                    transportation and other services.
                    </p>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275 }} className={classes.card} style={{backgroundColor: "#fafbed"}}>
                <CardContent>
                    <h1 className={classes.heroText} >CARBON OFFSETS</h1>
                    <p className={classes.bodyText}>
                    Carbon offsets are tradable “rights” or certificates linked to activities that lower the 
                    amount of carbon dioxide (CO<sub>2</sub>) in the atmosphere. By buying these certificates, a person or 
                    group can fund projects that fight climate change, instead of taking actions to lower their 
                    own carbon emissions. In this way, the certificates “offset” the buyers CO<sub>2</sub> emissions with 
                    an equal amount of CO<sub>2</sub> reductions somewhere else.
                    </p>
                </CardContent>
            </Card>
            <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
        </Container>
        )
}