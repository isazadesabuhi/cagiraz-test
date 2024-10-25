import React, { useState, useEffect } from "react";

const Textarea = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const maxLength = 140;

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setMessage(inputValue.slice(0, maxLength));
  };

  // Bagla button function
  const [showSecondChild, setShowSecondChild] = useState(true);

  const toggleSecondChild = () => {
    setShowSecondChild(!showSecondChild);
  };

  // Call the callback function whenever the "message" state changes
  useEffect(() => {
    sendMessage(message);
  }, [message, sendMessage]);

  return (
    <div className={`${showSecondChild ? "block" : "hidden"}`}>
      <label
        htmlFor="message"
        className="block lg:pb-[5px] font-medium lg:font-semibold text-[8px] leading-[12px] lg:leading-[15px] text-gray-900 lg:text-black500"
      >
        {`${message.length}/${maxLength}`}
      </label>
      <textarea
        id="message"
        rows="3"
        className="resize-x block pt-[8px] lg:pt-[15px] px-[10px] lg:pr-[7px] lg:pl-[15px] pb-[20px] w-full lg:w-[300px] font-semibold text-[12px] leading-[15px] text-gray-900 bg-gray-50 outline-none rounded-lg border border-gray-300 bg-white"
        placeholder="Əlavə qeydlərinizi yazın..."
        value={message}
        onChange={handleInputChange}
      ></textarea>
    </div>
  );
};

export default Textarea;
