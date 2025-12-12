import { visionPoints } from '@/constants'
import { motion } from 'framer-motion'
import React from 'react'

const Vision = () => {
    return (
        <section id="vision" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-primary font-medium text-sm uppercase tracking-wider">Product Vision</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                        Empowering Field Teams with <span className="text-gradient">Location Intelligence</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        We envision a world where every service business—from a 3-person landscaping crew to a 50-person pest control operation—operates with enterprise-grade coordination tools at startup-friendly prices.
                    </p>
                </motion.div>

                {/* Vision statement box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative max-w-4xl mx-auto mb-20 p-8 md:p-12 rounded-2xl border border-primary/40 backdrop-blur-sm"
                >
                    <div className="absolute -top-3 left-8 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                        Vision Statement
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium text-center leading-relaxed">
                        "To become the <span className="text-primary">indispensable coordination layer</span> for every mobile workforce, transforming chaotic field operations into synchronized, accountable, and highly efficient teams through intelligent geolocation technology."
                    </blockquote>
                </motion.div>

                {/* Vision pillars */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visionPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <point.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Vision