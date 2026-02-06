import { useState } from "react"

const MOCK_ONLINE_USERS = [
  { id: 1, name: "Riya Shah", status: "online" },
  { id: 2, name: "Kabir Patel", status: "online" },
  { id: 3, name: "Neha Jain", status: "away" },
  { id: 4, name: "Aarav Mehta", status: "online" },
]

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    name: "Riya Shah",
    lastMessage: "Thanks for the referral!",
    time: "2m ago",
    unread: 2,
    isTyping: false,
  },
  {
    id: 2,
    name: "Kabir Patel",
    lastMessage: "See you at the event!",
    time: "1h ago",
    unread: 0,
    isTyping: true,
  },
  {
    id: 3,
    name: "Neha Jain",
    lastMessage: "Let's connect soon",
    time: "3h ago",
    unread: 1,
    isTyping: false,
  },
  {
    id: 4,
    name: "Aarav Mehta",
    lastMessage: "Great to meet you!",
    time: "1d ago",
    unread: 0,
    isTyping: false,
  },
]

function Messaging() {
  const [selectedConversation, setSelectedConversation] = useState(1)

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 min-h-[calc(100vh-200px)]">
      
      {/* ONLINE USERS SIDEBAR */}
      <div className="lg:col-span-2 order-3 lg:order-1">
        <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-4 sm:p-5 shadow-md">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[var(--color-text-primary)]">
            Online Now
          </h2>
          <div className="mt-4 space-y-3">
            {MOCK_ONLINE_USERS.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-sm font-bold text-white">
                    {user.name.charAt(0)}
                  </div>
                  {user.status === "online" && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--color-bg-card)] bg-emerald-400" />
                  )}
                  {user.status === "away" && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--color-bg-card)] bg-yellow-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                    {user.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {user.status === "online" ? "Active" : "Away"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONVERSATIONS LIST */}
      <div className="lg:col-span-4 order-1 lg:order-2">
        <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-4 sm:p-5 shadow-md">
          <h2 className="text-base sm:text-lg font-bold tracking-wide text-[var(--color-text-primary)]">
            Recent Conversations
          </h2>
          <div className="mt-4 space-y-2">
            {MOCK_CONVERSATIONS.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`group cursor-pointer rounded-xl border p-4 transition-all duration-300
                ${selectedConversation === conv.id
                  ? "border-[var(--color-accent-purple)] bg-[var(--color-bg-main)] shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                  : "border-[var(--color-border-soft)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent-indigo)]/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-sm font-bold text-white">
                      {conv.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-[var(--color-text-primary)]">
                          {conv.name}
                        </p>
                        {conv.unread > 0 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-purple)] text-xs font-bold text-white">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        {conv.isTyping ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium italic text-[var(--color-accent-purple)]">
                              Typing
                            </span>
                            <div className="flex gap-1">
                              <div className="h-1 w-1 animate-pulse rounded-full bg-[var(--color-accent-purple)]" />
                              <div className="h-1 w-1 animate-pulse rounded-full bg-[var(--color-accent-purple)] delay-75" />
                              <div className="h-1 w-1 animate-pulse rounded-full bg-[var(--color-accent-purple)] delay-150" />
                            </div>
                          </div>
                        ) : (
                          <p className="truncate text-xs text-[var(--color-text-secondary)]">
                            {conv.lastMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                  {conv.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MESSAGE PREVIEW CONTAINER */}
      <div className="lg:col-span-6 order-2 lg:order-3">
        <div className="min-h-[400px] lg:h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-4 sm:p-6 shadow-md flex flex-col">
          <div className="flex items-center gap-3 border-b border-[var(--color-border-soft)] pb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-sm font-bold text-white">
              {MOCK_CONVERSATIONS.find(c => c.id === selectedConversation)?.name.charAt(0) || "R"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[var(--color-text-primary)]">
                {MOCK_CONVERSATIONS.find(c => c.id === selectedConversation)?.name || "Riya Shah"}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {MOCK_CONVERSATIONS.find(c => c.id === selectedConversation)?.isTyping ? "Typing..." : "Active now"}
              </p>
            </div>
          </div>

          {/* MESSAGE AREA */}
          <div className="flex-1 mt-6 space-y-4 overflow-y-auto">
            {[
              { sender: "them", text: "Hey! Thanks for connecting.", time: "2:30 PM" },
              { sender: "me", text: "No problem! Happy to help.", time: "2:32 PM" },
              { sender: "them", text: "Thanks for the referral!", time: "2:35 PM" },
            ].map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.sender === "me"
                    ? "bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white"
                    : "bg-[var(--color-bg-main)] text-[var(--color-text-primary)]"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`mt-1 text-xs ${msg.sender === "me" ? "text-white/70" : "text-[var(--color-text-secondary)]"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TYPING INDICATOR UI */}
          {MOCK_CONVERSATIONS.find(c => c.id === selectedConversation)?.isTyping && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--color-bg-main)] p-3">
              <div className="flex gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent-purple)]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent-purple)] delay-75" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-accent-purple)] delay-150" />
              </div>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                {MOCK_CONVERSATIONS.find(c => c.id === selectedConversation)?.name} is typing...
              </span>
            </div>
          )}

          {/* INPUT AREA */}
          <div className="mt-4 flex gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-main)] px-3 sm:px-4 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-accent-purple)] focus:outline-none"
            />
            <button className="rounded-xl bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] px-4 sm:px-6 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] transition hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] flex-shrink-0">
              Send
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Messaging
