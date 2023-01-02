import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import FetchCarbonSutra from './FetchCarbonSutra';
import { makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
        main: '#357a38'
        }
    },
});

class CalculatorFormSutra extends Component {
    constructor(props) {
        super(props)
        this.state = {
            number1: '',
            transportMode: this.props.vehicleType
        }
    }
    
    handleInputChange = event => {
        event.target.name === "num1"
        ? this.setState({
            number1:event.target.value
        }) 
        : console.log("error")
    }
    
    render() {
        const useStyles = makeStyles((theme) => ({
            instructions: {
                fontFamily: 'Unbounded',
                fontWeight: '200'
            },
        }));
        const classes = useStyles
        const {number1, transportMode} = this.state
        
        return (
            <>
            <ThemeProvider theme={theme}>
            <form className={classes.formInput}>
                    <TextField
                        required
                        autoFocus
                        className={classes.textInput}
                        variant="filled"
                        label="required"
                        type="text"
                        name="num1"
                        helperText="Enter a distance in km e.g. 2500"
                        value={number1}
                        onChange={this.handleInputChange}
                        color="primary"
                    />
                <div>
                {this.state.number1 >0 ? 
                <>
                <FetchCarbonSutra distance={number1} vehicle={transportMode}/> 
                </>
                : null}
                </div>
            </form>
            </ThemeProvider>
            </>
        )
    }
}
//&& this.state.number2>0 // end={number2} transportMode={transportMode}
export default CalculatorFormSutra