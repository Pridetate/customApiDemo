import React from 'react'
import {useState} from 'react'
import { Button,Grid,Typography,Paper,TextField, makeStyles } from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Header from '../components/header'
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
const ChangePassword: React.FC<Props> = () => {
    const history = useHistory()
    const [input, setInput] = useState({
        email: "",
        oldPassword: "",
        newPassword:"",
        confirmNewPassword:""
    }) 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async() => {
        
        if(!input.email || !input.oldPassword || !input.newPassword || !input.confirmNewPassword) {
            alert('fill in all fields please')
            return
        }

        if(input.newPassword !== input.confirmNewPassword){
            alert('new password must be the same as the confirmed new password')
            return
        }
 
        await axios.post(`${BASE_URL}changehubpassword`, {
        email: input.email,
        newPassword: input.newPassword,
        oldPassword: input.oldPassword
      })
      .then((response) => {
        console.log(response)
        alert(`Password changed , token: ${response.data.token}`)
        history.push("/displaydata")
      }, (error) => {
        console.log(error.response);
        alert(`status res : ${error.response.status}, error message: ${error.response.data.error}`)
      })
    }

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
                                    <Typography component="h1" variant="h5">
                                        Change Password
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
                                          placeholder="old Password"
                                          fullWidth
                                          name="oldPassword"
                                          variant="outlined"
                                          value={input.oldPassword}
                                          onChange={handleChange}
                                          />
                                      </Grid>
                                      <Grid item>
                                          <TextField
                                          type="password"
                                          placeholder="new Password"
                                          fullWidth
                                          name="newPassword"
                                          variant="outlined"
                                          value={input.newPassword}
                                          onChange={handleChange}
                                          />
                                      </Grid>
                                      <Grid item>
                                          <TextField
                                          type="password"
                                          placeholder="confirm new Password"
                                          fullWidth
                                          name="confirmNewPassword"
                                          variant="outlined"
                                          value={input.confirmNewPassword}
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

export default ChangePassword
