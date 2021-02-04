import React, { useState,useEffect } from 'react'
import { TextField, colors, Button } from "@material-ui/core";
import styles from '../styles/Login.module.css'
import axios from 'axios'
import Router from 'next/router'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const Signin = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)
    const [errorEmail, setErrorMail] = useState(false)

    const userId= "a"
     let conn =null
   
    useEffect(()=>{
        conn= new W3CWebSocket("ws://" + "localhost:9000"+ "/ws/validate/" + userId);
       
        conn.onopen=()=>{
            console.log('c')
         conn.onmessage=(msg)=>{
           // const msg = JSON.parse(msg.data)
            console.log(msg)
        } 
        }
        
   
    })
   
    

    const send=()=>{
        conn.send(JSON.stringify({userId:"a", msgtype:"emailValidation",data:email,errorMsg:""}))
    }

    const formSubmit = () => {
       
        const headers = {
            'Content-Type': 'text/plain'
        };
        axios.post(
            "http://localhost:9000/login",

            {
                name: name,
                email: email,
                password: password,
                phone: phone,
                company: company
            }
        ).then((r) => {
            console.log(r.data.msg)
            const result = r.data.msg
            if (result === "invalid user") {
                localStorage.setItem('authTrue', "false")
                setError(true)
            }
            else {
                setError(false)
                localStorage.setItem('authTrue', "true")
                if (localStorage.getItem('authTrue') == "true") {
                    Router.push('/home')
                }
            }

        })

    }

   const emailChange=(e)=>{
       setEmail(e.target.value)
       if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        send()
       }

   }

    return (
        <div>

            <form className={styles.login} onSubmit={formSubmit}>
                <div
                    style={{
                        alignContent: "center",
                        color: "white",
                        fontStyle: "bold",
                    }}>
                    {" "}
                Welcome back!
                </div>
                <br></br>
                Name :
                <input
                    className={styles.input}
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <br></br>
                <br></br>
                <input
                    className={(error) ? styles.errorInput : styles.input}
                    value={email}
                    onChange={emailChange}
                />
                {errorEmail ? <p className={styles.errorlabel}>This email is already used</p> : <p></p>}
                <br></br>
                <br></br>
                <input className={(error) ? styles.errorInput : styles.input}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <br></br>
                <br></br>
                <input className={(error) ? styles.errorInput : styles.input}
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />
               
                <br></br>
                <br></br>
                <Button variant="contained" style={{ width: '400px', height: '50px', backgroundColor: '#3483eb', color: 'white' }}
                    onClick={formSubmit}>
                    Login
        </Button>
            </form>
        </div>
    )
}

export default Signin;