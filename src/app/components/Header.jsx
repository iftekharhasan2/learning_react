import { headers } from 'next/headers'
import React from 'react'
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';


const Header = () => {
  return (
    <header className={` flex items-center justify-between p-4 ${styles.myHeader} text-white`}>
      <div className="flex items-center space-x-4">

        <Link href="/about" className="flex items-center justify-between">
          <h1 className="text-xl font-bold">My Website</h1>
        </Link>
         
        
            <Link href="/">
              <Image
                src="/banner2.jpeg"
                alt="Logo"
                width={70}
                height={70}
              />
            </Link>

      </div>
     
      <nav>
        <ul className="flex justify-between space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header