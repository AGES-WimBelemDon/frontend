import { BrowserRouter, Routes, Route } from "react-router";

import Frequency from "../pages/Frequency";
import { FrequencyCall } from "../pages/FrequencyCall/index.tsx";
import FrequencyClasses from "../pages/FrequencyClasses";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import StudentRegistration from "../pages/StudentRegistration/index.tsx";
import TechDemo from "../pages/TechDemo";
import TechDemoMockAPI from "../pages/TechDemo/MockAPI.tsx";
import Users from "../pages/Users";

function AppRouter() {
  return (
    <BrowserRouter basename="/frontend/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="frequencias/atividades" element={<Frequency />}/>
          <Route path="frequencias/atividades/:id/turmas" element={<FrequencyClasses />}/>
          <Route path="frequencias/atividades/:id/turmas/:id/chamada" element={<FrequencyCall/>} />
          <Route path="cadastro" element={<StudentRegistration />} />
          <Route path="tech-demo" element={<TechDemo />}>
            <Route path=":id" element={<TechDemoMockAPI />} />
          </Route>
          <Route path="usuarios" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
