import  * as React from 'react'
import {useState,useContext} from 'react'
import { Button,Grid,Typography,Paper,TextField, makeStyles } from '@material-ui/core'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../components/constants' 

import {AuthContext} from '../App'



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



const Login: React.FC<Props>= () => {
    const {setIsAuth} = useContext(AuthContext)
    const history = useHistory()
    const [input, setInput] = useState({
        email: "",
        password: ""
    }) 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async() => {
        
        if(!input.email || !input.password) {
            alert('fill in all fields please')
            return
        }
 
         await axios.post(`${BASE_URL}auth`, {
        email: input.email,
        password: input.password
      })
      .then((response) => {
        setIsAuth(true)
        console.log(response)
        alert(`token is 1${response.data.token}`)
        history.push("/displaydata")
      }, (error) => {
        console.log(error.response.data);
        alert(`status res : ${error.response.status}, error message: ${error.response.data.error}`)
      })
    }

    const classes= loginStyles()
    return (
          <>

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
                              <Typography component="h1" variant="h5">
                              Sign in
                              </Typography>
                          </Grid>
                          <Grid item>
                              <>
                                  <Grid container direction="column" spacing={2}>
                                      <Grid item>
                                          <TextField
                                              type="email"
                                              placeholder="Email"
                                              fullWidth
                                              name="email"
                                              variant="outlined"
                                              value={input.email}
                                              onChange={handleChange}
                                              //value                      
                                              // required
                                              // autoFocus
                                          />
                                      </Grid>
                                      <Grid item>
                                          <TextField
                                          type="password"
                                          placeholder="Password"
                                          fullWidth
                                          name="password"
                                          variant="outlined"
                                          value={input.password}
                                          onChange={handleChange}
                                          // value
                                          // required
                                          />
                                      </Grid>
                                      <Grid item>
                                          
                                          <Button
                                              variant="contained"
                                              color="primary"
                                              onClick = {handleSubmit}
                                              type="submit"
                                              className={classes.buttonBlock}
                                              >
                                              Submit
                                          </Button>
                                      </Grid>
                                  </Grid>
                              </>
                          </Grid>
                          <Grid item>
                              <Typography
                                component={ Link } to="/signup"
                                variant="h5"
                                    >
                                Sign up
                              </Typography>
                          </Grid>
                      </Paper>
                  </Grid>
              </Grid>
          </Grid>
        
  
              
      </>
      )
}

export default Login
