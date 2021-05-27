import React from 'react'
import {useState} from 'react'
import { Button,Grid,Typography,Paper,TextField, makeStyles } from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../components/constants'
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

const Signup: React.FC<Props> = () => {
    const history = useHistory()
    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPassword:""
    }) 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async() => {
        
        if(!input.email || !input.password ||  !input.confirmPassword) {
            alert('fill in all fields please')
            return
        }

        if(input.password !== input.confirmPassword){
            alert(' password must be the same as the confirmed password')
            return
        }
 
        await axios.post(`${BASE_URL}signup`, {
        email: input.email,
        password: input.password
      })
      .then((response) => {
        console.log(response)
        alert(`user registered , token: ${response.data.token}`)
        history.push("/displaydata")
      }, (error) => {
        console.log(error.response);
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
                                       Sign Up
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
                                              // required
                                              // autoFocus
                                          />
                                      </Grid>
                                      <Grid item>
                                          <TextField
                                          type="password"
                                          placeholder="password"
                                          fullWidth
                                          name="password"
                                          variant="outlined"
                                          value={input.password}
                                          onChange={handleChange}
                                          />
                                      </Grid>
                                      <Grid item>
                                          <TextField
                                          type="password"
                                          placeholder="confirm new Password"
                                          fullWidth
                                          name="confirmPassword"
                                          variant="outlined"
                                          value={input.confirmPassword}
                                          onChange={handleChange}
                                          />
                                      </Grid>
                                      <Grid item>
                                          <Button
                                              variant="contained"
                                              color="primary"
                                              type="submit"
                                              onClick = {handleSubmit}
                                              className={classes.buttonBlock}
                                              >
                                              Submit
                                          </Button>
                                      </Grid>
                                  </Grid>
                              </>
                          </Grid>
                            </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Signup
