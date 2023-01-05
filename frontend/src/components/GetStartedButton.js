import React, { useEffect} from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    locationForm: {
        background: 'white',
    },
    detailButton: {
        background: '#357a38',
        color: '#FAFAFA',
        width: '80%',
        height: '3rem'
    }
    
}));

export default function GetStartedButton(props) {
    const classes = useStyles();
    const navigate = useNavigate()
    return (
        <div>
            <Button disableripple="true" className={classes.detailButton} variant="contained" onClick={props.buttonFunc}>{props.buttonText}</Button>  
        </div>
    )
}
