import { plans } from '@/constants'
import { motion } from 'framer-motion'
import { Zap, Check } from 'lucide-react'
import { Button } from './ui/button'

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-primary font-medium text-sm uppercase tracking-wider">Pricing</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                        Simple, <span className="text-gradient">Transparent Pricing</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Start free, scale as you grow. No hidden fees, no long-term contracts.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-6 rounded-2xl border ${plan.popular
                                ? "border-primary shadow-lg shadow-primary/10"
                                : "border-primary-dark/70"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm">/{plan.period}</span>
                                </div>
                                <p className="text-sm text-white/50 mt-2">{plan.description}</p>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.popular ? "default" : "secondary"}
                                className={`w-full cursor-pointer ${plan.popular ? "" : "bg-primary-dark/50"}`}
                            >
                                {plan.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Pricing