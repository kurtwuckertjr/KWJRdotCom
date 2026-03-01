'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Loader2, Trash2, ChevronDown, Check, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status?: 'pending' | 'streaming' | 'applied' | 'accepted' | 'rejected';
}

interface EditAssistantProps {
  open: boolean;
  onClose: () => void;
  markdown: string;
  category: string;
  title: string;
  onEditComplete: (newMarkdown: string) => void;
}

export function EditAssistant({
  open,
  onClose,
  markdown,
  category,
  title,
  onEditComplete,
}: EditAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when drawer opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const handleSend = useCallback(async () => {
    const instruction = input.trim();
    if (!instruction || streaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: instruction,
    };

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Applying changes...',
      status: 'streaming',
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    let accumulated = '';

    try {
      const res = await fetch('/api/agents/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown, instruction, category, title }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: `Error: ${err.error}`, status: 'pending' }
              : m,
          ),
        );
        setStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No response body');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);

          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsg.id
                    ? { ...m, content: `Error: ${parsed.error}`, status: 'pending' }
                    : m,
                ),
              );
              setStreaming(false);
              return;
            }
            if (parsed.text) {
              accumulated += parsed.text;
            }
          } catch {
            // Skip malformed JSON chunks
          }
        }
      }

      // Clean up code fences
      const cleaned = accumulated
        .replace(/^```(?:markdown)?\n/m, '')
        .replace(/\n```\s*$/m, '')
        .trim();

      if (cleaned) {
        onEditComplete(cleaned);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: 'Changes ready - review the diff above.', status: 'applied' }
              : m,
          ),
        );
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: 'No changes produced. Try rephrasing your instruction.', status: 'pending' }
              : m,
          ),
        );
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: 'Cancelled.', status: 'pending' }
              : m,
          ),
        );
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: `Error: ${(err as Error).message}`, status: 'pending' }
              : m,
          ),
        );
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, streaming, markdown, category, title, onEditComplete]);

  const handleCancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const handleClear = useCallback(() => {
    if (streaming) return;
    setMessages([]);
  }, [streaming]);

  // Update last applied message status based on diff accept/reject
  const markLastApplied = useCallback((newStatus: 'accepted' | 'rejected') => {
    setMessages((prev) => {
      const updated = [...prev];
      for (let i = updated.length - 1; i >= 0; i--) {
        if (updated[i].status === 'applied') {
          updated[i] = { ...updated[i], status: newStatus };
          break;
        }
      }
      return updated;
    });
  }, []);

  // Expose markLastApplied to parent via ref-like pattern
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__editAssistantMark = markLastApplied;
    return () => {
      delete (window as unknown as Record<string, unknown>).__editAssistantMark;
    };
  }, [markLastApplied]);

  if (!open) return null;

  return (
    <div className="flex flex-col border-t border-gray-800 bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          AI Edit Assistant
        </span>
        <div className="flex items-center gap-1">
          {messages.length > 0 && !streaming && (
            <button
              onClick={handleClear}
              className="rounded p-1 text-gray-600 transition hover:text-gray-400"
              title="Clear conversation"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-600 transition hover:text-gray-400"
            title="Close"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-1" style={{ maxHeight: '120px' }}>
        {messages.length === 0 && (
          <p className="py-2 text-center text-[10px] text-gray-600">
            Describe an edit: &quot;change the callout to amber&quot;, &quot;make this a list&quot;, &quot;add a checklist&quot;...
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-1.5 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-2.5 py-1 text-xs ${
                msg.role === 'user'
                  ? 'bg-teal-600/20 text-teal-300'
                  : 'bg-gray-800/80 text-gray-400'
              }`}
            >
              <span>{msg.content}</span>
              {msg.status === 'streaming' && (
                <Loader2 className="ml-1.5 inline h-3 w-3 animate-spin text-teal-400" />
              )}
              {msg.status === 'applied' && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 rounded bg-yellow-400/10 px-1 py-0.5 text-[9px] font-medium text-yellow-400">
                  Pending review
                </span>
              )}
              {msg.status === 'accepted' && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 rounded bg-green-400/10 px-1 py-0.5 text-[9px] font-medium text-green-400">
                  <Check className="h-2.5 w-2.5" /> Accepted
                </span>
              )}
              {msg.status === 'rejected' && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 rounded bg-red-400/10 px-1 py-0.5 text-[9px] font-medium text-red-400">
                  <X className="h-2.5 w-2.5" /> Rejected
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-gray-800/50 px-3 py-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Describe your edit..."
          disabled={streaming}
          className="flex-1 rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 placeholder-gray-600 focus:border-teal-500 focus:outline-none disabled:opacity-50"
        />
        {streaming ? (
          <button
            onClick={handleCancel}
            className="shrink-0 rounded-md bg-red-600/20 px-2.5 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-600/30"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="shrink-0 rounded-md bg-teal-600 p-1.5 text-white transition hover:bg-teal-500 disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
