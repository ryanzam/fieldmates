import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { navLinks } from '../constants';
import { Button } from './ui/button';

const Nav = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg border-border/50" : ""
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-lg font-bold">Field <span className='text-primary-light'>Mates</span></span>
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 text-sm text-muted-foreground hover:text-primary-light transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Button variant="ghost" size="sm" className='cursor-pointer hover:text-primary'>Log In</Button>
                            <Button variant="default" size="sm" className='cursor-pointer hover:text-black'>Start Free</Button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-foreground"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border lg:hidden"
                    >
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="px-4 py-3 text-foreground hover:text-primary-light rounded-lg transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                                    <Button variant="outline" className="flex-1">Log In</Button>
                                    <Button variant="default" className="flex-1">Start Free</Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Nav