import { auth } from "./services/firebase/auth";
import PdfGenerator from "./pages/PdfGenerator";
import { Login } from "./pages/Login";
import "./global.css";
import { AuthLayout } from "./components/shared/layout/authLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingSpinner } from "./components/shared/LoadingSpinner";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <AuthLayout user={user}>
      <PdfGenerator />
    </AuthLayout>
  );
}

export default App;
