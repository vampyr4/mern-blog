import { useEffect, useState } from "react"
import moment from "moment"
import {FaThumbsUp} from "react-icons/fa"
import { useSelector } from "react-redux"

function Comment({comment,onLike}) {
  const {currentUser} = useSelector(state => state.user)
  const [user,setUser] = useState({})
  console.log(user);
  
  const getUser= async()=>{
    try {
      const res = await fetch(`/api/user/${comment.userId}`)
      const data = await res.json();
      if(res.ok){
        setUser(data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
   getUser() 
  },[comment])
  return (
    <div className="p-4 flex border-b text-sm dark:border-gray-600">
      <div className="flex-shrink-0 mr-3">
        <img className="w-10 h-10 rounded-ful bg-gray-200" src={user.profilePicture} alt={user.username} />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}` : "Anonymous User!"}</span>
          <span className="text-gray-500 text-xs ">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className="text-gray-500 mb-2">{comment.content}</p>
        <div className="flex gap-1  pt-2 text-xs items-center">
          <button className={`text-sm ${comment.likes.includes(currentUser._id) && '!text-blue-500'} text-gray-400 hover:text-blue-500`} onClick={()=>onLike(comment._id)} type="button"><FaThumbsUp /></button>
          <p className="text-gray-400 ">
            {
              comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'like' : 'likes')
            }
          </p>
        </div>
      </div>

    </div>
  )
}

export default Comment