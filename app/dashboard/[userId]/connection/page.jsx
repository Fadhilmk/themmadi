"use client"
import ConnectionPage from "@/components/ConnectionPage";
import Preloader from "@/components/Preloader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useParams } from "next/navigation";

const Contacts = () => {
  const { userId } = useParams();
  if (!userId) return <Preloader />;
  return (
    <ProtectedRoute>
      <ConnectionPage userId={userId}/>
    </ProtectedRoute>
  );
};

export default Contacts;
