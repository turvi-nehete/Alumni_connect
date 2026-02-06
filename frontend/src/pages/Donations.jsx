import { useState, useEffect } from "react"
import { Button } from "../components/ui/Button.jsx"
import { Card, CardContent } from "../components/ui/Card.jsx"
import { Input } from "../components/ui/Input.jsx"
import api from "../services/api"

function Donations() {
  const [activeTab, setActiveTab] = useState("donate")
  const [amount, setAmount] = useState(1000)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [stats, setStats] = useState({ total_collected: 0, total_donations: 0 })
  const [myDonations, setMyDonations] = useState([])
  const [recentDonations, setRecentDonations] = useState([]) // For now mocks or empty if API doesn't support

  // Fetch data on mount
  useEffect(() => {
    fetchStats()
    fetchMyDonations()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await api.get("/donations/stats/")
      setStats(res.data)
    } catch (err) {
      console.error("Failed to fetch stats", err)
    }
  }

  const fetchMyDonations = async () => {
    try {
      const res = await api.get("/donations/mine/")
      setMyDonations(res.data)
    } catch (err) {
      console.error("Failed to fetch my donations", err)
    }
  }

  const handleDonate = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await api.post("/donations/", {
        amount: amount,
        is_anonymous: isAnonymous
      })
      alert("Thank you for your donation!") // Simple feedback for now
      // Refresh data
      fetchStats()
      fetchMyDonations()
      setActiveTab("my-donations") // Switch tab to see it
    } catch (err) {
      console.error("Donation failed", err)
      alert("Failed to process donation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 min-h-[80vh]">

      {/* Header / Stats Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-6 py-10 sm:px-10 text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            ₹ {stats.total_collected?.toLocaleString('en-IN') || 0}
          </h1>
          <p className="mt-2 text-lg font-medium text-white/80">
            Total Fund Raised from {stats.total_donations || 0} contributions
          </p>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-40 w-40 rounded-full bg-black/10 blur-2xl pointer-events-none" />
      </section>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border-soft)] space-x-6 overflow-x-auto">
        {["donate", "my-donations", "stats"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold capitalize transition-colors relative whitespace-nowrap
                    ${activeTab === tab
                ? "text-[var(--color-accent-purple)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
          >
            {tab.replace("-", " ")}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-accent-purple)] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="pt-2">
        {activeTab === "donate" && (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Create Donation Form */}
            <Card className="border-[var(--color-accent-purple)]/30 shadow-lg shadow-indigo-500/10">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Select Amount</h2>
                  <p className="text-sm text-[var(--color-text-secondary)]">Choose how much you want to contribute</p>
                </div>

                {/* Amount Display */}
                <div className="text-center py-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[var(--color-accent-purple)]">
                    ₹ {amount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Range Slider */}
                <div className="space-y-4">
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="100"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-[var(--color-bg-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent-purple)] hover:accent-[var(--color-accent-indigo)] transition-all"
                  />
                  <div className="flex justify-between text-xs font-semibold text-[var(--color-text-secondary)]">
                    <span>₹100</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                {/* Preset Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[500, 1000, 5000, 10000].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all border
                                        ${amount === val
                          ? "bg-[var(--color-accent-purple)] text-white border-[var(--color-accent-purple)] shadow-md"
                          : "bg-[var(--color-bg-main)] text-[var(--color-text-secondary)] border-[var(--color-border-soft)] hover:border-[var(--color-accent-purple)]"
                        }`}
                    >
                      ₹{val / 1000}k
                    </button>
                  ))}
                </div>

                {/* Custom Input */}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase mb-1 block">Custom Amount</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="font-mono text-lg"
                  />
                </div>

                {/* Anonymous Toggle */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--color-accent-purple)] focus:ring-[var(--color-accent-purple)]"
                  />
                  <label htmlFor="anonymous" className="text-sm font-medium text-[var(--color-text-primary)] cursor-pointer">
                    Make this donation anonymous
                  </label>
                </div>

                <Button onClick={handleDonate} disabled={isSubmitting} size="lg" className="w-full text-lg shadow-xl shadow-indigo-500/20">
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </Button>
              </CardContent>
            </Card>

            {/* Information Side */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-subtle)]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Why Donate?</h3>
                  <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                    <li className="flex gap-2">
                      <span className="text-[var(--color-accent-purple)] font-bold">✓</span>
                      Support student scholarships and financial aid.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--color-accent-purple)] font-bold">✓</span>
                      Fund new research labs and infrastructure.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--color-accent-purple)] font-bold">✓</span>
                      Sponsor tech fests, hackathons, and global events.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "my-donations" && (
          <div className="space-y-4">
            {myDonations.length === 0 ? (
              <div className="text-center py-12 text-[var(--color-text-secondary)]">
                <p>You haven't made any donations yet.</p>
                <button onClick={() => setActiveTab('donate')} className="text-[var(--color-accent-purple)] font-bold hover:underline mt-2">Make your first donation</button>
              </div>
            ) : (
              <div className="grid gap-4">
                {myDonations.map((donation) => (
                  <Card key={donation.id} className="hover:border-[var(--color-accent-purple)]/30 transition-colors">
                    <CardContent className="p-4 sm:p-5 flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold text-[var(--color-text-primary)]">₹ {Number(donation.amount).toLocaleString('en-IN')}</p>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                          {new Date(donation.created_at).toLocaleDateString(undefined, {
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${donation.is_anonymous ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                          {donation.is_anonymous ? "Anonymous" : "Public"}
                        </span>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">ID: #{donation.id}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="grid sm:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">₹ {stats.total_collected?.toLocaleString('en-IN')}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Total Funds Raised</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{stats.total_donations}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Total Contributions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Top 1%</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Your Impact Rank</p>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  )
}

export default Donations
