import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import SideBarDashboard from '../components/SideBarDashboard'
import DashboardMain from '../components/DashboardMain'
import DashPosts from '../components/DashPosts'
function Dashboard() {
  const location = useLocation()
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
    
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="sidebar">
        <SideBarDashboard/>
      </div>
       {tab === 'profile' && <DashboardMain/>}
       {tab === 'posts' && <DashPosts/>}
    </div> 
  )
}

export default Dashboard