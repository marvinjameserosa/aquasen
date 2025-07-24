"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-1/2 -translate-x-1/2 w-full z-50 px-4 lg:px-6 h-16 bg-black/5 backdrop-blur">
        <div className="flex items-center justify-between h-full">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="#docs"
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Docs
            </Link>
          </nav>

          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Aquasen Logo"
                width={64}
                height={64}
                className="w-8 h-8"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-blue-400 transition-colors"
            >
              Login
            </Link>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              Get Started
            </Button>
          </nav>

          {/* Mobile Navigation  */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm md:hidden">
          <div className="fixed top-16 left-0 right-0 bg-black/90 backdrop-blur border-t border-gray-800">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#docs"
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Docs
              </Link>
              <hr className="border-gray-700" />
              <Link
                href="/login"
                className="text-sm font-medium hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Button
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
