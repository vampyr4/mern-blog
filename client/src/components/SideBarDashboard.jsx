import {Sidebar} from "flowbite-react"
import {HiUser,HiArrowSmRight} from "react-icons/hi"
import { Link } from "react-router-dom"
import {useDispatch} from "react-redux"
import { signOutSuccess } from "../redux/userFeatures/userSlice"
function SideBarDashboard() {
  const dispatch = useDispatch()
  const HandleSignOut = async()=>{
    try {
      const res = await fetch('/api/auth/signout',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'} 
      })
      // const data = res.json()
      if(res.ok){
        dispatch(signOutSuccess())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item active icon={HiUser} labelColor="dark" label="User">
                  <Link to={"/profile?tab=profile"}>  Profile </Link>
                </Sidebar.Item>

                <Sidebar.Item onClick={HandleSignOut} icon={HiArrowSmRight} className="cursor-pointer">
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default SideBarDashboard