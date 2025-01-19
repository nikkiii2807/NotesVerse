import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';

const Notecard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="w-96 bg-white p-4 rounded-lg shadow-lg border border-slate-200 mb-4 ml-14 mr-2 transition-transform transform hover:scale-105 hover:shadow-xl hover:border-slate-300"> {/* Reduced margin */}
      {/* Note Header */}
      <div className="flex justify-between items-center">
        <div>
          <h6 className="text-sm font-bold">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin
          className="text-slate-500 cursor-pointer hover:text-black"
          onClick={onPinNote}
        />
      </div>

      {/* Note Content */}
      <p className="text-sm text-slate-700 mt-2">{content?.slice(0, 60)}</p>

      {/* Tags and Actions */}
      <div className="mt-2">
      <div className="text-xs text-slate-500">
  {tags.map((item, index) => (
    <span key={index} className="mr-1">#{item}</span>
  ))}
</div>
        <div className="flex items-center gap-2 mt-2">
          <MdCreate
            className="icon-btn text-gray-500 hover:text-green-600 cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn text-gray-500 hover:text-red-600 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Notecard;
