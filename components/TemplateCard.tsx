
import React from 'react';

interface TemplateCardProps {
  title: string;
  imageUrl: string;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, imageUrl, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="w-full h-40 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-4 w-full text-center border-t border-gray-200">
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
    </button>
  );
};

export default TemplateCard;
