"use client";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";

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

  return (
    loading ? (<Spinner loading={loading} />) : (
    <section className="mt-28 flex justify-center">
      <div className="w-full signInBox max-w-6xl rounded-xl mx-6">
        <div className="bg-blue-200/30 px-6 py-8 shadow-md rounded-md md:m-0">
          <h1 className="text-white text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (<p>You have no messages!</p>) : (
            messages.map((message) => (
                <Message key={message._id} message={message}/>
            ))
          )}
            </div>
        </div>
      </div>
    </section>)
  );
};

export default Messages;
