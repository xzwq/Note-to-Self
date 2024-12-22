import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { MessageForm } from './components/MessageForm';
import { SuccessMessage } from './components/SuccessMessage';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Mail className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h1 className="text-4xl font-bold mb-4">Note to Self</h1>
            <p className="text-gray-400">Schedule messages to your future self</p>
          </div>

          {success ? (
            <SuccessMessage onReset={() => setSuccess(false)} />
          ) : (
            <MessageForm onSuccess={() => setSuccess(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;