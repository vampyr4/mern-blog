import { Button } from "flowbite-react"
import {AiFillGoogleCircle} from "react-icons/ai"
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import app from "../firebase.js"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/userFeatures/userSlice"
import { useNavigate } from "react-router-dom"

function Oauth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const HandleOauth = async() => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const resFG = await signInWithPopup(auth,provider)
            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resFG.user.displayName,
                    email: resFG.user.email,
                    photo: resFG.user.photoURL
                })})
                const data = await res.json()
                if(res.ok){
                    dispatch(signInSuccess(data))
                    navigateTo("/")
                }

            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Button type="button" className="flex items-center" gradientDuoTone={"pinkToOrange"} onClick={HandleOauth} outline>
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
    </Button>
)
}

export default Oauth