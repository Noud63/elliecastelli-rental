"use client";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";
import { MessageSquareMore } from "lucide-react";

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.log("Error fetching messages: ", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  console.log(messages)

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="h-auto mt-28 flex justify-center mb-40">
      <div className="w-full signInBox max-w-6xl rounded-xl max-xxlg:shadow-none">
        <div className="bg-blue-200/30 px-6 pt-4 pb-8 shadow-md rounded-md md:m-0 max-xxlg:bg-blue-200/0 max-xxlg:shadow-none">
          <div className="flex items-center text-white text-3xl font-bold mb-4 border-b-2 border-dotted border-white pb-4">
            {" "}
            <MessageSquareMore size={28} className="pt-1" />
            Messages
          </div>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex justify-center text-slate-900 font-semibold text-lg">
                You have no messages!
              </div>
            ) : (
              messages.map((message) => (
                <div
                  className="border-b-2 border-dotted border-white pb-4"
                  key={message._id}
                >
                  <Message message={message} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;




// 6697939e252f36580b464cc5
  