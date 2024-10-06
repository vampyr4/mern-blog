import { Link } from "react-router-dom"
import CallToAction from "../components/CallToAction"
import PostCard from "../components/PostCard"
import { useEffect, useState } from "react"
function Home() {
  const [posts,setPosts] = useState([])
  console.log(posts);
  
  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await fetch('/api/post/getposts?limit=8')
      const data = await response.json()
      setPosts(data.posts)
    }
    fetchPosts()
  },[])
  return (
    <div>
      <div className="flex flex-col p-28 px-3 gap-6 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to blog .NET</h1>
        <p className="text-gray-600 text-xs md:text-sm">Here you will find variety of articles and tutorials on topics
          such as web development, AI and Software engeneering
        </p>
        <Link to={'/search'} className="text-xs sm:text-sm text-teal-500 font-bold hover:underline">View All</Link>
      </div>

        <div className="p-3 bg-amber-100 dark:bg-slate-700">
          <CallToAction/>
        </div>

        <div className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-32">
          {
            posts && posts.length > 0 && (
              <div className="flex flex-col gap-12p">
                <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
                <div className="flex justify-center items-center flex-wrap mx-auto gap-4">
                  {
                    posts.map((post)=>{
                     return <PostCard key={post._id} post={post} />
                    })
                  }
                </div>
                <Link to="/search" className="text-lg text-teal-500 text-center">View All</Link>
              </div>
            )
          }
        </div>
    </div>
  )
}

export default Home