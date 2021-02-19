import { StylesProvider } from '@material-ui/core'
import React , {useState} from 'react'
import Styles from './CreatePost.module.css'
import axios from 'axios'
import { Divider, Form, Label, Button, Checkbox } from "semantic-ui-react";
const CreatePost  = (props) => {

    const [title , setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price , setPrice] = useState('')
    const [storeName ,setStore] = useState('')
    const [location , setLocation] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [images , setImage] = useState([])
    const [catagory,setCatagory] = useState('')
    const [files , setFiles] = useState('')
    const imageList = []



    const submit =()=>{
      axios.post("http://localhost:9090/addproduct" , {
        
          "title":"titile",
          "description":"asdfasfeasd",
          "price":"asdf",
          "userId":"a",
          "store_name":"store",
          "location":"khisafasfsdaf",
          "thumbnail":imageList[0],
          "images":imageList,
          "catagory":"asdfas" 
      }
      )
    }

    const uploadFiles=()=>{
      for (let i =0 ; i < files.length;i++){
        if(imageList.indexOf(files[i].name)===-1){
          imageList.push(files[i].name)
        }
        console.log(images)
        upload(files[i])
      }
    }

    const upload =(file)=>{
      let id = 48
      const data  = new FormData()
           data.append('id' , id)
           data.append('file' , file) 
      axios.post("http://localhost:9001/",
      data).then(r=>{
        console.log(r.data)
      })
    }  
    return (
      <div className={Styles.container}>
       <h1>{props.info.userId}</h1> 
     <Form >
            <Form.Field inline>
              <input
                style={{width:'300px'}}
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </Form.Field>
            <br></br>

            <Form.Field inline>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
             
            </Form.Field> 
            <input type="file" name="file" multiple onChange={ e=> setFiles(e.target.files)}/>
            <button onClick={uploadFiles}>upload</button>
            <br></br>
            <button onClick={submit}>submit</button>
          </Form>
      </div>    
    )
}

export default CreatePost