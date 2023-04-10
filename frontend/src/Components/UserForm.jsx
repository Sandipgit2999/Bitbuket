import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios"
import UserList from "./UserList";
import { url } from "./Url";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    // e.g. send data to backend API
    let biodata = false;

    if (bio.length > 0) {
      biodata = true
    }

    axios.post(`${url}/users/`, { name, email, bio })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userId", res.data.userId)
        toast({
          title: "User created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setName("")
        setBio("")
        setEmail("")
      })
      .catch((err) => {
        console.log(err)
      })

  };

  return (
    <>
      <VStack w="100%" maxW="500px" mx="auto" my={8} spacing={6}>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder="Enter a short bio (optional)"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </FormControl>
          <Button type="submit">Create User</Button>
        </form>
      </VStack>

      <UserList />
    </>
  );
};

export default UserForm;
