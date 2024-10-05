import { Link } from "react-router-dom"
function PostCard({post}) {
  return (
    <div className="group relative w-full border h-[350px] border-teal-500 hover:border-2 transition-all overflow-hidden rounded-lg sm:w-[430px]">
        <Link to={`/post/${post.slug}`}>
            <img className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20" src={post.image} alt={post.slug} />
        </Link>
        <div className="p-3 flex flex-col gap-2 ">
            <p className="text-lg line-clamp-2 font-semibold">{post.title}</p>
            <p className="font-italic text-sm">{post.category}</p>
            <Link className="z-10 group-hover:bottom-0 bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md absolute" to={`/post/${post.slug}`}>
                Read Article
            </Link>
        </div>
    </div>
  )
}

export default PostCard