import { BarChart3, Briefcase, Calculator, Clock, DollarSign, MapPin, Shield, Smartphone, Sparkles, Target, TrendingUp, Wrench } from "lucide-react";

export const navLinks = [
    { href: "#vision", label: "Vision" },
    { href: "#personas", label: "Personas" },
    /* { href: "#features", label: "Features" },
    { href: "#design", label: "Design" },
    { href: "#architecture", label: "Architecture" }, */
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

export const personas = [
    {
        role: "Team Manager",
        name: "John D.",
        title: "Owner, John Landscaping (5 employees)",
        avatar: "👨‍💼",
        color: "primary",
        demographics: {
            age: "42",
            tech: "Moderate",
            device: "iPhone 13"
        },
        goals: [
            "Know where crew is without constant calls",
            "Verify job completion for billing disputes",
            "Reduce time spent on scheduling coordination"
        ],
        frustrations: [
            "Lost 2 hours/day to phone-based coordination",
            "Client complained crew was late—no proof otherwise",
            "Payroll disputes over arrival times"
        ],
        quote: "I just need to know my guys are where they say they are, without micromanaging them.",
        icon: Briefcase
    },
    {
        role: "Field Worker",
        name: "Harri T.",
        title: "Senior Technician, Pest Control Pros",
        avatar: "👷",
        color: "status-active",
        demographics: {
            age: "28",
            tech: "High",
            device: "Samsung Galaxy"
        },
        goals: [
            "Automatic time logging (no manual entry)",
            "Clear task assignments with addresses",
            "Easy photo documentation for proof"
        ],
        frustrations: [
            "Forgetting to clock in/out costs money",
            "Boss calls constantly asking for location",
            "Previous app drained phone battery"
        ],
        quote: "If it works in the background and doesn't kill my battery, I'll use it.",
        icon: Wrench
    },
    {
        role: "Office Admin",
        name: "Sara C.",
        title: "Supervisor, CleanRight Services",
        avatar: "👩‍💻",
        color: "status-transit",
        demographics: {
            age: "35",
            tech: "High",
            device: "Desktop + iPad"
        },
        goals: [
            "Real-time visibility without calling field",
            "Export reports for payroll processing",
            "Quick re-assignment when issues arise"
        ],
        frustrations: [
            "Reconciling timesheets takes 3 hours weekly",
            "No central view of team status",
            "Current tool too complex for simple needs"
        ],
        quote: "I need a dashboard I can glance at and instantly know what's happening.",
        icon: Calculator
    }
];

export const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for trying out GeoFence with a small team",
        features: [
            "Up to 3 users",
            "5 geofences",
            "Basic real-time map",
            "Manual check-in/out",
            "7-day location history",
            "Email support"
        ],
        cta: "Start Free",
        popular: false
    },
    {
        name: "Pro",
        price: "$9",
        period: "per user/month",
        description: "Full-featured for growing service businesses",
        features: [
            "Unlimited users",
            "Unlimited geofences",
            "Auto check-in/out triggers",
            "Live tracking (10s updates)",
            "Photo verification",
            "90-day history",
            "Export reports",
            "Priority support"
        ],
        cta: "Start 14-Day Trial",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "contact us",
        description: "For large teams with advanced needs",
        features: [
            "Everything in Pro",
            "SSO / SAML",
            "API access",
            "Custom integrations",
            "Dedicated account manager",
            "SLA guarantee",
            "On-premise option",
            "Custom training"
        ],
        cta: "Contact Sales",
        popular: false
    }
];

export const footerLinks = {
    Product: ["Features", "Pricing", "Roadmap", "Changelog"],
    Resources: ["Documentation", "API Reference", "Blog", "Case Studies"],
    Company: ["About", "Careers", "Contact", "Partners"],
    Legal: ["Privacy Policy", "Terms of Service", "GDPR", "Security"]
};
