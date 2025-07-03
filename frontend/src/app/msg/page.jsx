'use client'

import { useEffect, useState, useRef } from 'react'

export default function WebSocketRoomChat() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)

  const joinChat = () => {
    const socket = new WebSocket(`ws://localhost:8000/ws?username=${username}&room=${room}`)
    socketRef.current = socket

    socket.onopen = () => {
      setConnected(true)
      console.log('Connected to WebSocket server')
    }

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }

    socket.onclose = () => {
      setConnected(false)
      console.log('Disconnected from WebSocket server')
    }
  }

  const sendMessage = () => {
    if (input && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(input)
      setInput('')
    }
  }

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [])

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="bg-gray-800 p-6 rounded-lg space-y-4 max-w-sm w-full">
          <h2 className="text-xl font-bold">Join a Room</h2>
          <input
            className="w-full p-2 rounded bg-gray-700"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-gray-700"
            placeholder="Room name (e.g. general)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            onClick={joinChat}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
          >
            Join Chat
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Room: {room}</h1>
      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md h-64 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <p key={idx} className="text-sm mb-1">{msg}</p>
        ))}
      </div>
      <div className="flex w-full max-w-md gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-700 border border-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}
