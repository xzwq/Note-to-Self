import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Send, Clock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface MessageFormProps {
  onSuccess: () => void;
}

export function MessageForm({ onSuccess }: MessageFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message || !scheduledDate) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('scheduled_messages')
        .insert([
          {
            email,
            message,
            scheduled_date: scheduledDate.toISOString(),
          }
        ]);

      if (error) throw error;
      
      onSuccess();
      setEmail('');
      setMessage('');
      setScheduledDate(null);
    } catch (error) {
      console.error('Error scheduling message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 p-8 rounded-lg border border-gray-700">
      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Delivery Date and Time</label>
        <div className="relative">
          <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <DatePicker
            selected={scheduledDate}
            onChange={(date) => setScheduledDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          'Scheduling...'
        ) : (
          <>
            <Send className="w-5 h-5" />
            Schedule Message
          </>
        )}
      </button>
    </form>
  );
}