import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, phone: string) => void;
}

const CheckInModal = ({ isOpen, onClose, onSubmit }: CheckInModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [step, setStep] = useState<'details' | 'verification'>('details');
  const [verificationCode, setVerificationCode] = useState('');

  const validatePhoneNumber = (number: string) => {
    // Remove all non-digits
    const cleanNumber = number.replace(/\D/g, '');
    
    // Check if it's exactly 10 digits
    if (cleanNumber.length !== 10) {
      return false;
    }

    // Check area code (first 3 digits)
    const areaCode = cleanNumber.substring(0, 3);
    const validAreaCodes = ['416', '647', '437', '905', '289', '365', '742'];
    
    return validAreaCodes.includes(areaCode);
  };

  const formatPhoneNumber = (value: string) => {
    const cleanNumber = value.replace(/\D/g, '');
    if (cleanNumber.length >= 10) {
      return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6, 10)}`;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setPhone(formattedValue);
    setPhoneError('');
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (!validatePhoneNumber(cleanPhone)) {
      setPhoneError('Please enter a valid phone number with a GTA area code');
      return;
    }
    
    setStep('verification');
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, phone);
    setName('');
    setPhone('');
    setVerificationCode('');
    setStep('details');
    onClose();
  };

  const handleVerificationInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCode = verificationCode.split('');
    newCode[index] = e.target.value;
    const updatedCode = newCode.join('');
    setVerificationCode(updatedCode);
    
    if (e.target.value && index < 5) {
      const nextInput = e.target.parentElement?.querySelector(
        `input:nth-child(${index + 2})`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const renderDetailsForm = () => (
    <form onSubmit={handleInitialSubmit} className="space-y-6">
      <div>
        <label className="block text-white mb-2 font-serif" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black/30 border border-lounge-purple/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-lounge-purple"
          required
        />
      </div>
      <div>
        <label className="block text-white mb-2 font-serif" htmlFor="phone">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="(647) 555-0123"
          className={`w-full bg-black/30 border ${phoneError ? 'border-red-500' : 'border-lounge-purple/30'} rounded-md px-4 py-2 text-white focus:outline-none focus:border-lounge-purple`}
          required
        />
        {phoneError && (
          <p className="text-red-500 text-sm mt-1">{phoneError}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-lounge-purple hover:bg-lounge-purple-dark text-white font-serif py-3 rounded-md transition-colors mt-8"
      >
        Confirm Check-In
      </button>
    </form>
  );

  const renderVerificationForm = () => (
    <form onSubmit={handleVerificationSubmit} className="space-y-6">
      <div>
        <label className="block text-white mb-2 font-serif" htmlFor="verification">
          Enter Verification Code
        </label>
        <div className="grid grid-cols-6 gap-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              placeholder="#"
              value={verificationCode[index] || ''}
              onChange={(e) => handleVerificationInput(e, index)}
              className="w-full aspect-square bg-black/30 border border-lounge-purple/30 rounded-md text-center text-white focus:outline-none focus:border-lounge-purple text-xl"
            />
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-lounge-purple hover:bg-lounge-purple-dark text-white font-serif py-3 rounded-md transition-colors mt-8"
      >
        Confirm
      </button>
    </form>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md mx-4"
          >
            <div className="glass-card p-8">
              <h2 className="text-3xl font-serif text-white mb-8 text-center">
                {step === 'details' ? 'Check In' : 'Verify Your Number'}
              </h2>
              {step === 'details' ? renderDetailsForm() : renderVerificationForm()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckInModal;