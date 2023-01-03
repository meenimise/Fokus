import React from 'react';
import MessageHeader from './MessageHeader';
// Chatbot helper functions
import { createMarkup } from '../../utils/helper';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function countWords(str) {
  if (str != null) {
    const arr = str.split(' ');
    return arr.filter(word => word !== '').length;
  }
}

function Message(props) {
  const messageOwner = props.messageOwner;
  const messageContent = props.messageContent;

  return (
    !messageOwner ?
    (
      <div className='flex flex-col w-full'>
        <MessageHeader>
        </MessageHeader>

        <div className='flex flex-row w-full'>
        {
          countWords(messageContent) > 1 ?
          <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-words ... rounded-[10px] bg-grey_message'>
            <ReactMarkdown children={messageContent} rehypePlugins={[rehypeRaw]} />
          </div>
          :
          <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-all ... rounded-[10px] bg-grey_message'>
            <ReactMarkdown children={messageContent} rehypePlugins={[rehypeRaw]} />
          </div>
        }
        </div>
      </div>
      
    )
    :
    (
      <div className='flex flex-row-reverse w-[98%]'>
      {
        countWords(messageContent) > 1 ?
        <div className='w-auto max-w-[80%] mt-[2%] h-auto p-[15px] inline-block align-top text-white font-poppins text-[10pt] break-words ... rounded-[10px] bg-steel_teal'>
          {messageContent}
        </div>
        :
        <div className='w-auto max-w-[80%] mt-[2%] h-auto p-[15px] inline-block align-top text-white font-poppins text-[10pt] break-all ... rounded-[10px] bg-steel_teal'>
          {messageContent}
        </div>
      }
      </div>
    )
  );
}

export default Message