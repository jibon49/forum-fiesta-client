import React, { useState } from 'react';

const TextEditor = () => {
  const [text, setText] = useState('');

  const modifyText = (style) => {
    document.execCommand(style, false, null);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <label htmlFor="textEditor" className="block text-sm font-medium text-gray-700">Text Editor</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <textarea
          id="textEditor"
          rows="4"
          className="form-input py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Text Modifications</label>
        <div className="flex items-center space-x-4 mt-2">
          <button onClick={() => modifyText('bold')} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800" title="Bold">
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 2l6 13M6 2l6 13M6 2l6 13"></path>
            </svg>
          </button>
          <button onClick={() => modifyText('italic')} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800" title="Italic">
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 4h-9M14 20H5M15 4l2 16M10 4l2 16"></path>
            </svg>
          </button>
          <button onClick={() => modifyText('underline')} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800" title="Underline">
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M8 16v2a4 4 0 0 0 8 0v-2"></path>
              <path d="M4 7v4a8 8 0 0 0 16 0V7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
