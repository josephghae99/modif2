"use client";

import { useChat } from "ai/react";
import { Message } from "ai";

export function Chat({ id, initialMessages = [] }: { id: string, initialMessages?: Message[] }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    id,
    initialMessages,
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className="font-bold">{message.role === 'user' ? 'You' : 'AI'}</div>
            <div>{message.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
          className="w-full p-2 border rounded"
        />
      </form>
    </div>
  );
}
