import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { askAI } from "../../store/actions/actions";
import { BsRobot, BsSend } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { FaMagic } from "react-icons/fa";

const AIChat = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.ai);

  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendQuestion = () => {
    if (!question.trim()) return;

    dispatch(askAI(question));
    setQuestion("");
  };

  const quickQuestion = (text) => {
    dispatch(askAI(text));
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-violet-700 to-blue-700 text-white shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
        >
          <BsRobot size={28} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 w-[360px] h-[520px] max-w-[95vw] max-h-[85vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          {" "}
          <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 p-5 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-lg">✨ Eventify Assistant</h2>

                <p className="text-xs text-slate-300 mt-1">
                  Discover events with AI
                </p>

                <div className="flex items-center gap-2 mt-2 text-emerald-400 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  AI Online
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="hover:text-red-400 transition"
              >
                <IoClose size={28} />
              </button>
            </div>
          </div>
          <div className="p-3 flex flex-wrap gap-2 border-b border-slate-800 bg-slate-900">
            <button
              onClick={() => quickQuestion("Recommend me a music event.")}
              className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-sm hover:bg-indigo-700 transition"
            >
              Music
            </button>

            <button
              onClick={() => quickQuestion("Recommend me a theatre event.")}
              className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-sm hover:bg-indigo-700 transition"
            >
              Theatre
            </button>

            <button
              onClick={() => quickQuestion("Recommend me a festival.")}
              className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-sm hover:bg-indigo-700 transition"
            >
              Festival
            </button>

            <button
              onClick={() =>
                quickQuestion("Surprise me with one event and explain why.")
              }
              className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm hover:scale-105 transition"
            >
              <FaMagic className="inline mr-1" />
              Surprise me
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-slate-950">
            {messages.length === 0 && (
              <div className="text-slate-400 text-sm mt-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-700 to-blue-700 flex items-center justify-center">
                    <BsRobot className="text-white" />
                  </div>

                  <div>
                    <p className="text-slate-200 font-semibold">Welcome 👋</p>

                    <p className="text-xs text-slate-400">
                      Ask me anything about events.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl px-4 py-3 max-w-[80%] shadow-lg">
                    {msg.question}
                  </div>
                </div>

                <div className="flex justify-start mt-3">
                  <div className="bg-slate-800 border border-slate-700 text-slate-100 rounded-2xl px-4 py-3 max-w-[80%] whitespace-pre-wrap">
                    {msg.answer}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 mt-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-700 to-blue-700 flex items-center justify-center animate-pulse">
                  <BsRobot className="text-white" />
                </div>

                <div className="text-slate-400 italic">
                  ✨ Eventify Assistant is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>
          <div className="border-t border-slate-800 bg-slate-900 p-3 flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendQuestion();
                }
              }}
            />

            <button
              onClick={sendQuestion}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl px-5 transition-all duration-300"
            >
              <BsSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
