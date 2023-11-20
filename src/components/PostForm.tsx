import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { CommonProps } from "../types";
import { classNames } from "../utils/classNames";

type PostFormProps = Partial<CommonProps> & {
  headerText: string;
  isEdit?: boolean;
  onSubmit: (e: CommonProps) => void;
  onCancel?: () => void;
  showCancel?: boolean;
};

export default function PostForm(props: PostFormProps) {
  const {
    headerText,
    id,
    name: initialName,
    message: initialMessage,
    timestamp,
    isEdit,
    onSubmit,
    onCancel,
    showCancel,
  } = props;
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

    onSubmit &&
      onSubmit({
        id: id || uuidv4(),
        name,
        message,
        timestamp: timestamp || new Date().toISOString(),
      });

    setName("");
    setMessage("");
  };

  return (
    <div
      className={classNames(
        "px-4 py-2 max-w-2xl m-auto mb-2 flex flex-col bg-gray-100 border border-slate-200 rounded-sm",
        {
          "mx-3 sm:mx-0": !isEdit && !showCancel,
        }
      )}
    >
      <div className="mb-2 capitalize">{headerText}</div>
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
            "cursor-not-allowed": isEdit,
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
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <div className="flex justify-end">
        {showCancel && (
          <button
            onClick={() => {
              setName(initialName || "");
              setMessage(initialMessage || "");
              onCancel && onCancel();
            }}
            className="text-blue-500 font-bold mr-3"
          >
            Cancel
          </button>
        )}
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
