import { footerLinks } from '@/constants'
import { motion } from 'framer-motion'
import { MapPin, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xl font-bold">FieldMates</span>
                        </div>
                        <p className="text-sm text-white/50 mb-4 max-w-xs">
                            Real-time team coordination for field service businesses. Know where your team is, automate accountability.
                        </p>
                        <div className="flex gap-3">
                            {[Twitter, Linkedin, Github].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold mb-4">{category}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-xl bg-primary-dark/50 mb-12"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="font-semibold mb-1">Stay Updated</h4>
                            <p className="text-sm text-white/50">Get product updates and field service insights.</p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="flex-1 md:w-64 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-dark/20">
                                <Mail className="w-4 h-4 text-white/50" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 text-sm"
                                />
                            </div>
                            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
                    <p className="text-sm text-white/50">
                        © 2025 FieldMates. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer