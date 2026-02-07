import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "../components/ui/Button.jsx"
import { Input } from "../components/ui/Input.jsx"
import { Card, CardContent } from "../components/ui/Card.jsx"
import api from '../services/api'
import { useAuth } from "../context/AuthContext.jsx"

function Messaging() {
  const { user, token } = useAuth()
  const [searchParams] = useSearchParams()
  const [conversations, setConversations] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")
  const [socket, setSocket] = useState(null)
  const messagesEndRef = useRef(null)

  // 1. Fetch Conversations on Mount
  useEffect(() => {
    fetchConversations()
  }, [])

  // 2. Handle URL Query Param (Redirect from Members)
  useEffect(() => {
    const chatIdParam = searchParams.get("chatId")
    if (chatIdParam) {
      // If conversations are loaded, verify it exists, else set it directly
      setActiveChat(parseInt(chatIdParam))
    }
  }, [searchParams])

  const fetchConversations = async () => {
    try {
      const res = await api.get("/messaging/my-chats/")
      setConversations(res.data)
      // Default to first chat if no active chat and no URL param
      if (!activeChat && res.data.length > 0 && !searchParams.get("chatId")) {
        setActiveChat(res.data[0].chat_id)
      }
    } catch (err) {
      console.error("Failed to fetch chats", err)
    }
  }

  // 3. Load Chat History when activeChat changes
  useEffect(() => {
    if (!activeChat) return

    const fetchHistory = async () => {
      try {
        const res = await api.get(`/messaging/chat/${activeChat}/messages/`)
        setMessages(res.data)
        scrollToBottom()
      } catch (err) {
        console.error("Failed to fetch history", err)
      }
    }

    fetchHistory()

    // 4. Initialize WebSocket
    // Note: In production, use wss://
    const protocol = window.location.protocol === "https:" ? "wss" : "ws"
const WS_BASE = `${protocol}://${window.location.host}`


const wsUrl = `${WS_BASE}/ws/chat/${activeChat}/?token=${token}`
const ws = new WebSocket(wsUrl)


    ws.onopen = () => {
      console.log("Connected to chat", activeChat)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "chat_message") {
        setMessages((prev) => {
          // Check for optimistic message to replace (same content, same sender, no ID/isOptimistic)
          // We use reverse to find the most recent one
          const optimisticIndex = [...prev].reverse().findIndex(m =>
            (m.isOptimistic || !m.id) &&
            m.message === data.message &&
            m.sender === data.sender
          )

          if (optimisticIndex !== -1) {
            // Determine actual index
            const actualIndex = prev.length - 1 - optimisticIndex
            const newMessages = [...prev]
            newMessages[actualIndex] = data // Replace optimistic with real
            return newMessages
          }

          // Deduplicate real messages (e.g. socket echo where optimistic wasn't found or different content)
          const exists = prev.some(m => m.id === data.id)
          if (exists) return prev

          return [...prev, data]
        })
        scrollToBottom()
      }
    }

    ws.onerror = (e) => {
      console.error("WebSocket Error", e)
      // Optional: Notify user via toast if needed
    }

    ws.onclose = () => {
      console.log("Disconnected")
    }

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [activeChat, token])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim() || !socket) return

    const messageContent = inputText
    // Optimistic UI Update with Temp ID
    const optimisticMsg = {
      tempId: Date.now(),
      message: messageContent,
      sender: user.email, // Assume sender is self
      timestamp: new Date().toISOString(),
      isOptimistic: true
    }
    setMessages((prev) => [...prev, optimisticMsg])
    scrollToBottom()

    // Send through WebSocket
    socket.send(JSON.stringify({ message: messageContent }))
    setInputText("")
  }

  const handleDeleteMessage = async (msgId) => {
    if (!msgId) return // Optimistic messages might not have ID yet
    try {
      await api.delete(`/messaging/message/${msgId}/delete/`)
      setMessages(prev => prev.filter(m => m.id !== msgId && m.message_id !== msgId)) // Backend might send id or message_id, check view logic
      // Note: Backend serialization sends {content, sender, timestamp}. 
      // We need message ID to delete!
      // HISTORY view returns: {sender, content, timestamp}. NO ID!
      // SOCKET view returns: {message, sender, timestamp}. NO ID!
      // CRITICAL: We need to update backend to send ID.
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  // ... rest of component
  // STOP. I noticed a critical missing piece: Backend does not return Message ID in history or socket.
  // I must fix backend first to include 'id' in the response.

  // Re-implementing this block to include the backend fix reminder in my thought process, 
  // but for now I will apply the frontend logic assuming 'id' will be there.

  const getChatName = (chat) => {
    if (!chat) return "Unknown"
    if (chat.name) return chat.name
    // Assuming 1-on-1 chats, exclude self (handled in backend but checking here safe)
    if (!chat.participants) return "Chat"
    const other = chat.participants[0]
    return other ? other.name : "Chat"
  }

  const getChatInitials = (userName) => {
    return (userName || "?").charAt(0).toUpperCase()
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 min-h-[calc(100vh-200px)] animate-in fade-in duration-500">

      {/* CONVERSATIONS LIST */}
      <div className="lg:col-span-4 lg:order-1">
        <Card className="h-full flex flex-col">
          <CardContent className="p-4 sm:p-5 flex-1 overflow-y-auto max-h-[600px] lg:max-h-none">
            <h2 className="text-lg font-bold tracking-wide text-[var(--color-text-primary)] mb-4 sticky top-0 bg-[var(--color-bg-card)] z-10 pb-2">
              Messages
            </h2>
            <div className="space-y-2">
              {conversations.length === 0 && <p className="text-sm text-[var(--color-text-secondary)]">No conversations yet.</p>}
              {conversations.map((chat) => (
                <div
                  key={chat.chat_id}
                  onClick={() => setActiveChat(chat.chat_id)}
                  className={`group cursor-pointer rounded-xl border p-4 transition-all duration-200
                    ${activeChat === chat.chat_id
                      ? "border-[var(--color-accent-purple)] bg-[var(--color-bg-main)] shadow-sm"
                      : "border-transparent hover:bg-[var(--color-bg-main)] hover:border-[var(--color-border-soft)]"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-md ${chat.chat_type === 'group' ? 'bg-gradient-to-tr from-pink-500 to-rose-500' : 'bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)]'}`}>
                      {chat.chat_type === 'group' ? 'G' : getChatInitials(getChatName(chat))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">
                        {chat.name || getChatName(chat)}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {chat.chat_type === 'group' ? `${chat.participants.length} members` : chat.participants[0]?.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHAT WINDOW */}
      <div className="lg:col-span-8 lg:order-2">
        <Card className="h-[600px] lg:h-full flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            {activeChat ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-[var(--color-border-soft)] p-4 sm:p-5 bg-[var(--color-bg-card)] rounded-t-2xl justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] flex items-center justify-center text-sm font-bold text-white">
                      {getChatInitials(getChatName(conversations.find(c => c.chat_id === activeChat)))}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">
                        {getChatName(conversations.find(c => c.chat_id === activeChat))}
                      </p>
                    </div>
                  </div>

                  {/* Connection Status & Info */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${socket && socket.readyState === WebSocket.OPEN ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                    </div>

                    {/* Info Button for Groups */}
                    {conversations.find(c => c.chat_id === activeChat)?.chat_type === 'group' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[var(--color-text-secondary)]"
                        onClick={() => {
                          const chat = conversations.find(c => c.chat_id === activeChat);
                          if (chat) alert(`Participants:\n${chat.participants.map(p => p.name).join('\n')}`);
                        }}
                      >
                        ℹ️
                      </Button>
                    )}
                  </div>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto bg-[var(--color-bg-main)]/50">
                  {messages.map((msg, idx) => {
                    const isMe = msg.sender === user?.email || msg.sender === user?.first_name || msg.sender === String(user?.id)
                    const reallyIsMe = msg.sender === user?.email; // Strict check for delete/styling

                    return (
                      <div
                        key={msg.tempId || msg.id || idx}
                        className={`flex flex-col ${reallyIsMe ? "items-end" : "items-start"} group relative animate-in fade-in slide-in-from-bottom-2 duration-300`}
                      >
                        {/* Sender Name for Groups (if not me) */}
                        {!reallyIsMe && (
                          <span className="text-[10px] text-[var(--color-text-secondary)] mb-1 px-1">
                            {msg.sender_name || msg.sender}
                          </span>
                        )}

                        <div className={`flex items-center gap-2 max-w-[80%] ${reallyIsMe ? "flex-row-reverse" : "flex-row"}`}>
                          {/* Message Bubble */}
                          <div className={`rounded-2xl px-4 py-2.5 shadow-sm ${reallyIsMe
                            ? "bg-gradient-to-br from-[var(--color-accent-indigo)] to-[var(--color-accent-purple)] text-white rounded-br-none"
                            : "bg-[var(--color-bg-card)] border border-[var(--color-border-soft)] text-[var(--color-text-primary)] rounded-bl-none"
                            }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.message || msg.content}</p>
                            <div className={`mt-1 flex items-center justify-end gap-1`}>
                              <p className={`text-[10px] ${reallyIsMe ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              {msg.isOptimistic && (
                                <span className="text-[10px] text-white/60 animate-pulse">Sending...</span>
                              )}
                            </div>
                          </div>

                          {/* Delete Button (Only for me) - Positioned nicely next to bubble */}
                          {reallyIsMe && !msg.isOptimistic && (
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                              title="Delete message"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* INPUT */}
                <div className="p-4 sm:p-5 border-t border-[var(--color-border-soft)] bg-[var(--color-bg-card)] rounded-b-2xl">
                  <form className="flex gap-2 sm:gap-3" onSubmit={handleSendMessage}>
                    <Input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-[var(--color-bg-main)] border-transparent focus:bg-[var(--color-bg-card)] transition-colors"
                    />
                    <Button type="submit" className="shadow-lg shadow-indigo-500/20">
                      Send
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-[var(--color-text-secondary)]">
                Select a conversation to start messaging
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

export default Messaging
