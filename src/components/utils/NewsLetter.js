import React, { useState } from 'react';
import Navigation from '../Layouts/Navigation';
import Footer from '../Layouts/Footer';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('https://backend-mern-store.zelobrix.com/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setMessage('Thank you! A confirmation email has been sent to your email address.');
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />

      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <img src="/images/news-letter.png" alt="Newsletter" className="w-full max-w-md mb-8" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h1>
        <p className="text-gray-700 mb-4">Enter Your Email to be Notified when the program is Open!</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full max-w-xs p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Notify Me
          </button>
        </form>
        {isLoading && <p className="mt-4 text-center text-gray-700">Sending...</p>}
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>

      <Footer />
    </>
  );
};

export default NewsLetter;
