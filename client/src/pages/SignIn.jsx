import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { signInSuccess, signInFailure , signInStart } from "../redux/userFeatures/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const navigateTo = useNavigate();
  const dispatch = useDispatch()
  const {loading,error} = useSelector(state => state.user) 
  console.log(loading)
  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.password || !formData.email) {
      dispatch(signInFailure())
      return 
    }
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(signInFailure(data.message))
        return;
      }
      if (res.ok) {
        dispatch(signInSuccess(data.validUser));
        navigateTo("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        <div className="left flex-1">
          <Link to={"/"} className="text-4xl font-bold dark:text-white">
            <span className="text-white px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
              MERNs
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Sign in to to access your dashboard.
          </p>
        </div>

        <div className="right flex-1">
          <form onSubmit={HandleSubmit} className="flex flex-col gap-4">
          

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
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Sign In"}
            </Button>
            <Oauth />
          </form>
          <div className="loginSec flex text-sm mt-5 gap-2">
            <span>Dont have an account?</span>
            <Link to="/signup">Sign Up</Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
