// 'use client'

// import React, { useState, useEffect, useCallback } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { useMediaQuery } from 'react-responsive'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Input } from '@/components/ui/input'
// import { Shield, Search, Bell, User, Settings, LogOut, Menu } from 'lucide-react'

// // Memoized component to prevent unnecessary re-renders
// const NavItems = React.memo(() => (
//   <>
//     <Link href="/dashboard" prefetch className="nav-link">Dashboard</Link>
//     <Link href="/passwords" prefetch className="nav-link">Passwords</Link>
//     <Link href="/generator" prefetch className="nav-link">Generator</Link>
//     <Link href="/security" prefetch className="nav-link">Security</Link>
//   </>
// ))

// export default function Navbar() {
//   const router = useRouter()
//   const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   // Memoized handler to avoid unnecessary re-renders
//   const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), [])

//   const logout = async() => {
//     try {
//       await axios.get("/api/users/logout")
//       router.push("/login")
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <nav className="bg-primary text-primary-foreground shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center">
//               <Shield className="h-8 w-8 mr-2" />
//               <span className="text-xl font-bold">Secure Pass</span>
//             </Link>
//             {!isMobile && (
//               <div className="ml-10 hidden md:block">
//                 <div className="flex items-baseline space-x-4">
//                   <NavItems />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Side Section */}
//           <div className="flex items-center">
//             <div className="relative mr-3">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-primary-foreground" />
//               </div>
//               <Input type="text" placeholder="Search" className="pl-10 bg-primary-foreground text-primary w-full md:w-auto" />
//             </div>

//             <Button variant="ghost" size="icon" className="mr-3">
//               <Bell className="h-5 w-5" />
//             </Button>

//             {/* User Dropdown Menu */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
//                 >
//                   <Avatar>
//                     <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
//                     <AvatarFallback>
//                       <User className="h-5 w-5" />
//                     </AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">John Doe</p>
//                     <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />

//                 {/* Profile Link wrapped around DropdownMenuItem */}
//                 <DropdownMenuItem asChild>
//                   <Link href="/profile" prefetch>
//                     <div className="flex items-center">
//                       <User className="mr-2 h-4 w-4" />
//                       <span>Profile</span>
//                     </div>
//                   </Link>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem asChild>
//                   <Link href="/settings">
//                     <div className="flex items-center">
//                       <Settings className="mr-2 h-4 w-4" />
//                       <span>Settings</span>
//                     </div>
//                   </Link>
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span onClick={logout}>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Mobile Menu Toggle */}
//             {isMobile && (
//               <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="ml-3">
//                 <Menu className="h-6 w-6" />
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMobile && mobileMenuOpen && (
//           <div className="md:hidden pb-3">
//             <div className="flex flex-col space-y-2">
//               <NavItems />
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Shield, Search, Bell, User, Settings, LogOut, Menu } from 'lucide-react'

// Memoized component to prevent unnecessary re-renders
const NavItems = React.memo(() => (
  <>
    <Link href="/dashboard" prefetch className="nav-link hover:text-secondary transition-colors duration-200">Dashboard</Link>
    <Link href="/passwords" prefetch className="nav-link hover:text-secondary transition-colors duration-200">Passwords</Link>
    <Link href="/generator" prefetch className="nav-link hover:text-secondary transition-colors duration-200">Generator</Link>
    <Link href="/security" prefetch className="nav-link hover:text-secondary transition-colors duration-200">Security</Link>
  </>
))

NavItems.displayName = 'NavItems';

export default function Navbar() {
  const router = useRouter()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Memoized handler to avoid unnecessary re-renders
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), [])

  const logout = async() => {
    try {
      await axios.get("/api/users/logout")
      router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
              <Shield className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">Secure Pass</span>
            </Link>
            {!isMobile && (
              <div className="ml-10 hidden md:block">
                <div className="flex items-baseline space-x-4">
                  <NavItems />
                </div>
              </div>
            )}
          </div>

          {/* Right Side Section */}
          <div className="flex items-center">
            <div className="relative mr-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <Input 
                type="text" 
                placeholder="Search" 
                className="pl-10 bg-primary-foreground text-primary w-full md:w-auto hover:bg-secondary/10 focus:bg-secondary/20 transition-colors duration-200" 
              />
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-3 hover:bg-secondary/10 transition-colors duration-200"
            >
              <Bell className="h-5 w-5" />
            </Button>

            {/* User Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white hover:bg-secondary/10 transition-colors duration-200"
                >
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Profile Link wrapped around DropdownMenuItem */}
                <DropdownMenuItem asChild>
                  <Link href="/profile" prefetch className="w-full hover:bg-secondary/10 transition-colors duration-200">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings" className="w-full hover:bg-secondary/10 transition-colors duration-200">
                    <div className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-secondary/10 transition-colors duration-200">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span onClick={logout}>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu} 
                className="ml-3 hover:bg-secondary/10 transition-colors duration-200"
              >
                <Menu className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden pb-3">
            <div className="flex flex-col space-y-2">
              <NavItems />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}