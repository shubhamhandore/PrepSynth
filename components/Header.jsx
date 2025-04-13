import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard, FileText, GraduationCap, ChevronDown, StarsIcon } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default async function Header() {
  return (
    <header className="fixed top-0 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur-md z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logo-dark.png"}
            alt="CareerAI Logo"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-gray-800 border border-gray-700"
              >
                <DropdownMenuItem asChild className="hover:bg-gray-700">
                  <Link href="/resume" className="flex items-center gap-2 text-gray-300">
                    <FileText className="h-4 w-4" />
                    Resume Builder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-gray-700">
                  <Link href="/interview" className="flex items-center gap-2 text-gray-300">
                    <GraduationCap className="h-4 w-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                  userButtonPopoverCard: "bg-gray-800 border border-gray-700",
                  userPreviewMainIdentifier: "text-white",
                  userButtonPopoverActionButtonText: "text-gray-300",
                }
              }}
            />
          </SignedIn>

          <SignedOut>
            <div className="flex gap-2">
              <SignInButton mode="modal">
                <Button variant="outline" className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}