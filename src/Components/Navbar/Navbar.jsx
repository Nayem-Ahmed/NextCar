"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import nav from './Navbar.module.css'
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaServicestack, FaBloggerB } from 'react-icons/fa'; // Importing icons
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
    const pathname = usePathname()
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div className={nav.navbar}>
            <div>
                <Link href={`/`}>
                    <Image
                        src="/assets/logo.svg"
                        width={60}
                        height={60}
                        alt="Picture of the author"
                    />
                </Link>
            </div>
            <div className={`${nav.navlink} ${menuOpen ? nav.showMenu : ''}`}>
                <ul>
                    <li><Link className={`${pathname === '/' && 'text-red-500'}`} href={`/`}>Home</Link></li>
                    <li><Link className={`${pathname === '/about' && 'text-red-500'}`} href={`/about`}>About</Link></li>
                    <li><Link className={`${pathname === '/services' && 'text-red-500'}`} href={`/services`}>Services</Link></li>
                    <li><Link className={`${pathname === '/blog' && 'text-red-500'}`} href={`/blog`}>Blog</Link></li>
                    <li><Link className={`${pathname === '/contact' && 'text-red-500'}`} href={`/contact`}>Contact</Link></li>
                </ul>
            </div>
            <div className={nav.appointmentButton}>
                <button type='button' className='px-5 py-2 text-[#FF3811] border border-[#FF3811] font-semibold rounded-sm'>Appointment</button>
                <div className={nav.menuIcon} onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />} {/* Hamburger icon */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;