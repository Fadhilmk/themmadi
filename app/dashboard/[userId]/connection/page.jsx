"use client"
import ConnectionPage from "@/components/ConnectionPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useParams } from "next/navigation";

const Contacts = () => {
  const { userId } = useParams();
  if (!userId) return <p>Loading...</p>;
  return (
    <ProtectedRoute>
      <ConnectionPage userId={userId}/>
    </ProtectedRoute>
  );
};

export default Contacts;
