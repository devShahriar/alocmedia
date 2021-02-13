import Router from 'next/router'
import cookie from "cookie"
import { AuthToken } from '../src/util/validator';
import {parseCookies} from 'nookies'
import { Route } from 'react-router-dom';
import Login from './login';
const Dashboard =(props) =>{


    const TOKEN_STORAGE_KEY = "auth"

    return (
        <div>
          
         {props.res}
         <button onClick={()=>{
          let token = parseCookies({})
          console.log(token)
         }}>
             getToken
         </button>
        </div>
    )   
}

export async function getServerSideProps(ctx){
    let token = null
    let info = {}
  
  //  token = parseCookies(ctx)
  //  console.log(token["auth"])
  
   

    token = parseCookies(ctx)
    
    console.log("1",token["auth"])
    if(token["auth"]){
        console.log("token exist")
        const tokenObj = new AuthToken(token["auth"])
        const expireToken = tokenObj.isExpired()
        if(!expireToken) {
            info = tokenObj.getToken()
            console.log(info) 
         }
         else {
            return {
                redirect: {
                  destination: '/login',
                  permanent: false,
                },
              }
        }
    }
    else{
        return {
            redirect: {
              destination: '/login',
              permanent: false,
            },
          }
    }
    
    return { props:info}
}

export default Dashboard