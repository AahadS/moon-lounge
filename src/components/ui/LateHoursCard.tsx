import React from 'react';
import Card from './Card';
import { Clock } from 'lucide-react';

const LateHoursCard = () => (
  <Card
    icon={<Clock size={24} className="mx-auto text-lounge-purple" />}
    title="Late Hours"
    description={
      <div className="flex justify-center gap-6">
        <div>
          <p className="text-gray-400 text-sm">Sunday - Thursday</p>
          <p className="text-lounge-purple font-semibold">5:00 PM - 2:00 AM</p>
        </div>
        <div className="border-l border-gray-700 mx-2" />
        <div>
          <p className="text-gray-400 text-sm">Friday - Saturday</p>
          <p className="text-lounge-purple font-semibold">5:00 PM - 3:00 AM</p>
        </div>
      </div>
    }
  />
);

export default LateHoursCard;