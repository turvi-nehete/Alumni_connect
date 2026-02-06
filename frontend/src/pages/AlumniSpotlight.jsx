
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"


function AlumniSpotlight() {
    // Mock Data
    const spotlight = {
        name: "Aarav Patel",
        batch: "Class of 2018",
        company: "Senior Product Designer at Google",
        quote: "University gave me the foundation, but the alumni network gave me wings. Never underestimate the power of connection.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav&backgroundColor=c0aede",
        bio: "Aarav started as a graphic design intern and rapidly climbed the ladder to lead major design systems at top tech firms. He is passionate about mentorship and accessible design.",
        timeline: [
            { year: "2018", title: "Graduated B.Tech CS", company: "University", description: "Gold medalist, Lead of Design Club." },
            { year: "2019", title: "UI/UX Designer", company: "Zomato", description: "Redesigned the core ordering flow, increasing conversion by 15%." },
            { year: "2021", title: "Product Designer", company: "Microsoft", description: "Worked on Fluent Design system components." },
            { year: "2024", title: "Senior Product Designer", company: "Google", description: "Leading the Material Design accessibility team." },
        ],
        badges: [
            { id: 1, label: "10+ Years Experience", icon: "🚀" },
            { id: 2, label: "Mentored 50+ Students", icon: "🎓" },
            { id: 3, label: "3 Successful Startups", icon: "💡" },
            { id: 4, label: "Top Contributor 2025", icon: "🏆" },
        ]
    }

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-12">

            {/* SECTION A: HERO CARD */}
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-indigo)]/10 to-[var(--color-accent-purple)]/10 rounded-3xl blur-3xl -z-10"></div>
                <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-[var(--color-bg-card)]/80 to-[var(--color-bg-card)]/40 backdrop-blur-xl ring-1 ring-white/10">
                    <CardContent className="p-8 sm:p-12">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            {/* Image */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <img
                                    src={spotlight.image}
                                    alt={spotlight.name}
                                    className="relative h-48 w-48 sm:h-64 sm:w-64 rounded-full object-cover border-4 border-[var(--color-bg-card)] shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-2 right-2 bg-[var(--color-bg-card)] p-2 rounded-full shadow-lg text-2xl border border-[var(--color-border-soft)]">
                                    ✨
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-center md:text-left flex-1 space-y-4">
                                <div className="space-y-1">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-accent-indigo)] text-white uppercase tracking-wider mb-2">
                                        Featured Alumni
                                    </span>
                                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                                        {spotlight.name}
                                    </h1>
                                    <p className="text-lg font-medium text-[var(--color-accent-purple)]">
                                        {spotlight.company}
                                    </p>
                                    <p className="text-sm text-[var(--color-text-secondary)] font-medium">
                                        {spotlight.batch}
                                    </p>
                                </div>

                                <blockquote className="text-xl italic text-[var(--color-text-secondary)] border-l-4 border-[var(--color-accent-indigo)] pl-4 py-1 my-6 mx-auto md:mx-0 max-w-2xl bg-[var(--color-bg-main)]/50 rounded-r-lg">
                                    "{spotlight.quote}"
                                </blockquote>

                                <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                                    <Button size="lg" className="shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow">
                                        View Full Story
                                    </Button>
                                    <Button variant="outline" size="lg">
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* SECTION B: CAREER JOURNEY */}
            <section className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Career Journey</h2>
                    <p className="text-[var(--color-text-secondary)] mt-2">From campus to corporate leadership</p>
                </div>

                <div className="relative border-l-2 border-[var(--color-border-soft)] ml-4 md:ml-1/2 space-y-12">
                    {spotlight.timeline.map((item, index) => (
                        <div key={index} className="relative pl-8 md:pl-0">
                            {/* Dot */}
                            <div className="absolute -left-[9px] top-6 h-4 w-4 rounded-full bg-[var(--color-accent-indigo)] ring-4 ring-[var(--color-bg-main)]"></div>

                            <div className={`md:flex items-center justify-between gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Time (Phone: Hidden, Desktop: Shown on opposite side) */}
                                <div className="hidden md:block w-1/2 text-right pr-8">
                                    {index % 2 === 0 ? (
                                        <span className="text-5xl font-black text-[var(--color-border-soft)]/50">{item.year}</span>
                                    ) : (
                                        <div className="text-left pl-8">
                                            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                                            <p className="font-semibold text-[var(--color-accent-indigo)]">{item.company}</p>
                                            <p className="text-sm text-[var(--color-text-secondary)] mt-2">{item.description}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Content Card */}
                                <div className={`md:w-1/2 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                    {index % 2 === 0 ? (
                                        <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                                            <CardContent className="p-6">
                                                <span className="md:hidden text-2xl font-bold text-[var(--color-accent-indigo)] block mb-2">{item.year}</span>
                                                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                                                <p className="font-semibold text-[var(--color-accent-indigo)]">{item.company}</p>
                                                <p className="text-sm text-[var(--color-text-secondary)] mt-2">{item.description}</p>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 md:hidden">
                                            <CardContent className="p-6 text-left">
                                                <span className="md:hidden text-2xl font-bold text-[var(--color-accent-indigo)] block mb-2">{item.year}</span>
                                                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                                                <p className="font-semibold text-[var(--color-accent-indigo)]">{item.company}</p>
                                                <p className="text-sm text-[var(--color-text-secondary)] mt-2">{item.description}</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                    {/* Desktop Left Side Content for Odd Items */}
                                    <div className="hidden md:block text-right pr-8">
                                        {index % 2 !== 0 && (
                                            <span className="text-5xl font-black text-[var(--color-border-soft)]/50">{item.year}</span>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION C: MILESTONE BADGES */}
            <section>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Milestones & Achievements</h2>
                    <p className="text-[var(--color-text-secondary)] mt-2">Recognizing excellence and impact</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {spotlight.badges.map((badge) => (
                        <Card key={badge.id} className="group hover:border-[var(--color-accent-indigo)] transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                <div className="h-16 w-16 rounded-full bg-[var(--color-bg-main)] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300 ring-1 ring-[var(--color-border-soft)] group-hover:ring-[var(--color-accent-indigo)]">
                                    {badge.icon}
                                </div>
                                <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-indigo)] transition-colors">
                                    {badge.label}
                                </h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

        </div>
    )
}

export default AlumniSpotlight
