import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase/auth";
import PdfGenerator from "./pages/PdfGenerator";
import { Login } from "./pages/Login";
import { AuthLayout } from "./components/shared/layout/authLayout";
import { LoadingSpinner } from "./components/shared/LoadingSpinner";
import "./global.css";

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
