import React,{useState,useEffect} from 'react'
import Header from '../components/header'
import { Grid,Typography,Paper, makeStyles } from '@material-ui/core'
import {BASE_URL} from '../components/constants'

import axios from 'axios'



interface Props {
}
// interface DataProps {
//     ips: {
//         eth0: string,
//         wlan0:string,
//         "br-de82f751fff9":string,
//         tun2:string
//       }
//     vpn_connected: boolean,
//     messaging_ok:boolean,
//     hub_name: string

//   }



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
padding: '50px',
backgroundColor:'#f7f7f5'
},

allHub:{
    backgroundColor:'#fcfbf2'
},

hub:{
    backgroundColor:'#eaebdf'
}


})
const DisplayData: React.FC<Props> = () => {
    const [displayData, setDisplayData] = useState<any>()
    const clickHandler = async()=>{
        await axios.get(`${BASE_URL}hub_info`)
        .then((response)=>{
            console.log(response.data)
            setDisplayData(response.data)   
            
        })    
    }

    useEffect(()=>{
        clickHandler()
    },[])


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
                            <Paper variant="elevation" elevation={2} className={classes.allHub}>
                                <Grid item>

                                    {
                                        !displayData?null:(

                                                    <>
                                                        <Typography component="h6" variant="h6"> hub name : {displayData.hub_name}</Typography>
                                                        <Typography component="h6" variant="h6">vpn connected: {displayData.vpn_connected?'yes':'no'}</Typography>
                                                        <Typography component="h6" variant="h6">messaging : {displayData.messaging_ok?'ok':'no messaging'}</Typography>
                                                        <Paper variant="elevation" elevation={2} className={classes.hub}>
                                                            <Typography component="h4" variant="h4">IP LIST</Typography>
                                                            <Typography component="h6" variant="h6">eth0 :{displayData.ips.eth0}</Typography>
                                                            <Typography component="h6" variant="h6">wlan0 :{displayData.ips.wlan0}</Typography>
                                                            <Typography component="h6" variant="h6">br-de82f751fff9 :{displayData.ips["br-de82f751fff9"]}</Typography>
                                                            <Typography component="h6" variant="h6">tun2 :{displayData.ips.tun2}</Typography>
                                                        </Paper>

                                                    </>
                                            )
                                            
                                    }
                                </Grid>
                            </Paper>
                            
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            
        </>
    )
}

export default DisplayData
