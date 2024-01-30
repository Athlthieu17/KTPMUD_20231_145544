import { PropsWithChildren, useEffect } from "react";
import MainLayout from "../Layout";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children, isShowAction }) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/signin", { replace: true });
    }
  }, [navigate, user]);

  return (
    <>
      <MainLayout isShowAction={isShowAction}>{children} </MainLayout>
    </>
  );
}
