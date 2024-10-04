import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import CallToAction from "../components/CallToAction";
import {Link, useParams} from 'react-router-dom'
import CommentSection from '../components/CommentSection';

function PostPage() {
  const {postSlug} = useParams();
  const [loading,setLoading] = useState()
  const [post,setPost] = useState(null)
  const [error,setError] = useState(null)
  const getPost = async()=>{
    try {
      setError(null)
      setLoading(true)
      const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
      const data = await res.json()
      if(res.ok){
        setPost(data.posts[0])
        setLoading(false)
        setError(null)
      } else {
        setLoading(false)
        setError('Post not found')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getPost()
  },[postSlug])
  return (
    <>
 {   loading ? <div className="spinnerDiv h-screen flex items-center justify-center">
      <Spinner size={"xl"}>
      </Spinner>
    </div> : 
    <div className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-20 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
    <Link className='self-center' to={`/search?category=${post && post.category}`}>
      <Button color={"gray"} pill size={"xs"} className='text-center'>{post && post.category}</Button>
    </Link>

    <img src={post && post.image} className='mt-10 p-3 max-h-[600] w-full object-cover' alt="Post Image" />
    <div className='px-3 flex justify-between border-b mt-10 border-slate-500 w-full max-w-2xl text-xs mx-auto'>
      <span>{new Date(post && post.createdAt).toLocaleDateString()}</span>
      <span>{post && (post.content.length/1000).toFixed(0)} mins read</span>
    </div>

    <div className='p-3 max-w-2xl mx-auto w-full postContent' dangerouslySetInnerHTML={{__html:post && post.content}}>
    </div>

    <div className='max-w-4xl mx-auto w-full'>
      <CallToAction />
    </div>
    <CommentSection postId={post && post._id}/>

    </div>
}
    </>
  )
}

export default PostPage