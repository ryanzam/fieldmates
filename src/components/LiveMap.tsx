import { motion } from 'framer-motion'

const teamMembers = [
    { id: 1, name: "Alex", x: 25, y: 35, status: "active" },
    { id: 2, name: "Jordan", x: 60, y: 25, status: "transit" },
    { id: 3, name: "Sam", x: 45, y: 55, status: "active" },
    { id: 4, name: "Casey", x: 75, y: 65, status: "transit" },
    { id: 5, name: "Riley", x: 30, y: 70, status: "active" },
];

const geofences = [
    { id: 1, x: 20, y: 30, size: 80 },
    { id: 2, x: 55, y: 50, size: 100 },
    { id: 3, x: 70, y: 60, size: 70 },
];

const LiveMap = () => {
    return (
        <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] bg-grid-pattern rounded-2xl overflow-hidden">
            {/* Map gradient overlay */}
            <div
                className="absolute inset-0 opacity-60"
                style={{ background: "var(--gradient-map)" }}
            />

            {/* Animated grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[...Array(5)].map((_, i) => (
                    <motion.line
                        key={`h-${i}`}
                        x1="0"
                        y1={`${20 + i * 15}%`}
                        x2="100%"
                        y2={`${20 + i * 15}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                    />
                ))}
            </svg>

            {/* Geofence zones */}
            {geofences.map((zone, index) => (
                <motion.div
                    key={zone.id}
                    className="absolute rounded-full border-2 border-dashed"
                    style={{
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: zone.size,
                        height: zone.size,
                        transform: "translate(-50%, -50%)",
                        borderColor: "hsl(var(--primary) / 0.5)",
                        backgroundColor: "hsl(var(--primary) / 0.05)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                >
                    {/* Pulse effect */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-primary/30"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                </motion.div>
            ))}

            {/* Team member dots */}
            {teamMembers.map((member, index) => (
                <motion.div
                    key={member.id}
                    className="absolute"
                    style={{
                        left: `${member.x}%`,
                        top: `${member.y}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                >
                    {/* Ping effect */}
                    <motion.div
                        className={`absolute w-6 h-6 rounded-full ${member.status === "active" ? "bg-green-500" : "bg-amber-500"
                            }`}
                        style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />

                    {/* Main dot */}
                    <motion.div
                        className={`relative w-4 h-4 rounded-full shadow-lg ${member.status === "active" ? "bg-green-500" : "bg-amber-500"
                            }`}
                        animate={member.status === "transit" ? {
                            x: [0, 5, -3, 0],
                            y: [0, -3, 2, 0]
                        } : {}}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        {/* Inner glow */}
                        <div className="absolute inset-1 rounded-full bg-foreground/50" />
                    </motion.div>

                    {/* Name label */}
                    <motion.div
                        className="absolute top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-card/90 backdrop-blur-sm rounded text-xs font-medium whitespace-nowrap border border-border/50"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                    >
                        {member.name}
                    </motion.div>
                </motion.div>
            ))}

            {/* Connection lines between nearby workers */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                    d="M 25% 35% Q 35% 45% 45% 55%"
                    fill="none"
                    stroke="hsl(var(--primary) / 0.2)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    className="animate-dash"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 2 }}
                />
            </svg>

            {/* Legend */}
            <motion.div
                className="absolute bottom-4 left-4 flex gap-4 px-3 py-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-muted-foreground">On-Site</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-xs text-muted-foreground">En Route</span>
                </div>
            </motion.div>

            {/* Live indicator */}
            <motion.div
                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-card/80 backdrop-blur-sm rounded-full border border-border/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 }}
            >
                <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs font-medium">LIVE</span>
            </motion.div>
        </div>
    )
}

export default LiveMap