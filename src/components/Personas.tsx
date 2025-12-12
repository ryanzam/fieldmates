import { personas } from '@/constants'
import { motion } from 'framer-motion'
import React from 'react'

const Personas = () => {
    return (
        <section id="personas" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-background via-secondary/10 to-background" />

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-primary font-medium text-sm uppercase tracking-wider">User Personas</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                        Built for <span className="text-gradient">Real People</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Three distinct user types with unique needs—all addressed by our focused feature set.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {personas.map((persona, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="h-full p-6 rounded-2xl bg-primary-dark/50 hover:border-primary/30 transition-all duration-300">
                                {/* Header */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="text-5xl">{persona.avatar}</div>
                                    <div className="flex-1">
                                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-primary/30 text-primary mb-2">
                                            {persona.role}
                                        </span>
                                        <h3 className="text-lg font-bold">{persona.name}</h3>
                                        <p className="text-sm text-white/50">{persona.title}</p>
                                    </div>
                                </div>

                                {/* Demographics */}
                                <div className="flex gap-4 mb-6 p-3 rounded-lg bg-primary-dark/30">
                                    <div className="text-center">
                                        <div className="text-xs text-muted-foreground">Age</div>
                                        <div className="font-semibold">{persona.demographics.age}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-muted-foreground">Tech</div>
                                        <div className="font-semibold">{persona.demographics.tech}</div>
                                    </div>
                                    <div className="text-center flex-1">
                                        <div className="text-xs text-muted-foreground">Device</div>
                                        <div className="font-semibold text-sm">{persona.demographics.device}</div>
                                    </div>
                                </div>

                                {/* Goals */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-green-500 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        Goals
                                    </h4>
                                    <ul className="space-y-1">
                                        {persona.goals.map((goal, i) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <span className="text-primary mt-1">•</span>
                                                {goal}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Frustrations */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500" />
                                        Frustrations
                                    </h4>
                                    <ul className="space-y-1">
                                        {persona.frustrations.map((item, i) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <span className="text-destructive mt-1">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Quote */}
                                <blockquote className="p-4 rounded-lg bg-primary/5 border-l-2 border-primary italic text-sm">
                                    "{persona.quote}"
                                </blockquote>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Personas