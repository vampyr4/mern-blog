import {Link} from "react-router-dom"
import {Button, Label,TextInput} from "flowbite-react"
function SignUp() {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                />
            </div>

            
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                />
            </div>

            
            <div>
              <Label value="Your Password" />
              <TextInput
                type="text"
                placeholder="password"
                id="password"
                />
            </div>
            <Button type="submit" gradientDuoTone='purpleToPink'>
              Click To Sign Up
            </Button>
          </form>
          <div className="loginSec flex text-sm mt-5 gap-2">
            <span>Have an account?</span>
            <Link to="/signin">
            Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp