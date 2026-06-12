import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MessageSquare, Send, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [selectedTopic, setSelectedTopic] = useState('audit');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [success, setSuccess] = useState(false);

  const topics = [
    { id: 'audit', label: 'Strategy Audit', desc: 'Free 30m review of current marketing channels' },
    { id: 'seo', label: 'Organic SEO Pack', desc: 'Optimize on-page schema, keywords, authority rank' },
    { id: 'growth', label: 'Growth retainer', desc: 'Full custom digital marketing consultation' },
    { id: 'other', label: 'General Enquiry', desc: 'Other inquiries' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    const existingConsults = JSON.parse(localStorage.getItem('rheon_consults') || '[]');
    existingConsults.push({
      id: Date.now(),
      name,
      email,
      topic: selectedTopic,
      message,
      date: meetingDate,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('rheon_consults', JSON.stringify(existingConsults));
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setMessage('');
    setMeetingDate('');
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            id="contact-modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-2xl z-10"
            id="contact-modal-card"
          >
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-neutral-900">Let's Talk Solutions</h3>
                <p className="text-xxs text-neutral-500">Book our strategy specialist or write to us directly</p>
              </div>
              <button
                onClick={handleClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded-full hover:bg-neutral-50"
                id="close-contact-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                  id="contact-success-view"
                >
                  <div className="mx-auto w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-3 font-semibold">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-neutral-900">Meeting Confirmed!</h4>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto mt-1 mb-5">
                    We've registered your consultation request! A calendar invite has been sent to <span className="underline font-bold text-neutral-800">{email}</span>. One of our engineers will ring you shortly.
                  </p>
                  
                  {meetingDate && (
                    <div className="bg-neutral-50 border border-neutral-100 p-3 rounded-lg text-xs font-mono inline-block mb-6">
                      Scheduled for: <strong>{new Date(meetingDate).toLocaleDateString()} at {new Date(meetingDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
                    </div>
                  )}

                  <div>
                    <button
                      onClick={handleClose}
                      className="px-5 py-2 bg-neutral-900 text-white rounded-full font-medium text-xs hover:bg-neutral-800 transition-colors"
                      id="contact-success-done-btn"
                    >
                      Awesome
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Topic Select Pills */}
                  <div className="space-y-1.5">
                    <label className="block text-xxs font-bold text-neutral-500 uppercase">Consultation focus</label>
                    <div className="grid grid-cols-2 gap-2">
                      {topics.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTopic(t.id)}
                          className={`p-2.5 text-left rounded-lg border text-xxs font-medium transition-all cursor-pointer ${
                            selectedTopic === t.id 
                              ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs' 
                              : 'border-gray-200 hover:border-neutral-300 bg-white text-neutral-700'
                          }`}
                          id={`topic-pill-${t.id}`}
                        >
                          <span className="font-display font-semibold text-xs leading-none block mb-0.5">{t.label}</span>
                          <span className={`${selectedTopic === t.id ? 'text-neutral-300' : 'text-neutral-500'} block text-[10px] line-clamp-1`}>{t.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xxs font-bold text-neutral-500 uppercase mb-1">Your Name</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g., Rehan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-250 rounded-lg text-xs focus:border-neutral-900 focus:outline-hidden"
                        id="contact-input-name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Email</label>
                      <input
                        required
                        type="email"
                        placeholder="rehan@rheon.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-250 rounded-lg text-xs focus:border-neutral-900 focus:outline-hidden"
                        id="contact-input-email"
                      />
                    </div>
                  </div>

                  {/* Calendar / Schedule Date Time Picker */}
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" /> Choose a Meeting Slot (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-250 rounded-lg text-xs text-neutral-800 font-mono focus:border-neutral-900 focus:outline-hidden"
                      id="contact-input-date"
                    />
                  </div>

                  {/* Direct message text area */}
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-neutral-400" /> Extra Context or Query
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly describe what you're building or optimizing..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-250 rounded-lg text-xs focus:border-neutral-900 focus:outline-hidden resize-none"
                      id="contact-input-message"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-neutral-900 text-white font-display text-xs font-semibold rounded-full hover:bg-neutral-800 cursor-pointer transition-colors"
                      id="contact-submit-btn"
                    >
                      Book Free Consultation <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
