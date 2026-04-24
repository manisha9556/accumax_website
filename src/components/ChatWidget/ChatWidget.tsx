'use client';

import { FormEvent, useMemo, useState } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const unreadCount = useMemo(() => (isOpen ? 0 : 1), [isOpen]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, text: trimmed, author: 'user' },
      { id: `bot-${Date.now()}-reply`, text: 'Thanks! Our team will reach out shortly.', author: 'bot' },
    ]);
    setInputValue('');
  };

  return (
    <div className={styles.widget}>
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`} aria-hidden={!isOpen}>
        <div className={styles.header}>
          <div>
            <p className={styles.headerLabel}>Support</p>
            <h3 className={styles.headerTitle}>Chat with us</h3>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            x
          </button>
        </div>

        <div className={styles.messages} role="log" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageRow} ${message.author === 'user' ? styles.messageRowUser : ''}`}
            >
              <p className={`${styles.messageBubble} ${message.author === 'user' ? styles.messageBubbleUser : ''}`}>
                {message.text}
              </p>
            </div>
          ))}
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className={styles.input}
            placeholder="Type your message..."
            aria-label="Type your message"
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>

      <button
        type="button"
        className={styles.fab}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close chat widget' : 'Open chat widget'}
      >
        <span className={styles.fabIcon}>Chat</span>
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>
    </div>
  );
}
