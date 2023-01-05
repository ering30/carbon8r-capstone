import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '10%',
        textAlign: 'center',
        flexGrow: 1,
        height: '100vh',
        overflow: 'scroll',

    },
    heroText: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        fontSize: '2rem',
    },
    card:{
        marginTop:'5%',
    }
}));

export default function Info() {
    const classes = useStyles();
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);
    return (
        <>
        {/* <Container className={classes.pageWrapper} maxWidth="lg"> */}
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
                    <p className={classes.bodyText}>* source: Wikipedia, <a href="https://en.wikipedia.org/wiki/Carbon_footprint">
                            "Carbon footprint"</a>
                    </p>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275 }} className={classes.card} style={{backgroundColor: "#fafbed"}}>
                <CardContent>
                    <h1 className={classes.heroText} >CARBON BILLIONAIRES</h1>
                    <p className={classes.bodyText}>
                    The world's richest people emit huge and unsustainable amounts of carbon and, unlike ordinary
                    people, 50% to 70% of their emissions result from their investments. New analysis of the investments
                    of 125 of the world's richest billionaires shows that on average they are emitting 3 million tonnes a
                    year, more than a million times the average for someone in the bottom 90% of humanity. The study also
                    finds billionaire investments in polluting industries such as fossil fuels and cement are double the
                    average for the Standard & Poor 500 group of companies. Billionaires hold extensive stakes in many of
                    the world's largest and most powerful corporations, which gives them the power to influence the way
                    these companies act. Governments must hold them to account, legislating to compel corporates and
                    investors to reduce carbon emissions, enforcing more stringent reporting requirements and imposing
                    new taxation on wealth and investments in polluting industries.
                    </p>
                    <p className={classes.bodyText}>* source: Oxfam 2022, <a href="https://oxfamilibrary.openrepository.com/bitstream/handle/10546/621446/bn-carbon-billlionaires-071122-en.pdf?sequence=14">
                            "Carbon Billionaires: The investment emissions of the worlds richest people"</a>
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
                    <p className={classes.bodyText}>* source: MIT Climate Portal 2022, <a href="https://climate.mit.edu/explainers/carbon-offsets">
                        Carbon Offsets</a>
                    </p>
                </CardContent>
            </Card>
            <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
        {/* // </Container> */}
        </>
        )
}