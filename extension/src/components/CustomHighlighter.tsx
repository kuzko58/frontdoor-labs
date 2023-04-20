import React from 'react';
import Highlighter from 'react-highlight-words';

const CustomHighlighter = () => {
    return (
        <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={['and', 'or', 'the']}
            autoEscape={true}
            textToHighlight="Angular"
        />
    );
};

export default CustomHighlighter;
