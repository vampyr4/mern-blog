import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashPosts() {
  const [deleteModal, setDeleteModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [postIdForDelete, setPostIdForDelete] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const HandleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => {
          return [...prev, ...data.posts];
        });
        if (data.posts.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts(data.posts);
        console.log(userPosts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setDeleteModal(false);
    try {
      const res = await fetch(
        `/api/post/delete/${postIdForDelete}/${currentUser._id}`
      );
      if (res.ok) {
        setUserPosts((prev) => {
          prev.filter((post) => {
            return post._id !== postIdForDelete;
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 dark:500 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
      {currentUser.isAdmin && userPosts && userPosts.length > 0 ? (
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
            {userPosts &&
              userPosts.map((post) => {
                return (
                  <Table.Body className="divide-y" key={post._id}>
                    <Table.Row>
                      <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell className="w-96">
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="bg-gray-500 w-full h-32 md:w-32 md:h-32 "
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell className="font-semibold">
                        {post.title}
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={() => {
                            setDeleteModal(true);
                            setPostIdForDelete(post._id);
                          }}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/updatepost/${post._id}`}>
                          <button className="text-blue-500">Edit</button>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
          </Table>
          {showMore && (
            <button
              onClick={HandleShowMore}
              className="w-full text-teal-500 self-center py-7"
            >
              Show More
            </button>
          )}

          <Modal
            show={deleteModal}
            onClose={() => setDeleteModal(false)}
            popup
            size={"md"}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mb-4 mx-auto h-14 w-14 text-gray-400 dark:text-gray-200"></HiOutlineExclamationCircle>
                <h3 className="text-gray-400 dark:text-gray-200 text-lg mb-5">
                  Are you sure you want to delete your post?
                </h3>
                <div className="flex justify-between">
                  <Button
                    onClick={() => setDeleteModal(false)}
                    outline
                    gradientDuoTone={"purpleToBlue"}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeletePost}
                    gradientDuoTone={"purpleToBlue"}
                    className="ml-4"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <h3>You have no posts yet!</h3>
      )}
    </div>
  );
}

export default DashPosts;
