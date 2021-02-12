import  nookies from 'nookies'
import cookie from "cookie"
import jwt_decode from "jwt-decode";
const Dashboard =(props) =>{


    

    return (
        <div>
          
          {props.val.userId}
        </div>
    )   
}

Dashboard.getInitialProps = async ({req})=>{
    const token = cookie.parse(req ? req.headers.cookie : "" )
   
    let val = jwt_decode(token["auth"])
    console.log(val)
    return { val }
}

export default Dashboard