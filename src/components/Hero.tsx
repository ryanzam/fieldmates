import { motion } from "framer-motion"
import { MapPin, Users, Zap } from "lucide-react"
import { Button } from "./ui/button"
import LiveMap from "./LiveMap"

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background effects */}
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

            <div className="container relative z-10 mx-auto px-4 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                        >
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Micro SaaS for Field Teams</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            <span className="text-gradient">FieldMates</span>{" "}
                            <span className="text-foreground">Your Field Team Coordination</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                            Real-time GPS tracking, automated task triggers, and accountability tools for landscaping, pest control, and mobile sales teams.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                            {[
                                { icon: Users, label: "5-50 Person Teams", value: "Optimized" },
                                { icon: MapPin, label: "Geofence Accuracy", value: "10-50m" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <stat.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-semibold">{stat.value}</div>
                                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button variant="default" size="lg">
                                Start Free Trial
                            </Button>
                            <Button variant="secondary" size="lg">
                                View Product Guide
                            </Button>
                        </motion.div>

                        {/* Trust indicator */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-6 text-sm text-muted-foreground"
                        >
                            Free for up to 3 users • No credit card required
                        </motion.p>
                    </motion.div>

                    {/* Map Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 rounded-3xl blur-2xl" />
                        <LiveMap />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero