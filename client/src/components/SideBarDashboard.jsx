import {Sidebar} from "flowbite-react"
import {HiUser,HiArrowSmRight} from "react-icons/hi"
import { Link } from "react-router-dom"
function SideBarDashboard() {
  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item active icon={HiUser} labelColor="dark" label="User">
                  <Link to={"/profile?tab=profile"}>  Profile </Link>
                </Sidebar.Item>

                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer">
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default SideBarDashboard