import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import app from "../firebase.js"
import {useNavigate} from "react-router-dom"
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage" 

export default function CreatePost() {
  const navigateTo = useNavigate()
  const [image, setImage] = useState(null)
  const [filename, setFilename] = useState("")
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const HandleImage = (e) => {
    setImage(e.target.files[0])
    setFilename(e.target.files[0].name)
  }

  const HandleUpload = async(e) => {
    e.preventDefault()
    setLoading(true)
    const storage = getStorage(app)
    setFilename('image' + Math.random(3) + filename)
    const storageRef = ref(storage, filename)
    const uploadTask = await uploadBytesResumable(storageRef, image) 
    console.log(uploadTask);
    
    if(!uploadTask.error){
      const downloadURL = await getDownloadURL(uploadTask.ref)
      console.log(downloadURL);
      setFormData({...formData, image: downloadURL})
      setFilename(null)
      setImage(null)
      setLoading(false)
    }

    setLoading(false)
  }

    const HandleSubmit = async(e)=>{
      e.preventDefault()
      setLoading(true)
      try {
        const res = await fetch("/api/post/create",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message);
        return;
      }
      setLoading(false)
      navigateTo(`/post/${data.slug}`)
      
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
  return (
    <div className="p-3 flex flex-col max-w-3xl mx-auto min-h-screen">
      <h1 className="text-ce nter text-3xl my-7 font-semibold">Create a post!</h1>
      <form onSubmit={HandleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4  justify-between">
          <TextInput type="text" placeholder="Title" onChange={(e)=> setFormData({
            ...formData, title:e.target.value
          })} required id="title" className="flex-1"/>
          <Select onChange={(e)=> setFormData({
            ...formData, category:e.target.value
          })}>
            <option value="uncategorized">Select Category</option>
            <option value="Javascript">JS</option>
            <option value="React">React</option>
            <option value="Mongo DB">Database</option>
            <option value="Express js">Express js</option>
          </Select>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput onChange={HandleImage} type="file"></FileInput>
            <Button disabled={loading} onClick={HandleUpload} type="button" gradientDuoTone={"purpleToBlue"} size="sm" outline>Upload Image</Button>
          </div>
            {
              formData.image && <img
              src={formData.image}
              className="w-full h-72 object-cover"
              ></img>
            }
          <ReactQuill onChange={(value)=> setFormData({...formData,content:value})} theme="snow" required placeholder="Write the blog here!" className="h-72 mb-12"></ReactQuill>
          <Button disabled={loading} type="submit" gradientDuoTone={"purpleToPink"}>Publish</Button>
        </div>
      </form>
    </div>
  )
}
