import React, { useState, useRef, useEffect } from 'react';


function Header() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const trigger = useRef(null);
    const mobileNav = useRef(null);

    // close the mobile menu on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
        if (!mobileNav.current || !trigger.current) return;
        if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
        setMobileNavOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close the mobile menu if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
        if (!mobileNavOpen || keyCode !== 27) return;
        setMobileNavOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return(
        <header className="absolute w-full z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex item-center justify-between h-20">
                    <div className="shrink-0 mr-4">
                        {/* Logo */}

                    </div> 
                    <nav className="hidden md:flex md:grow">
                        <ul className="flex grow justify-end flex-wrap items-center">
                            <li>
                                <a className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out" href="#" >Sign in</a>
                            </li>
                            <li>
                                <a className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3" href="#">Sign up</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </header>
    );
}

export default Header;