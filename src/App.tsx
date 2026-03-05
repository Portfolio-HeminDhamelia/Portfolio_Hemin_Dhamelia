import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingProvider";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(
  () => import("./components/MainContainer") as Promise<{ default: React.ComponentType<React.PropsWithChildren> }>
);
const AdminPage = lazy(() => import("./components/AdminPage"));

const PortfolioHome = () => (
  <LoadingProvider>
    <Suspense>
      <MainContainer>
        <Suspense>
          <CharacterModel />
        </Suspense>
      </MainContainer>
    </Suspense>
  </LoadingProvider>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
