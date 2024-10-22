"use client"
import { Button } from "@/components/ui/button"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

import React, { useEffect, useRef } from 'react'
import { useState } from "react";
import { toggleVariants } from "./ui/toggle";
import { TableDemo } from "./PassTable";
import axios from "axios";

const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [myData,setMyData] = useState([]);
    const[toggle,setToggle] = useState(false)
    const { toast } = useToast()

    useEffect(()=>{
      // getData();
    },[])

    const inputSiteRef = useRef(null);
    const inputUserRef = useRef(null);
    const inputPassRef = useRef(null);
    const toggleRef = useRef(null)

    const togglePasswordVisibility = () => {
      setToggle((prevState) => !prevState);
      setShowPassword((prevState) => !prevState);
      console.log(inputPassRef.current.type)
    };

    const dateGenerator = () => {
      const now = new Date();
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const day = daysOfWeek[now.getDay()];
      const hours = now.getHours();
      const minutes = now.getMinutes()
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const formattedDate = `${now.getDate()}/${month}/${year}`; 

      return [day,formattedDate,hours,minutes]
    }

    const submitData = () => {
      if(inputSiteRef.current.value && inputUserRef.current.value && inputPassRef.current.value){
        let myNewData = {
          id: uuidv4(),
          site: inputSiteRef.current.value,
          username: inputUserRef.current.value,
          password: inputPassRef.current.value,
        }
        setMyData([...myData,myNewData])
        axios.post("https://pass-manager-next-js.vercel.app/api/users",myNewData);

        const getDetails = dateGenerator();
        toast({
          title: "Action: Password added",
          description: `${getDetails[0]}, ${getDetails[1]} at  ${getDetails[2]}:${getDetails[3]}`,
          action: (
            <ToastAction altText="Goto schedule to undo">Back</ToastAction>
          ),
        }
      )
        inputSiteRef.current.value = null
        inputUserRef.current.value = null
        inputPassRef.current.value = null
     }
        else alert("Enter all the details")

    }

    const handleDelete = async (id) => {
      let c = confirm("Do you really want to delete this password");
      if(c){
        let updatedData = myData.filter((item) => item.id !== id);
        // let deletedData = myData.filter((item) => item.id === id)[0];
        // let res = await fetch("https://pass-manager-next-js.vercel.app/api/users",{
        //   method: "DELETE",
        //   headers: {"Content-type": "application/json"},
        //   body: JSON.stringify({
        //     site: deletedData.site,
        //     username: deletedData.username,
        //     password: deletedData.password
        //   })
        // })
        // console.log(res)
        setMyData(updatedData)
      }
    }

  return (
    <div className="mt-5">
      <div className="container mt-10 mx-auto flex justify-center items-center">
        <Card className="md:w-full max-w-md bg-black shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground p-6">
            <CardTitle className="text-2xl font-bold">Add New Password</CardTitle>
            <CardDescription className="text-primary-foreground/80">Securely store your credentials</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site" className="text-sm font-medium">Site</Label>
              <Input
                ref={inputSiteRef}
                id="site"
                placeholder="Enter website name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <Input
                ref={inputUserRef}
                id="username"
                placeholder="Enter your username"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  ref={inputPassRef}
                  id="password"
                  type={toggle ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pr-10"
                />
                <button
                  ref={toggleRef}
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  type="button"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 px-6 py-4">
            <Button className="w-full" onClick={submitData}>
              Save Password
            </Button>
          </CardFooter>
        </Card>
      </div>
      <TableDemo data={myData} deleteHandler={handleDelete}></TableDemo>
    </div>
  )
}

export default Manager
