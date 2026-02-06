import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Heart, Target, TrendingUp } from 'lucide-react'

function PublicDonations() {
    const navigate = useNavigate()

    const handleInteraction = () => {
        navigate('/login')
    }

    // Mock Data
    const CAMPAIGNS = [
        { title: "Student Scholarship Fund 2024", goal: 500000, raised: 320000, donors: 124 },
        { title: "Campus Infrastructure Upgrade", goal: 2000000, raised: 850000, donors: 85 },
        { title: "Alumni Research Grant", goal: 300000, raised: 280000, donors: 92 },
    ]

    const RECENT_DONATIONS = [
        { user: "Anonymous Alumni", amount: "₹50,000", message: "Keep up the good work!", time: "2 hours ago" },
        { user: "Rajesh K.", amount: "₹10,000", message: "For the juniors.", time: "5 hours ago" },
        { user: "Priya S.", amount: "₹25,000", message: "Scholarship fund support.", time: "1 day ago" },
        { user: "Vikram E.", amount: "₹5,000", message: "Giving back.", time: "2 days ago" },
    ]

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Hero Section */}
            <section className="text-center py-12 rounded-3xl bg-[var(--color-bg-card)] border border-[var(--color-border-soft)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)]"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
                        Give Back to Your Alma Mater
                    </h1>
                    <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto mb-8">
                        Your contributions shape the future of students and help build a stronger infrastructure. Join hundreds of alumni in making a difference.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={handleInteraction}
                            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 shadow-lg shadow-rose-500/20"
                        >
                            <Heart className="mr-2 h-5 w-5 fill-current" />
                            Donate Now
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleInteraction}
                        >
                            View All Campaigns
                        </Button>
                    </div>
                </div>
            </section>

            <div className="grid gap-8 lg:grid-cols-3">

                {/* Main Stats */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                        <Target className="h-5 w-5 text-[var(--color-accent-indigo)]" />
                        Active Campaigns
                    </h2>

                    {CAMPAIGNS.map((camp, idx) => (
                        <Card key={idx} className="group cursor-pointer hover:border-[var(--color-accent-indigo)]/50 transition-all" onClick={handleInteraction}>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{camp.title}</h3>
                                        <p className="text-sm text-[var(--color-text-secondary)]">{camp.donors} alumni have contributed</p>
                                    </div>
                                    <span className="bg-emerald-500/10 text-emerald-600 font-bold px-3 py-1 rounded-full text-xs">
                                        Active
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo)]/10">
                                                Raised
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-[var(--color-accent-indigo)]">
                                                {Math.round((camp.raised / camp.goal) * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[var(--color-bg-main)] border border-[var(--color-border-soft)]">
                                        <div style={{ width: `${(camp.raised / camp.goal) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)]"></div>
                                    </div>
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-[var(--color-text-primary)]">₹{camp.raised.toLocaleString()}</span>
                                        <span className="text-[var(--color-text-secondary)]">Goal: ₹{camp.goal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Sidebar Feed */}
                <div className="space-y-6">
                    <Card className="h-full bg-[var(--color-bg-main)]/50 border-dashed">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <TrendingUp className="h-5 w-5 text-emerald-500" />
                                Recent Impact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {RECENT_DONATIONS.map((donation, i) => (
                                <div key={i} className="flex gap-3 items-start border-l-2 border-[var(--color-border-soft)] pl-3">
                                    <div>
                                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                                            {donation.user}
                                        </p>
                                        <p className="text-xs text-emerald-600 font-bold">
                                            Donated {donation.amount}
                                        </p>
                                        <p className="text-xs text-[var(--color-text-secondary)] mt-1 italic">
                                            "{donation.message}"
                                        </p>
                                        <p className="text-[10px] text-[var(--color-text-secondary)] mt-1 uppercase">
                                            {donation.time}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4 border-t border-[var(--color-border-soft)]">
                                <Button variant="ghost" className="w-full text-xs" onClick={handleInteraction}>
                                    View All Donations
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default PublicDonations
