import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from "./Url";



const UserList = ({ users, onDeleteUser, onUpdateUser }) => {

  

  const [usersdata, setusersData] = useState([])
  console.log("userdata", usersdata)
  const [deleteUser, setDeleteUser] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const onCloseDeleteAlert = () => {
    setShowDeleteAlert(false);
  };

  const onDeleteConfirm = () => {
    onDeleteUser(deleteUser);
    setShowDeleteAlert(false);
  };

  const userId = localStorage.getItem("userId");
  console.log(userId)



  const getUsers = () => {
    axios.get(`${url}/analytics/users/`)
      .then((res) => {
        console.log(res.data);
        setusersData(res.data.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    getUsers()
  }, [])

  return (




   

    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Bio</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {usersdata.length > 0 && usersdata.map((user) => (
          <Tr key={user._id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.bio || "-"}</Td>

            {/* {
              userId == user.id && <Td>
                <Button
                  onClick={() => {
                    setEditUser(user);
                  }}
                  mr={2}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setDeleteUser(user);
                    setShowDeleteAlert(true);
                  }}
                >
                  Delete
                </Button>
              </Td>
            } */}

            <Link to='/posts'>
              <Button
                colorScheme="red"
              onClick={() => {
                console.log("Hiii")
                // setDeleteUser(user);
                // setShowDeleteAlert(true);
                localStorage.setItem("userId", user._id)
              }}
              >
                Go to Profile
              </Button>
            </Link>



          </Tr>
        ))}
      </Tbody>
      <AlertDialog
        isOpen={showDeleteAlert}
        leastDestructiveRef={null}
        onClose={onCloseDeleteAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {deleteUser && deleteUser.name}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onCloseDeleteAlert}>Cancel</Button>
              <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Table>
  );
};

export default UserList;

