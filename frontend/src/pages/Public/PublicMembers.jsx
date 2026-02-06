import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Mock Data for Public Members
const MOCK_ALUMNI = [
    {
        id: 1,
        first_name: "Aarav",
        last_name: "Patel",
        role: "Alumni",
        company: "Google",
        skill_names: ["Python", "React", "Machine Learning", "Cloud", "APIs"]
    },
    {
        id: 2,
        first_name: "Sneha",
        last_name: "Gupta",
        role: "Alumni",
        company: "Microsoft",
        skill_names: ["Product Management", "Strategy", "UX", "Data Analytics"]
    },
    {
        id: 3,
        first_name: "Ishita",
        last_name: "Sharma",
        role: "Alumni",
        company: "J.P. Morgan",
        skill_names: ["Finance", "Risk Analysis", "Python", "SQL"]
    },
    {
        id: 4,
        first_name: "Vikram",
        last_name: "Singh",
        role: "Alumni",
        company: "TechFlow Solutions",
        skill_names: ["Entrepreneurship", "Full Stack", "Leadership", "Growth"]
    },
    {
        id: 5,
        first_name: "Priya",
        last_name: "Desai",
        role: "Alumni",
        company: "Amazon",
        skill_names: ["SDE", "AWS", "System Design", "Distributed Systems"]
    },
    {
        id: 6,
        first_name: "Rahul",
        last_name: "Kumar",
        role: "Alumni",
        company: "Goldman Sachs",
        skill_names: ["Quant", "C++", "Finance", "Trading Algorithms"]
    },
    {
        id: 7,
        first_name: "Anjali",
        last_name: "Nair",
        role: "Alumni",
        company: "Flipkart",
        skill_names: ["Backend", "Microservices", "Java", "Kafka"]
    },
    {
        id: 8,
        first_name: "Karan",
        last_name: "Malhotra",
        role: "Alumni",
        company: "McKinsey & Company",
        skill_names: ["Consulting", "Strategy", "Business Analytics", "Excel"]
    }
]

const MOCK_STUDENTS = [
    {
        id: 9,
        first_name: "Rohan",
        last_name: "Mehta",
        role: "Student",
        company: "Final Year, CSE",
        skill_names: ["Web Dev", "React", "Node.js", "Looking for SDE roles"]
    },
    {
        id: 10,
        first_name: "Ananya",
        last_name: "Roy",
        role: "Student",
        company: "3rd Year, Data Science",
        skill_names: ["ML", "Python", "TensorFlow", "Research"]
    },
    {
        id: 11,
        first_name: "Arjun",
        last_name: "Verma",
        role: "Student",
        company: "2nd Year, ECE",
        skill_names: ["IoT", "Embedded Systems", "C++", "Hardware"]
    },
    {
        id: 12,
        first_name: "Diya",
        last_name: "Kapoor",
        role: "Student",
        company: "Final Year, MBA",
        skill_names: ["Marketing", "Product", "Strategy", "Startup Enthusiast"]
    }
]

function PublicMembers() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("alumni")

    const handleConnect = () => {
        navigate('/login')
    }

    const filteredMembers = activeTab === "alumni" ? MOCK_ALUMNI : MOCK_STUDENTS

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* TABS */}
            <div className="flex justify-center">
                <div className="inline-flex rounded-full bg-[var(--color-bg-card)] p-1 border border-[var(--color-border-soft)]">
                    <button
                        onClick={() => setActiveTab("alumni")}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "alumni"
                            ? "bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white shadow-md"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                            }`}
                    >
                        Alumni
                    </button>
                    <button
                        onClick={() => setActiveTab("student")}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "student"
                            ? "bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white shadow-md"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                            }`}
                    >
                        Students
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {filteredMembers.map((member) => (
                    <div key={member.id} className="perspective h-[320px] sm:h-[340px]">

                        <div className="flip-card glow-card relative h-full w-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] shadow-md">

                            {/* FRONT SIDE */}
                            <div className="flip-front absolute inset-0 flex flex-col items-center justify-between rounded-2xl p-8">

                                {/* Big Avatar */}
                                <div className="mt-4 sm:mt-6 h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] p-1">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-bg-main)] text-3xl sm:text-4xl font-bold text-[var(--color-accent-indigo)]">
                                        {member.first_name.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                {/* Name Bottom with Subtle Glow */}
                                <p className="text-base sm:text-lg font-semibold tracking-wide text-[var(--color-text-primary)]">
                                    {member.first_name} {member.last_name}
                                </p>
                                <p className="text-sm text-[var(--color-text-secondary)]">{member.role}</p>

                            </div>

                            {/* BACK SIDE */}
                            <div className="flip-back absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[var(--color-bg-main)] p-4 sm:p-8 text-center">

                                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                                    {member.first_name} {member.last_name}
                                </h2>

                                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                                    {member.company}
                                </p>

                                {/* Skills */}
                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    {member.skill_names && member.skill_names.slice(0, 5).map((skill, idx) => (
                                        <span key={idx} className="rounded-full bg-[var(--color-accent-indigo)]/10 px-2 py-1 text-xs text-[var(--color-accent-indigo)]">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* ACTION BUTTON - Always visible, redirects to login */}
                                <div className="mt-auto mb-4 w-full">
                                    <button
                                        onClick={handleConnect}
                                        className="w-full rounded-full bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:scale-105"
                                    >
                                        Connect
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default PublicMembers

