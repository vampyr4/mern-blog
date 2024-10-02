import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {FaCheck,FaTimes} from "react-icons/fa"

function DashUsers() {
  const [deleteModal, setDeleteModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [postIdForDelete, setPostIdForDelete] = useState(null);
  const [showMore, setShowMore] = useState(true);
  // const [updateId,setUpdateId] = useState(null);
  const navigateTo = useNavigate()

  const HandleUpdate = (id)=>{
    navigateTo(`/updatepost/${id}`)
  }
 
  const HandleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => {
          return [...prev, ...data.users];
        });
        if (data.users.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/user/getusers`);
      const data = await res.json();
      console.log(data.users);
      
      if (res.ok) {
        setUsers(data.users);
        // console.log(users``);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

//   const handleDeleteUser = async () => {
//     setDeleteModal(false);
//     try {
//       const res = await fetch(
//         `/api/user/delete/${postIdForDelete}/${currentUser._id}`
//       );
//       if (res.ok) {
//         setUsers((prev) => {
//           prev.filter((user) => {
//             return post._id !== postIdForDelete;
//           });
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 dark:500 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
      {currentUser.isAdmin && users && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => {
                console.log(user._id)
                return (
                  <Table.Body className="divide-y" key={user._id}>
                    <Table.Row>
                      <Table.Cell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell className="w-96">
                      
                          <img
                            src={user.profilePicture}
                            alt={user.title}
                            className="bg-gray-500 w-20 h-20 rounded-full object-cover "
                          />
                      </Table.Cell>
                      <Table.Cell className="font-semibold">
                        {user.username}
                      </Table.Cell>
                      <Table.Cell> { user.isAdmin ? <FaCheck className="text-green-500" />   : <FaTimes className="text-red-500"/>} </Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={() => {
                            setDeleteModal(true);
                            setPostIdForDelete(user._id);
                          }}
                          className="text-red-500"
                        >
                          Delete
                        </button>
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
                  Are you sure you want to delete this user?
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
                    gradientDuoTone={"purpleToBlue"}
                    className="ml-4"
                  >
                    Delete User
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <h3>You have no users!</h3>
      )}
    </div>
  );
}

export default DashUsers;
