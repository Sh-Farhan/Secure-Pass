'use client'
import React, { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Copy, RefreshCw } from 'lucide-react'
// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast"

const PasswordGenerator = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const { toast } = useToast()

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === '') {
      setPassword('Please select at least one character type')
      return
    }

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      newPassword += chars[randomIndex]
    }
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    if (password && password !== 'Please select at least one character type') {
      navigator.clipboard.writeText(password)
      toast({
        title: "Password Copied",
        description: "The generated password has been copied to your clipboard.",
      })
    } else {
      toast({
        title: "No Password to Copy",
        description: "Please generate a password first.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
        <CardDescription>Generate a secure password with custom options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Generated Password</Label>
          <div className="flex space-x-2">
            <Input id="password" value={password} readOnly className="flex-grow" />
            <Button onClick={copyToClipboard} size="icon" variant="outline">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy password</span>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Password Length: {length}</Label>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={8}
            max={32}
            step={1}
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Switch
              checked={includeUppercase}
              onCheckedChange={setIncludeUppercase}
              id="uppercase"
            />
            <span>Include Uppercase</span>
          </Label>
          <Label className="flex items-center space-x-2">
            <Switch
              checked={includeLowercase}
              onCheckedChange={setIncludeLowercase}
              id="lowercase"
            />
            <span>Include Lowercase</span>
          </Label>
          <Label className="flex items-center space-x-2">
            <Switch
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
              id="numbers"
            />
            <span>Include Numbers</span>
          </Label>
          <Label className="flex items-center space-x-2">
            <Switch
              checked={includeSymbols}
              onCheckedChange={setIncludeSymbols}
              id="symbols"
            />
            <span>Include Symbols</span>
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generatePassword} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" /> Generate Password
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PasswordGenerator