'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import styles from './ChatWidget.module.css';

type ChatMessage = {
  id: string;
  text: string;
  author: 'bot' | 'user';
};

const initialMessages: ChatMessage[] = [
  { id: 'bot-1', text: 'Hi! How can we help?', author: 'bot' },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // 🔥 NEW
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(() => (isOpen ? 0 : 1), [isOpen]);

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 🔥 Popup show after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500); // 1.5 sec delay

    return () => clearTimeout(timer);
  }, []);

  // 🔥 chatbot logic
  const getBotReply = (input: string) => {
    const lower = input.toLowerCase();

    if (
      lower.includes('contact') ||
      lower.includes('phone') ||
      lower.includes('email') ||
      lower.includes('whatsapp')
    ) {
      return `You can contact us:
📞 +91 83840 62994
📧 accumax105@gmail.com`;
    }

    if (lower.includes('hi') || lower.includes('hello')) {
      return 'Hello! How can we assist you today?';
    }

    if (lower.includes('product')) {
      return 'Check "Our Products" section above.';
    }

    if (lower.includes('price')) {
      return 'Please contact us for pricing details.';
    }

    return 'Thanks! Our team will reach you shortly.';
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: trimmed,
      author: 'user',
    };

    const botMessage: ChatMessage = {
      id: `bot-${Date.now()}`,
      text: getBotReply(trimmed),
      author: 'bot',
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputValue('');
  };

  return (
    <div className={styles.widget}>

      {/* 🔥 POPUP MESSAGE */}
      {showPopup && !isOpen && (
        <div className={styles.popup} onClick={() => {
          setIsOpen(true);
          setShowPopup(false);
        }}>
          How can we help you?
        </div>
      )}

      {/* PANEL */}
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}>

        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <p className={styles.headerLabel}>Support</p>
            <h3 className={styles.headerTitle}>Chat with us</h3>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        {/* MESSAGES */}
        <div className={styles.messages}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageRow} ${
                message.author === 'user' ? styles.messageRowUser : ''
              }`}
            >
              <p
                className={`${styles.messageBubble} ${
                  message.author === 'user' ? styles.messageBubbleUser : ''
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
            placeholder="Type your message..."
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>

      {/* FAB */}
      <button
        type="button"
        className={styles.fab}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setShowPopup(false); // hide popup
        }}
      >
        Chat
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>
    </div>
  );
}



















