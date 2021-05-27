import React,{useState,useEffect} from 'react'
import Header from '../components/header'
import { Button,Grid,Typography,Paper, makeStyles } from '@material-ui/core'
import {BASE_URL} from '../components/constants'

import axios from 'axios'

interface Props {
}
const loginStyles = makeStyles({
    loginForm:
{
justifyContent: 'center',
minHeight: '90vh',
},
buttonBlock:{
width: '100%'
},
loginBackground:
{
justifyContent: 'center',
minHeight: '30vh',
padding: '50px'
}


})
const DisplayData: React.FC<Props> = () => {
    const [displayData, setDisplayData] = useState([])
    const clickHandler = async()=>{
        await axios.get(`${BASE_URL}hub_info`)
        .then((response)=>{
            console.log(response.data)
            alert(response.data)
            setDisplayData(response.data)   
            
        })    
    }

    useEffect(()=>{

    },[displayData])


    const classes= loginStyles()
    return (
        <>
            <Header />
            <Grid container spacing={0} justify="center" direction="row">
                <Grid item>
                    <Grid 
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        className= {classes.loginForm}
                        >
                        <Paper
                                variant="elevation"
                                elevation={2}
                                className={classes.loginBackground}
                                >
                            <Grid item>
                                    <Typography component="h3" variant="h3">
                                        Hub Info
                                    </Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick = {clickHandler}>
                                    display hub info (Please check data on console after clicking here)
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            
        </>
    )
}

export default DisplayData
