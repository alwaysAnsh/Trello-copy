import React, { useState } from 'react';

const TrimmedText = ({ text, wordLimit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = text.split(' ');
  const shouldTrim = words.length > wordLimit;
  const trimmedText = shouldTrim ? words.slice(0, wordLimit).join(' ') + '...' : text;

  return (
    <div>
      <p>
        {isExpanded ? text : trimmedText}
        {shouldTrim && (
          <span 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-blue-500 cursor-pointer"
          >
            {isExpanded ? ' show less' : ' show more'}
          </span>
        )}
      </p>
    </div>
  );
};

export default TrimmedText;
