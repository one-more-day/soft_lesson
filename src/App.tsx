import "@/App.css";
import { AuthProvider } from "@/contexts/auth";
import { MainRouter } from "@/routes";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
