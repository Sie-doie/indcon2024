import React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}
const MonthlyNews = props => {
  return (
    <MdEditor renderHTML={text => mdParser.render(text)}  style={{ height: '500px' }} onChange={handleEditorChange} />
  );
};

export default MonthlyNews