'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Page = () => {
  const router = useRouter();
  const [user,setUser] = useState({email: "", password: ""});
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)

    if (!user.email || !user.password) {
      setError('Email and password are required')
      return
    }

    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login successfull")
      router.push("/profile")
    } catch (error) {
      console.log(error, error.message)
    }
  }

  return (
    <div>
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
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
              onChange={(e) => setUser({...user, email: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <a href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot your password?
        </a>
        <p className="text-sm text-muted-foreground">
          Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign up</a>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Page
