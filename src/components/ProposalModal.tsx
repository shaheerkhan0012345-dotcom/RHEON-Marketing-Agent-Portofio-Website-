import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle, ArrowRight, TrendingUp, Users, Target, Zap } from 'lucide-react';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProposalModal({ isOpen, onClose }: ProposalModalProps) {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [budget, setBudget] = useState(2500);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const goals = [
    { id: 'traffic', label: 'Boost Organic Traffic', icon: TrendingUp, desc: 'Increase search engine rankings and site visibility' },
    { id: 'leads', label: 'Generate More Leads', icon: Users, desc: 'Convert more web visitors into potential customers' },
    { id: 'brand', label: 'Grow Brand Authority', icon: Target, desc: 'Establish leadership in your industry niche' },
    { id: 'conversion', label: 'Optimize Conversions', icon: Zap, desc: 'Increase sales, signups, and customer engagement' },
  ];

  const channels = [
    { id: 'seo', label: 'Search Engine Optimization (SEO)', costMultiplier: 1.0 },
    { id: 'ppc', label: 'Paid Search & PPC Ads', costMultiplier: 1.2 },
    { id: 'content', label: 'Content Strategy & Creation', costMultiplier: 0.8 },
    { id: 'social', label: 'Social & Digital Campaigns', costMultiplier: 0.9 },
  ];

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(g => g !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  const toggleChannel = (id: string) => {
    if (selectedChannels.includes(id)) {
      setSelectedChannels(selectedChannels.filter(c => c !== id));
    } else {
      setSelectedChannels([...selectedChannels, id]);
    }
  };

  // Live simulation projections based on chosen parameters
  const getProjections = () => {
    const goalCount = selectedGoals.length || 1;
    const channelCount = selectedChannels.length || 1;
    const scale = budget / 1000;
    
    const trafficInc = Math.round(1500 * scale * (goalCount * 0.4) * (channelCount * 0.3));
    const leadsCount = Math.round(75 * scale * (goalCount * 0.5) * (channelCount * 0.35));
    const roiMultiplier = (1.5 + (channelCount * 0.2) + (goalCount * 0.15)).toFixed(1);

    return {
      traffic: trafficInc.toLocaleString(),
      leads: leadsCount.toLocaleString(),
      roi: roiMultiplier,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Persist to local storage for realistic state preservation
    const savedProposals = JSON.parse(localStorage.getItem('rheon_proposals') || '[]');
    savedProposals.push({
      id: Date.now(),
      name,
      email,
      company,
      goals: selectedGoals,
      channels: selectedChannels,
      budget,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('rheon_proposals', JSON.stringify(savedProposals));
  };

  const resetModal = () => {
    setStep(1);
    setSelectedGoals([]);
    setSelectedChannels([]);
    setBudget(2500);
    setEmail('');
    setName('');
    setCompany('');
    setSubmitted(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const projections = getProjections();

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
            id="modal-backdrop"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-gray-100 shadow-2xl z-10"
            id="proposal-modal-card"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="bg-neutral-900 p-1.5 rounded-lg text-white">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-neutral-900">Custom Proposal Builder</h3>
                  <p className="text-xs text-neutral-500">Calculate budget, ROI, and growth vectors in seconds</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-1.5 hover:bg-neutral-50 rounded-full"
                id="close-proposal-button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Progress Indicator */}
            {!submitted && (
              <div className="bg-neutral-50 border-b border-gray-100 px-6 py-2 flex items-center gap-4 text-xs font-medium text-neutral-500">
                <span className={`${step === 1 ? 'text-neutral-900 font-bold' : ''}`}>1. Marketing Goals</span>
                <span className="text-neutral-300">/</span>
                <span className={`${step === 2 ? 'text-neutral-900 font-bold' : ''}`}>2. Strategy & Budget</span>
                <span className="text-neutral-300">/</span>
                <span className={`${step === 3 ? 'text-neutral-900 font-bold' : ''}`}>3. Contact & Summary</span>
              </div>
            )}

            {/* Steps Container */}
            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                  id="proposal-success-view"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-4 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-neutral-900 mb-2">Proposal Requested!</h4>
                  <p className="text-neutral-600 max-w-md mx-auto mb-6 text-sm">
                    Thank you {name || 'there'}! We have customized an optimization roadmap for <strong className="text-neutral-800">{company || 'your brand'}</strong>. A deep dive strategy PDF has been dispatched to <span className="underline font-medium text-neutral-800">{email}</span>.
                  </p>

                  {/* Summary Breakdown Card */}
                  <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 text-left max-w-lg mx-auto mb-8">
                    <h5 className="font-display font-semibold text-sm text-neutral-800 mb-3 uppercase tracking-wider">Estimated Growth Projections</h5>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white p-3 rounded-lg border border-neutral-100/60 shadow-xs">
                        <span className="text-2xl font-bold font-display text-neutral-900">+{projections.traffic}</span>
                        <p className="text-xxs text-neutral-500 mt-1 uppercase">Monthly Traffic</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-neutral-100/60 shadow-xs">
                        <span className="text-2xl font-bold font-display text-neutral-900">+{projections.leads}</span>
                        <p className="text-xxs text-neutral-500 mt-1 uppercase">Inbound Leads</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-neutral-100/60 shadow-xs">
                        <span className="text-3xl font-extrabold font-display text-emerald-600">{projections.roi}x</span>
                        <p className="text-xxs text-neutral-500 mt-1 uppercase">Estimated ROI</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-dashed border-neutral-200 text-xs text-neutral-500 flex justify-between">
                      <span>Monthly Budget Allocate: <strong>${budget.toLocaleString()}</strong></span>
                      <span>Channels selected: <strong>{selectedChannels.length || 'SEO Standard'}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors cursor-pointer text-sm font-display tracking-tight"
                    id="finish-proposal-btn"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <div>
                  {/* STEP 1: SELECT GOALS */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="font-display font-medium text-neutral-800 mb-1">What are your primary business goals?</h4>
                        <p className="text-xs text-neutral-500">Pick any goals you'd like us to customize your strategy for.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="goals-grid">
                        {goals.map((g) => {
                          const Icon = g.icon;
                          const isSelected = selectedGoals.includes(g.id);
                          return (
                            <button
                              key={g.id}
                              type="button"
                              onClick={() => toggleGoal(g.id)}
                              className={`flex p-3 text-left rounded-xl border transition-all select-none duration-150 cursor-pointer ${
                                isSelected 
                                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                                  : 'border-gray-200 hover:border-neutral-400 bg-white text-neutral-800'
                              }`}
                              id={`goal-option-${g.id}`}
                            >
                              <div className={`p-2 rounded-lg mr-3 ${isSelected ? 'bg-neutral-800 text-amber-300' : 'bg-neutral-100 text-neutral-500'}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <span className="font-display text-sm font-medium">{g.label}</span>
                                <p className={`text-xxs mt-0.5 line-clamp-1 ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                  {g.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          disabled={selectedGoals.length === 0}
                          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-display font-medium text-sm transition-all focus:outline-hidden ${
                            selectedGoals.length > 0 
                              ? 'bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer' 
                              : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                          }`}
                          id="step1-next-btn"
                        >
                          Next Step <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: CHANNELS & BUDGET */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-display font-medium text-neutral-800 mb-1">Select Marketing Channels to Leverage</h4>
                          <p className="text-xs text-neutral-500">Our automated builder allocates budget based on chosen streams.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {channels.map((c) => {
                            const isSelected = selectedChannels.includes(c.id);
                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => toggleChannel(c.id)}
                                className={`p-3 text-left rounded-xl border transition-all text-xs font-semibold flex items-center justify-between cursor-pointer ${
                                  isSelected 
                                    ? 'border-neutral-900 bg-neutral-900/5 text-neutral-900' 
                                    : 'border-gray-200 hover:border-neutral-300 bg-white text-neutral-700'
                                }`}
                                id={`channel-option-${c.id}`}
                              >
                                <span>{c.label}</span>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'bg-neutral-900 border-neutral-900' : 'border-gray-300'
                                }`}>
                                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-end">
                          <div>
                            <h4 className="font-display font-medium text-neutral-800 text-sm">Monthly Budget Allocation</h4>
                            <p className="text-xs text-neutral-500">Slide to test projection returns</p>
                          </div>
                          <span className="font-mono text-lg font-bold text-neutral-900 bg-neutral-100 px-3 py-1 rounded-md">
                            ${budget.toLocaleString()}
                          </span>
                        </div>

                        <input
                          type="range"
                          min="1000"
                          max="10000"
                          step="500"
                          value={budget}
                          onChange={(e) => setBudget(Number(e.target.value))}
                          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                          id="budget-range-slider"
                        />

                        {/* Interactive Growth Indicator Matrix */}
                        <div className="bg-neutral-50 border border-neutral-100/80 rounded-xl p-3 grid grid-cols-3 gap-2 mt-3 text-center">
                          <div>
                            <span className="block text-xs text-neutral-500 font-medium uppercase font-display">Traffic Gain Indicator</span>
                            <span className="text-sm font-semibold font-mono text-neutral-800">+{projections.traffic}/mo</span>
                          </div>
                          <div>
                            <span className="block text-xs text-neutral-500 font-medium uppercase font-display">Target Leads Gain</span>
                            <span className="text-sm font-semibold font-mono text-neutral-800">+{projections.leads} new</span>
                          </div>
                          <div>
                            <span className="block text-xs text-neutral-500 font-medium uppercase font-display">Estimated ROI</span>
                            <span className="text-sm font-semibold text-emerald-600 font-mono font-bold">{projections.roi}x</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 px-4 py-2 bg-neutral-50 rounded-full border border-neutral-200 transition-all cursor-pointer"
                          id="step2-back-btn"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          disabled={selectedChannels.length === 0}
                          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-display font-medium text-sm transition-all ${
                            selectedChannels.length > 0 
                              ? 'bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer' 
                              : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                          }`}
                          id="step2-next-btn"
                        >
                          Configure Contacts <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: CONTACT INFORMATION */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-display font-medium text-neutral-800">Almost finished! Where should we send the proposal?</h4>
                          <p className="text-xs text-neutral-500">Enter your credentials below to generate your downloadable report cards.</p>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xxs font-semibold uppercase text-neutral-500 mb-1">Your Name</label>
                              <input
                                required
                                type="text"
                                placeholder="E.g., Rehan"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:border-neutral-900 focus:outline-hidden"
                                id="proposal-input-name"
                              />
                            </div>
                            <div>
                              <label className="block text-xxs font-semibold uppercase text-neutral-500 mb-1">Company Name</label>
                              <input
                                required
                                type="text"
                                placeholder="E.g., RHEON Digital"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:border-neutral-900 focus:outline-hidden"
                                id="proposal-input-company"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xxs font-semibold uppercase text-neutral-500 mb-1">Email Address</label>
                            <input
                              required
                              type="email"
                              placeholder="you@company.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:border-neutral-900 focus:outline-hidden"
                              id="proposal-input-email"
                            />
                          </div>
                        </div>

                        {/* Recap snippet */}
                        <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100/80 text-xxs text-neutral-600">
                          <strong>Allocation Summary:</strong> Planning to boost <span className="underline font-semibold">{selectedGoals.map(gId => goals.find(g => g.id === gId)?.label).join(', ')}</span> with a custom budget of <strong className="text-neutral-800">${budget.toLocaleString()}/mo</strong> focused across {selectedChannels.length} digital streams.
                        </div>

                        <div className="pt-4 flex justify-between items-center">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 px-4 py-2 bg-neutral-50 rounded-full border border-neutral-200 transition-all cursor-pointer"
                            id="step3-back-btn"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-850 transition-all cursor-pointer text-sm font-display tracking-tight flex items-center gap-1.5"
                            id="submit-proposal-btn"
                          >
                            Build Plan <Sparkles className="w-4 h-4 text-amber-300" />
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
