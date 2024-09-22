import { useEffect, useState } from "react"
import {useSelector} from "react-redux"
import {Table} from "flowbite-react"
import {Link} from "react-router-dom"

function DashPosts() {
  const {currentUser} = useSelector(state => state.user)
  const [userPosts, setUserPosts] = useState([])
  const fetchPosts = async()=>{
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
      const data = await res.json()
      if(res.ok){
        setUserPosts(data.posts)
        console.log(userPosts);
        
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    fetchPosts()
    
  },[])
  return (
    <div className="w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 dark:500 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
    {currentUser.isAdmin && userPosts.length > 0 ? (
      <>
      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
        </Table.Head>
          {userPosts && userPosts.map((post) =>{
            return <Table.Body className="divide-y" key={post._id}>
              <Table.Row>
                <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell className="w-96">
                  <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt={post.title} className="bg-gray-500 w-full h-32 md:w-32 md:h-32 "  />
                  </Link>
                </Table.Cell>
                <Table.Cell className="font-semibold">{post.title}</Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <button className="text-red-500">Delete</button>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/updatepost/${post._id}`}>
                    <button className="text-blue-500">Edit</button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          })}

      </Table>
      </>
    ):
      <h3>You have no posts yet!</h3>
    }
  </div>
  )
}

export default DashPosts