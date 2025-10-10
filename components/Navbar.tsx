import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { SearchBar } from './SearchBar'
import { NavbarAuth } from './NavbarAuth'

const Navbar = () => {
  return (
    <header className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
         <Link href="/">
          <span className="navbar-logo text-2xl font-bold text-primary-500 cursor-pointer hover:text-primary-700">
            PCMag
          </span>
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="navbar-center">
        <SearchBar />
      </div>

      {/* Boutons auth / user */}
      <div className="navbar-auth">
        <NavbarAuth />
      </div>
    </header>
  )
}

export default Navbar
