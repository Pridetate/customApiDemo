import React from 'react'
import { AppBar, Toolbar, Grid,  makeStyles,Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

const headerStyles = makeStyles({
    root:{
        margin:'0 auto',
        marginLeft:'1px',
        marginRight:'3px',
       // paddingRight:theme.spacing(1),
       padding: '0.5rem',
        transform:'translateZ(0)'
    },
    rightHeader:{
        //padding:theme.spacing(2),
        padding: '1rem',
        alignItems:'center'
    }
})

const Header = () => {
    const classes = headerStyles();
    return (
        <>
                       <AppBar position = 'static' className = {classes.root}>
                <Toolbar>
                    <Grid container alignItems = 'center'>
                        <Grid item>
                            <Button color="inherit">Demo  Application</Button>  
                        </Grid>
                        <Grid item sm>
                        </Grid>
                        <Grid item className = {classes.rightHeader}>

                            <Button color="inherit" component={ Link } to="/displaydata" >
                                 Display hub info
                            </Button>                          
                            <Button color="inherit" component={ Link } to="/changepassword">Change Password</Button>
                            <Button color="inherit" component={ Link } to="/" >Power off hub</Button>
                            <Button color="inherit" component={ Link } to="/">log out</Button>
                            
                        </Grid>
                        

                    </Grid>
                    
                </Toolbar>
            </AppBar> 
        </>
    )
}

export default Header
