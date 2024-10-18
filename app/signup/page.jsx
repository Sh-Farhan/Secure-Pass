"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useRouter } from 'next/router'
import { useRouter } from 'next/navigation'
import { set } from 'mongoose'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"


const SignupPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })  
  const [error, setError] = useState('')

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!user.email || !user.username || !user.password) {
      setError('All fields are required')
      return
    }
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Succsess", response.data)
      router.push("/login")
    } catch (error) {
      console.log(error,error.message)
    }
  }

  return (
    <div>
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({...user,email: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              type="text" 
              placeholder="Choose a username"
              value={user.username}
              onChange={(e) => setUser({...user,username: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Create a password"
              value={user.password}
              onChange={(e) => setUser({...user,password: e.target.value})}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account? <a href="/login" className="text-primary hover:underline">Log in</a>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}

export default SignupPage
