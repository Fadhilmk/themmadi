
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryTypeCards from "./CategoryTypeCards";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
const whatsappBusinessAccountId = process.env.NEXT_PUBLIC_BUSSINESS_ID;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN
  

const toIST = (date) => {
  const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  return new Date(date.getTime() + offset).toISOString().slice(0, 16);
};

const getLastMonthDateTime = () => {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  return toIST(lastMonth);
};

const getCurrentDateTime = () => {
  const now = new Date();
  return toIST(now);
};

const AnalyticsDashboard = () => {
  // State for Message Analytics
  const [messageStartDate, setMessageStartDate] = useState(getLastMonthDateTime());
  const [messageEndDate, setMessageEndDate] = useState(getCurrentDateTime());
  const [messageGranularity, setMessageGranularity] = useState("DAY");
  const [messageData, setMessageData] = useState([]);

  // State for Conversation Analytics
  const [conversationStartDate, setConversationStartDate] = useState(getLastMonthDateTime());
  const [conversationEndDate, setConversationEndDate] = useState(getCurrentDateTime());
  const [conversationGranularity, setConversationGranularity] = useState("DAILY");
  const [conversationData, setConversationData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [typeTotals, setTypeTotals] = useState({});
  const [conversationDirections, setConversationDirections] = useState({});

  const fetchMessageAnalyticsData = async () => {
    try {
      const startTime = new Date(messageStartDate).getTime() / 1000;
      const endTime = new Date(messageEndDate).getTime() / 1000;

      const messageResponse = await axios.get(
        `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
        {
          params: {
            fields: `analytics.start(${startTime}).end(${endTime}).granularity(${messageGranularity})`,
            access_token: accessToken,
          },
        }
      );
      setMessageData(messageResponse.data.analytics.data_points);
    } catch (error) {
      console.error("Error fetching message analytics data:", error.response);
    }
  };

  const fetchConversationAnalyticsData = async () => {
    try {
      const startTime = new Date(conversationStartDate).getTime() / 1000;
      const endTime = new Date(conversationEndDate).getTime() / 1000;

      const conversationResponse = await axios.get(
        `https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}`,
        {
          params: {
            fields: `conversation_analytics.start(${startTime}).end(${endTime}).granularity(${conversationGranularity}).dimensions(["CONVERSATION_CATEGORY", "CONVERSATION_TYPE", "COUNTRY", "PHONE", "CONVERSATION_DIRECTION"])`,
            access_token: accessToken,
          },
        }
      );
      const dataPoints =
        conversationResponse.data.conversation_analytics.data[0].data_points;
      setConversationData(dataPoints);

      // Calculate category totals
      const categoryTotals = dataPoints.reduce((acc, dp) => {
        acc[dp.conversation_category] =
          (acc[dp.conversation_category] || 0) + dp.conversation;
        return acc;
      }, {});

      // Calculate type totals
      const typeTotals = dataPoints.reduce((acc, dp) => {
        acc[dp.conversation_type] =
          (acc[dp.conversation_type] || 0) + dp.conversation;
        return acc;
      }, {});

      // Calculate conversation direction totals
      const directionTotals = dataPoints.reduce((acc, dp) => {
        acc[dp.conversation_direction] =
          (acc[dp.conversation_direction] || 0) + dp.conversation;
        return acc;
      }, {});

      setCategoryTotals(categoryTotals);
      setTypeTotals(typeTotals);
      setConversationDirections(directionTotals);
    } catch (error) {
      console.error(
        "Error fetching conversation analytics data:",
        error.response
      );
    }
  };

  useEffect(() => { 
    fetchMessageAnalyticsData();
  }, [messageStartDate, messageEndDate, messageGranularity]);

  useEffect(() => {
    fetchConversationAnalyticsData();
  }, [conversationStartDate, conversationEndDate, conversationGranularity]);

  const totalSent = messageData.reduce((sum, dp) => sum + dp.sent, 0);
  const totalDelivered = messageData.reduce((sum, dp) => sum + dp.delivered, 0);
  const totalConversations = conversationData.reduce(
    (sum, dp) => sum + dp.conversation,
    0
  );
  const totalCost = conversationData
    .reduce((sum, dp) => sum + dp.cost, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">WhatsApp Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conversation Analytics Card */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Conversation Analytics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Start Date:</label>
              <input
                type="datetime-local"
                value={conversationStartDate}
                onChange={(e) => setConversationStartDate(e.target.value)}
                className="text-black p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">End Date:</label>
              <input
                type="datetime-local"
                value={conversationEndDate}
                onChange={(e) => setConversationEndDate(e.target.value)}
                className="text-black p-2 rounded w-full"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={fetchConversationAnalyticsData}
              className="bg-white text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-green-200 transition duration-300"
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                setConversationStartDate(getLastMonthDateTime());
                setConversationEndDate(getCurrentDateTime());
              }}
              className="bg-gray-200 text-blue-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
            >
              Set to Current
            </button>
          </div>
          <div className="mt-6">
            <div className="mb-4">
              <p className="text-lg font-bold">Total Conversations:</p>
              <p className="text-3xl font-bold text-shadow-sm">{totalConversations}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-bold">Total Cost:</p>
              <p className="text-3xl font-bold text-yellow-300 text-shadow-sm">
                ${totalCost}
              </p>
            </div>
          </div>
        </div>

        {/* Message Analytics Card with Modern UI */}
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Message Analytics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Start Date:</label>
              <input
                type="datetime-local"
                value={messageStartDate}
                onChange={(e) => setMessageStartDate(e.target.value)}
                className="text-black p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">End Date:</label>
              <input
                type="datetime-local"
                value={messageEndDate}
                onChange={(e) => setMessageEndDate(e.target.value)}
                className="text-black p-2 rounded w-full"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={fetchMessageAnalyticsData}
              className="bg-white text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-blue-200 transition duration-300"
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                setMessageStartDate(getLastMonthDateTime());
                setMessageEndDate(getCurrentDateTime());
              }}
              className="bg-gray-200 text-pink-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-300 transition duration-300"
            >
              Set to Current
            </button>
          </div>
          <div className="mt-6">
            <div className="mb-4">
              <p className="text-lg font-bold">Total Messages Sent:</p>
              <p className="text-3xl font-bold text-shadow-sm">{totalSent}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-bold">Total Messages Delivered:</p>
              <p className="text-3xl font-bold text-shadow-sm">
                {totalDelivered}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pass data to CategoryTypeCards component */}
      <CategoryTypeCards
        categoryTotals={categoryTotals}
        typeTotals={typeTotals}
        conversationDirections={conversationDirections}
        totalConversations={totalConversations}
        totalCost={totalCost}
        totalSent={totalSent}
        totalDelivered={totalDelivered}
      />
    </div>
  );
};

export default AnalyticsDashboard;
