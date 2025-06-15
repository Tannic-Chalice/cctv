// pages/contact.tsx
import React, { useState } from 'react';
import styles from '../styles/contact.module.css';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <main className={styles.contactPageWrapper}>
      <div className={styles.contactPage}>
        <header className={styles.contactHeader}>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Please fill out the form below to get in touch with us.</p>
        </header>

        <section className={styles.contactInfo}>
          <h2>CCTV Contact Information</h2>
          <p>
            <strong>Email:</strong> <a href="mailto:freshtrack@gmail.com">support@cctv.com</a>
          </p>
          <p>
            <strong>Phone:</strong> <a href="tel:+919876543210">+123 456 7890</a>
          </p>
        </section>

        <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
          <h2>Send Us a Message</h2>

          <div className={styles.formGroup}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={5}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
