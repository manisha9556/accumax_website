'use client';

import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {

    const phoneNumber = "918384062994";

    //   const message = `Hello, I would like to know more about the services offered by AccumaxIndia and I’m interested in your services. Could you please share more details and pricing?`;

    const url = `https://wa.me/${phoneNumber}`;

    return (
        <div className={styles.wrapper}>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp className={styles.icon} />
            </a>
        </div>
    );
}