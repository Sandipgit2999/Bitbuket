import React from 'react'
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
import { url } from './Url';

const PostForm = () => {

  const [content, setContent] = useState("")




  const userId = localStorage.getItem("userId");
  console.log(userId)


  const handleSubmit = (event) => {
    event.preventDefault();


    axios.post(`${url}/posts`, { userId, content })
      .then((res) => {
        console.log(res.data);

        // toast({
        //   title: "post created.",
        //   status: "success",
        //   duration: 5000,
        //   isClosable: true,
        // });
        setContent("")
      })
      .catch((err) => {
        console.log(err)
      })

  };
  return (
    <VStack w="100%" maxW="500px" mx="auto" my={8} spacing={6}>
      <form onSubmit={handleSubmit}>

        <FormControl id="content">
          <FormLabel>Post</FormLabel>
          <Textarea
            placeholder="enter a content you want to share"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </FormControl>
        <Button type="submit">Create Post</Button>
      </form>
    </VStack>
  )
}

export default PostForm
