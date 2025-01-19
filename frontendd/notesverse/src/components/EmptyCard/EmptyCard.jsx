import React from 'react';
import { MdNoteAdd } from 'react-icons/md'; // Importing the icon

const EmptyCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-100">
      <div className="flex flex-col items-center justify-center p-10 space-y-6 bg-white shadow-2xl rounded-3xl w-[300px] md:w-[400px] transition-all duration-500 hover:scale-105 hover:shadow-3xl">
        <MdNoteAdd className="text-teal-600 text-8xl transform transition-all duration-500 hover:rotate-12" /> {/* Icon */}
        <p className="text-gray-700 text-base text-center font-medium tracking-wide leading-relaxed">
          Start creating your first note! </p><p>Click the + icon.</p>
        
        
      </div>
    </div>
  );
};

export default EmptyCard;
