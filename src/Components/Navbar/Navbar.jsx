"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import nav from './Navbar.module.css'
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaServicestack, FaBloggerB } from 'react-icons/fa'; // Importing icons
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
    const pathname = usePathname()
    const sessiion = useSession()
 
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div className='container mx-auto p-2'>

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
                        <li><Link className={`${pathname === '/mybooking' && 'text-red-500'}`} href={`/mybooking`}>Booking</Link></li>
                        <li><Link className={`${pathname === '/contact' && 'text-red-500'}`} href={`/contact`}>Contact</Link></li>
                    </ul>
                </div>
                <div className={nav.appointmentButton}>
                    {/* <button type='button' className='px-5 py-2 text-[#FF3811] border border-[#FF3811] font-semibold rounded-sm'>Appointment</button> */}
                    <p>{sessiion?.data?.user?.name}</p>
                    {
                        sessiion.data ?
                            <button onClick={() => signOut()} className='bg-red-500 px-5 py-2 rounded-md text-white' type="button">Logout</button>
                            :
                            <Link href={`/login`}>
                                <button className='bg-red-500 px-5 py-2 rounded-md text-white' type="button">login</button>
                            </Link>
                    }
                    <div className={nav.menuIcon} onClick={toggleMenu}>
                        {menuOpen ? <FaTimes /> : <FaBars />} {/* Hamburger icon */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;