import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('Please fill in all fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    const existingMessages = JSON.parse(localStorage.getItem('ecoVoiceContacts') || '[]');
    const newMessage = {
      ...formData,
      id: Date.now(),
      sentAt: new Date().toLocaleString(),
    };

    localStorage.setItem('ecoVoiceContacts', JSON.stringify([...existingMessages, newMessage]));
    setStatus('Thanks for reaching out! Your message has been saved.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 px-6 py-20 text-gray-800'>
      <div className='mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl'>
        <div className='grid gap-10 lg:grid-cols-2'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-green-600'>Contact Us</p>
            <h1 className='mt-3 text-4xl font-bold'>We’d love to hear from you</h1>
            <p className='mt-4 text-lg text-gray-600'>
              Share your ideas, ask questions, or partner with EcoVoice on climate action initiatives.
            </p>
            <div className='mt-8 space-y-3 text-sm text-gray-700'>
              <p><span className='font-semibold'>Email:</span> hello@ecovoice.org</p>
              <p><span className='font-semibold'>Phone:</span> +91 222333444</p>
              <p><span className='font-semibold'>Location:</span> hyderabad , india</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6'>
            <input
              type='text'
              name='name'
              placeholder='Your name'
              value={formData.name}
              onChange={handleChange}
              className='w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-500'
            />
            <input
              type='email'
              name='email'
              placeholder='Your email'
              value={formData.email}
              onChange={handleChange}
              className='w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-500'
            />
            <input
              type='text'
              name='subject'
              placeholder='Subject'
              value={formData.subject}
              onChange={handleChange}
              className='w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-500'
            />
            <textarea
              name='message'
              rows='5'
              placeholder='Write your message...'
              value={formData.message}
              onChange={handleChange}
              className='w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-500'
            />
            <button
              type='submit'
              className='w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700'
            >
              Send Message
            </button>
            {status && <p className='text-sm text-green-700'>{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
