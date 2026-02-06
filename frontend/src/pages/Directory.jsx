import { useState } from "react"
import { Button } from "../components/ui/Button.jsx"
import { Input } from "../components/ui/Input.jsx"
import { Card, CardContent } from "../components/ui/Card.jsx"

const MOCK_ALUMNI = [
  { id: 1, name: "Riya Shah", batch: "2018", department: "Computer Science", company: "Tech Corp", role: "Frontend Developer", location: "Mumbai" },
  { id: 2, name: "Kabir Patel", batch: "2019", department: "Information Tech", company: "StartupXYZ", role: "Product Manager", location: "Bangalore" },
  { id: 3, name: "Neha Jain", batch: "2020", department: "Electronics", company: "InnoSoft", role: "IoT Engineer", location: "Pune" },
  { id: 4, name: "Aarav Mehta", batch: "2017", department: "Computer Science", company: "BigTech", role: "Senior Engineer", location: "USA" },
  { id: 5, name: "Sanya Sharma", batch: "2021", department: "Mechanical", company: "AutoMotive", role: "Design Engineer", location: "Germany" },
  { id: 6, name: "Vikram Singh", batch: "2016", department: "Civil", company: "ConstructCo", role: "Project Manager", location: "Delhi" },
]

function Directory() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAlumni = MOCK_ALUMNI.filter(alumni =>
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Alumni Directory
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Connect with {MOCK_ALUMNI.length} alumni from around the world.
          </p>
        </div>
        <div className="w-full sm:w-auto sm:min-w-[300px]">
          <Input
            placeholder="Search by name, company, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* DIRECTORY GRID */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAlumni.map((alumni) => (
          <Card key={alumni.id} className="group hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-md">
                  {alumni.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] truncate">
                    {alumni.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] truncate">
                    {alumni.role} at <span className="text-[var(--color-text-primary)] font-medium">{alumni.company}</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)]">
                    <span className="bg-[var(--color-bg-main)] px-2 py-1 rounded-md border border-[var(--color-border-soft)]">
                      {alumni.batch}
                    </span>
                    <span className="bg-[var(--color-bg-main)] px-2 py-1 rounded-md border border-[var(--color-border-soft)]">
                      {alumni.department}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button className="flex-1 shadow-md shadow-indigo-500/10">Connect</Button>
                <Button variant="outline" className="flex-1">Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlumni.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-[var(--color-text-secondary)]">No alumni found matching your search.</p>
        </div>
      )}
    </div>
  )
}

export default Directory

