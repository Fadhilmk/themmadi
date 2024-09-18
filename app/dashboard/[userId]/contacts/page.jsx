"use client"
import ImportPage from "@/components/Import";
import Preloader from "@/components/Preloader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useParams } from "next/navigation";

const Contacts = () => {
  const { userId } = useParams();
  if (!userId) return <Preloader />;
  return (
    <ProtectedRoute>
      <ImportPage userId={userId}/>
    </ProtectedRoute>
  );
};

export default Contacts;
