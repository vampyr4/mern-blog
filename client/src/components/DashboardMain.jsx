import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import app from "../firebase.js"
import { updateFailure, updateStart, updateSuccess } from "../redux/userFeatures/userSlice.js"

function DashboardMain() {
  const {currentUser} = useSelector(state => state.user)
  const [image, setImage] = useState(null)  
  const imageRef = useRef()
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState(null)  
  const [updateData, setUpdateData] = useState({})
  const [alert, setAlert] = useState(null)
  const {loading} = useSelector(state => state.user)
  const HandleChangeImage = (e) => {
    const file = e.target.files[0]
    if(file){
      setImage(file)
      setImageUrl(URL.createObjectURL(file))
    } 
  }
  const uploadImage = async()=>{
    setAlert("Image is uploading! Please do not try to update")
    const storage = getStorage(app)
    // console.log(image);
    const {name} = image
    const fileName = new Date().getTime() + name
    const storageRef = ref(storage,fileName)
    const uploadTask = await uploadBytesResumable(storageRef,image)
    if (!uploadTask.error) {
      const downloadURL = await getDownloadURL(uploadTask.ref)
      setUpdateData({...updateData,profilePicture:downloadURL})
      setAlert("Image uploaded successfully!")
    }
  }
  useEffect(()=>{
    if(image){
      uploadImage()
    }
  },[image])

  const HandleChange = (e)=>{
    setUpdateData({...updateData,[e.target.id]:e.target.value})
  }

  const handleProfileUpdate = async(e)=>{
       e.preventDefault()
      //  console.log(updateData)
       try{
        dispatch(updateStart())
        const response = await fetch(`/api/user/update/${currentUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updateData),
        });
        const data = await response.json();
        // console.log(data);
        
        if(response.ok){
          dispatch(updateSuccess(data))
        }
       }catch(error){
        dispatch(updateFailure(error.message))
       }
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Profile
      </h1>
      <form onSubmit={handleProfileUpdate} className='flex flex-col gap-4'>
        <input type="file" ref={imageRef} hidden  accept="image/*" onChange={HandleChangeImage} />
        <div onClick={()=> imageRef.current.click()} className='w-32 cursor-pointer shadow-md rounded-full h-32 self-center'>
        <img src={imageUrl || currentUser.profilePicture} alt="User PP" className='rounded-full w-full h-full object-cover border-8 border-[ligthgray]  ' />
        </div>
        {alert  && <Alert color={"success"}> {alert} </Alert>}

        <TextInput onChange={HandleChange} type="text" id="username" placeholder="username" defaultValue={currentUser.username} />
        <TextInput onChange={HandleChange} type="email" id="email" placeholder="username" defaultValue={currentUser.email} />
        <TextInput onChange={HandleChange} type="password" id="password" placeholder="**********"  />

        <Button type="submit" outline gradientDuoTone={"purpleToBlue" }>
         {loading ? "Loading" : "Update"}
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