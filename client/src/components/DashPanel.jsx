import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
function DashPanel() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  //   console.log(users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          // console.log(data);

          //   console.log(data.lastMonthUsers)
          setLastMonthUsers(data.totalUsersThisMonth);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComments = async () => {
      const res = await fetch("/api/comment/getcomments?limit=5");
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.totalCommentsThisMonth);
      }
    };

    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=5");
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.totalPostsThisMonth);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);
  return (
    <>
      <div className="p-3 md:mx-auto ">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex flex-col p-3 hover:shadow-teal-500 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className="flex justify-between ">
              <div>
                <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
                <p className="text-2xl">{totalUsers}</p>
              </div>
              <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg"></HiOutlineUserGroup>
            </div>
            <div className="flex gap-2 items-center">
              <span className="items-center flex text-green-500">
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className="text-gray-500">Last Month</div>
            </div>
          </div>

          <div className="flex flex-col p-3 hover:shadow-indigo-500 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className="flex justify-between ">
              <div>
                <h3 className="text-gray-500 text-md uppercase">
                  Total Comments
                </h3>
                <p className="text-2xl">{totalComments}</p>
              </div>
              <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg"></HiAnnotation>
            </div>
            <div className="flex gap-2 items-center">
              <span className="items-center flex text-green-500">
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <div className="text-gray-500">Last Month</div>
            </div>
          </div>

          <div className="flex flex-col p-3 hover:shadow-lime-500 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className="flex justify-between ">
              <div>
                <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
                <p className="text-2xl">{totalPosts}</p>
              </div>
              <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg"></HiDocumentText>
            </div>
            <div className="flex gap-2 items-center">
              <span className="items-center flex text-green-500">
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <div className="text-gray-500">Last Month</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 py-5 mx-auto justify-center">
          <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className="p-2 text-center">Recent Users</h1>
              <Button outline gradientDuoTone={"purpleToPink"}>
                <Link to="/dashboard?tab=users">See All</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>

              {users &&
                users.map((user) => {
                  return (
                    <Table.Body key={user._id}>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                          <img
                            src={user.profilePicture}
                            alt="User"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  );
                })}
            </Table>
          </div>

        
          <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className="p-2 text-center">Recent Comments</h1>
              {/* <Button outline gradientDuoTone={"purpleToPink"}>
                {/* <Link to="/dashboard?tab=comments">See All</Link> */}
              {/* </Button> */}
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Comment</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>

              {comments &&
                comments.map((comment) => {
                  return (
                    <Table.Body key={comment._id}>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="w-96">
                         <p className="line-clamp-2"> {comment.content}</p> 
                        </Table.Cell>
                        <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  );
                })}
            </Table>
          </div>

          <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className="p-2 text-center">Recent Posts</h1>
              <Button outline gradientDuoTone={"purpleToPink"}>
                <Link to="/dashboard?tab=posts">See All</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
              </Table.Head>

              {posts &&
                posts.map((post) => {
                  return (
                    <Table.Body key={post._id}>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                          <img
                            src={post.image}
                            alt="User"
                            className="w-14 h-12 rounded-md object-cover"
                          />
                        </Table.Cell>
                        <Table.Cell className="w-96"><Link to={`/post/${post.slug}`}>{post.title} </Link></Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  );
                })}
            </Table>
          </div>

        </div>
      </div>
    </>
  );
}

export default DashPanel;
