import ReactMarkdown from 'react-markdown'
import type { Message } from './Chatbot'

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'

  return (
    <div className={`mb-6 ${isUser ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block text-sm px-4 py-3 rounded-xl
        ${isUser
          ? 'bg-indigo-500 text-white'                    
          : 'bg-slate-900 text-slate-100'}               
        `}
      >
        <ReactMarkdown>{msg.content}</ReactMarkdown>
      </div>

      <div
        className={`text-xs mt-2 text-slate-500 
        ${isUser ? 'text-right' : 'text-left'}`}
      >
        {new Date(msg.ts).toLocaleTimeString()}
      </div>
    </div>
  )
}
