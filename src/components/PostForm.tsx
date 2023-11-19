import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { CommonProps } from "../types";
import { classNames } from "../utils/classNames";

type PostFormProps = {
  headerText: string;
  initialName?: string;
  initialMessage?: string;
  isEdit?: boolean;
  onSubmit: (e: CommonProps) => void;
};

export default function PostForm(props: PostFormProps) {
  const { headerText, initialName, initialMessage, isEdit, onSubmit } = props;
  const [name, setName] = useState(initialName || "");
  const [message, setMessage] = useState(initialMessage || "");
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrorMessage("");
  };
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setErrorMessage("");
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!name) {
      setErrorMessage("Please enter a name.");
      nameRef.current?.focus();
      return;
    }
    if (!message) {
      setErrorMessage("Please enter a message.");
      messageRef.current?.focus();
      return;
    }
    setErrorMessage("");
    console.log("Form submitted:", name, message);

    onSubmit &&
      onSubmit({
        id: uuidv4(),
        name,
        message,
        timestamp: new Date().toISOString(),
      });

    setName("");
    setMessage("");
  };

  return (
    <div className="px-4 py-2 max-w-[600px] m-auto flex flex-col border border-[#EFEFEF] rounded-sm">
      <div className="mb-2">{headerText}</div>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleNameChange}
        ref={nameRef}
        className={classNames(
          "px-2 py-1 mb-2 border border-[#EFEFEF] rounded-sm",
          {
            "border-red-500": errorMessage && !name,
          }
        )}
        disabled={isEdit}
      />
      <textarea
        placeholder={headerText}
        name="message"
        value={message}
        onChange={handleMessageChange}
        ref={messageRef}
        className={classNames(
          "px-2 py-1 mb-2 border border-[#EFEFEF] rounded-sm",
          {
            "border-red-500": errorMessage && !message,
          }
        )}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-[#3494FF] py-1 px-4 min-w-[100px] rounded uppercase text-white"
        >
          Post
        </button>
      </div>
    </div>
  );
}
