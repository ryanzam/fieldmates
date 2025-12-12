import { Shield, Sparkles, Target, TrendingUp } from "lucide-react";

export const navLinks = [
    { href: "#vision", label: "Vision" },
    { href: "#market", label: "Market" },
    { href: "#personas", label: "Personas" },
    { href: "#features", label: "Features" },
    { href: "#design", label: "Design" },
    { href: "#architecture", label: "Architecture" },
    { href: "#pricing", label: "Pricing" },
];

export const visionPoints = [
    {
        icon: Target,
        title: "Precision Accountability",
        description: "Eliminate disputes with GPS-verified check-ins and automatic time tracking triggered by geofence boundaries."
    },
    {
        icon: TrendingUp,
        title: "Operational Visibility",
        description: "Real-time dashboard showing every team member's location, status, and task progress on a unified map interface."
    },
    {
        icon: Shield,
        title: "Fraud Prevention",
        description: "Location-locked actions ensure reports and photos can only be submitted from verified job sites."
    },
    {
        icon: Sparkles,
        title: "Effortless Simplicity",
        description: "Set up geofences in seconds with our intuitive map interface—no technical expertise required."
    }
];
