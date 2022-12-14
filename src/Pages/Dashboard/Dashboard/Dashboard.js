import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <p className="p-5 text-center">
        Hello, {user?.displayName}. please use the buttons to do any actions
      </p>
    </div>
  );
};

export default Dashboard;
