'use client';
import { useState } from 'react';

export default function Home() {
  const [recipient, setRecipient] = useState('');
  const [messageText, setMessageText] = useState('Hello, this is a test message to check the API mechanism.');
  const [log, setLog] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!recipient) {
      setLog('Error: Please fill in the Mobile Number in the UI.');
      return;
    }

    setLoading(true);
    setLog('Processing Request via Secure Server...\n');

    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: recipient,
          message: messageText,
        }),
      });

      const data = await response.json();
      setLog((prev) => prev + JSON.stringify(data, null, 2));
    } catch (error) {
      setLog((prev) => prev + `\nConnection Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 flex items-center justify-center min-h-screen p-4 font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-xl font-bold text-gray-800 text-center">WhatsApp API Engine</h2>
        </div>

        {/* Recipient Input */}
        <div class="mb-4">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">WhatsApp Number</label>
          <input 
            type="number" 
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 block w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 text-base p-3 border shadow-sm transition-all" 
            placeholder="e.g. 9665XXXXXXXX"
          />
          <p className="text-xs text-gray-400 mt-1">Enter full number with country code directly (e.g., Saudi 966).</p>
        </div>

        {/* Template Select */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Message Template</label>
          <select 
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="mt-1 block w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 text-sm p-3 border shadow-sm bg-white transition-all"
          >
            <option value="Hello, this is a test message to check the API mechanism.">Test 1: General Welcome</option>
            <option value="Reminder: Staff documentation is expiring in less than 30 days.">Test 2: Document Expiry Alert</option>
            <option value="Your recent invoice has been generated successfully.">Test 3: Invoice Notification</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          onClick={sendMessage}
          disabled={loading}
          className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Sending...' : 'Send WhatsApp Message'}
        </button>

        {/* Live API Log */}
        <div className="mt-6">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Live Server Log</label>
          <pre className="mt-1 bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-auto h-40 whitespace-pre-wrap font-mono shadow-inner border border-gray-800">
            {log || 'Waiting for action...'}
          </pre>
        </div>
      </div>
    </main>
  );
}
