import { Textarea, Button } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Comment from "./Comment"

function CommentSection({postId}) {
   const [comments, setComments] = useState([])
   const {currentUser} = useSelector(state => state.user)
   const [comment,setComment] = useState('')
   const HandleSubmit = async(e)=>{
    e.preventDefault()
    const res = await fetch('/api/comment/create',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({postId: postId, content:comment, userId:currentUser._id})
    })
    const data = await res.json()
    if(res.ok){
        setComment('')
        setComments([data,...comments])
    }
   }
   
//    console.log(comments);
   const getComments = async()=>{
    try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`)
        if(res.ok){
            const data = await res.json()
            setComments(data)
        }
    } catch (error) {
        console.log(error) 
    }
}

   useEffect(()=>{
    getComments()
   },[postId])

   const HandleLike = async(commentId)=>{
        try {
            if(!currentUser){
                const navigate = useNavigate()
                navigate('/login')
            }
            const res = await fetch(`/api/comment/like/${commentId}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userId: currentUser._id})
            })
            if(res.ok){
                const data = await res.json()
                const updatedComments = comments.map(comment => comment._id === commentId? {...comment, likes: data.likes, numberOfLikes:data.likes.length} : comment)
                // console.log(data);
                setComments(updatedComments)
            }
        } catch (error) {
            console.log(error);
            
        }
   }

   
   const handleEdit = async(comment,editedComment)=>{
        setComments(comments.map((c)=>{
           return c._id === comment._id ? {...c,content:editedComment} : c
        }))
    }

    const onDelete = async(id)=>{
        try {
            const res = await fetch(`/api/comment/delete/${id}`,{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
            if(res.ok){
                const updatedComments = comments.filter(comment => comment._id !== id)
                setComments(updatedComments)
            }
        } catch (error) {
            console.log(error)
        }
    }   
   return (
    <div className="mx-auto max-w-2xl w-full p-3">
        {
            currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Signed in as:</p>
                    <img className="h-5 w-5 object-cover rounded-full  " src={currentUser.profilePicture} alt={currentUser.username} />
                    <Link className="text-xs text-cyan-600 hover:underline" to={"/dashbpard?tab=profile"}>
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    <p>Please sign in to comment.</p>
                    <Link className="text-blue-500 hover:underline" to={"/login"}>Sign In</Link>
                </div>
            )
        }
        {
            currentUser && (
                <form onSubmit={HandleSubmit} className="border border-teal-500 rounded-md p-3">
                    <Textarea onChange={e => setComment(e.target.value)} value={comment} placeholder="Add a comment..." rows="3" maxLength="200" />
                    <div className="flex justify-between items-center mt-5 ">
                        <p className="text-sm text-gray-500">{200 - comment.length} characters remaining</p>
                        <Button outline gradientDuoTone={"purpleToBlue"} type="submit">Comment</Button>
                    </div>
                </form>
            )
        }
        {
            comments.length === 0 ? (
                <p className="text-sm my-5">No comments yet!</p>
            )
            :
            (<>
                <div className="text-sm flex my-5 items-center gap-1">
                    <p>Comments</p>
                    <div className="border border-gray-400 py-1 px-2 rounded-sm">
                        <p>{comments.length}</p>
                    </div>
                </div>

                { 
                comments.map((comment)=>{
                    return(
                        <Comment onDelete={onDelete} onEdit={handleEdit} onLike={HandleLike} comment={comment} key={comment._id}/>
                )})}
                </>
            )
        }
    </div>
  )
}

export default CommentSection