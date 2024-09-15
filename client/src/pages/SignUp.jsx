import {Link, useNavigate} from "react-router-dom"
import {Alert, Button, Label,Spinner,TextInput} from "flowbite-react"
import { useState } from "react"
function SignUp() {
  const [formData,setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigateTo = useNavigate()

  const HandleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const HandleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    if(!formData.username || !formData.password || !formData.email){
      setLoading(false)
      return setError("Please Fill All Details!")
    }
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(!data.success){
        setLoading(false)
        setError(data.message)
        return
      }
      if(res.ok){
        navigateTo("/signin")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
        setError(error.message)
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        <div className="left flex-1">
        <Link to={"/"} className="text-4xl font-bold dark:text-white"> 
            <span className="text-white px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">MERNs</span>
            Blog
        </Link>
        <p className="text-sm mt-5">
          Sign up to create an account or log in to access your dashboard.
        </p>

        </div>

        <div className="right flex-1">
          <form onSubmit={HandleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={HandleChange}
                />
            </div>

            
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={HandleChange}
                />
            </div>

            
            <div>
              <Label value="Your Password" />
              <TextInput
                type="text"
                placeholder="password"
                id="password"
                onChange={HandleChange}
                />
            </div>
            <Button type="submit" gradientDuoTone='purpleToPink' disabled={loading}>
              {
                loading ? <Spinner size="sm"/> : "Sign Up"
              }
            </Button>
          </form>
          <div className="loginSec flex text-sm mt-5 gap-2">
            <span>Have an account?</span>
            <Link to="/signin">
            Sign In
            </Link>
          </div>
          {
            error && <Alert className="mt-5" color="failure">{error}</Alert>
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp