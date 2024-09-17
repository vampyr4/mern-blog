import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import {useSelector} from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import app from "../firebase.js"

function DashboardMain() {
  const {currentUser} = useSelector(state => state.user)
  const [image, setImage] = useState(null)  
  const imageRef = useRef()
  const [imageUrl, setImageUrl] = useState(null)  
  const HandleChangeImage = (e) => {
    const file = e.target.files[0]
    if(file){
      setImage(file)
      setImageUrl(URL.createObjectURL(file))
    } 
  }
  useEffect(()=>{
    uploadImage()
  },[image])
  const uploadImage = async()=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage,fileName)
    const uploadTask = await uploadBytesResumable(storageRef,image)
    if (!uploadTask.error) {
      const downloadURL = await getDownloadURL(uploadTask.ref)
      console.log(downloadURL);
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={imageRef} hidden  accept="image/*" onChange={HandleChangeImage} />
        <div onClick={()=> imageRef.current.click()} className='w-32 cursor-pointer shadow-md rounded-full h-32 self-center'>
        <img src={imageUrl || currentUser.profilePicture} alt="User PP" className='rounded-full w-full h-full object-cover border-8 border-[ligthgray]  ' />
        
        </div>

        <TextInput type="text" id="username" placeholder="username" value={currentUser.username} />
        <TextInput type="email" id="email" placeholder="username" value={currentUser.email} />
        <TextInput type="password" id="password" placeholder="**********"  />

        <Button type="submit" outline gradientDuoTone={"purpleToBlue" }>
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-5">
      <span className="text-red-500 cursor-pointer">Delete Account</span>
      <span className="text-red-500 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default DashboardMain