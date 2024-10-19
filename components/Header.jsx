import React from 'react'
import Link from 'next/link'
import { Shield, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-primary-foreground text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <Shield className="h-24 w-24 md:h-32 md:w-32 text-white" />
            <Lock className="h-12 w-12 md:h-16 md:w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Secure Pass
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your Fortress for Digital Credentials
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header