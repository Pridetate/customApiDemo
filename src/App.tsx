import React,{useState,createContext} from 'react';

import './App.css';
import { Switch , Route,Redirect} from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup';
import DisplayData from './pages/DisplayData';
import ChangePassword from './pages/ChangePassword';

type IAuth = {
    isAuth: boolean,
    setIsAuth: (value:boolean)=> void
}

 export const AuthContext = createContext<IAuth>({
    isAuth:false,
    setIsAuth: ()=>{}
})
function App() {
    
    const [isAuth,setIsAuth] = useState(false)



   return(
       <AuthContext.Provider value= {{ isAuth :isAuth,setIsAuth:setIsAuth}}>
        <div>
           <Switch>
            <Route exact path = '/' component = {Login} /> 
            <Route exact path = '/signup' component = {Signup}/> 
            <Route exact path = '/displaydata' render = {()=> isAuth?<DisplayData />:(<Redirect to = '/'/>)}/> 
            <Route exact path = '/changepassword' render = {()=> isAuth?(<Redirect to = '/'/>):<ChangePassword />} /> 
            
            {/* <Route exact path = '/signin' render = {() => this.props.currentUser? (<Redirect to = '/'/>): (<SignInAndSignUpPage/>)}/> */}
            </Switch>
       </div>
       </AuthContext.Provider>
   )
}



export default App

