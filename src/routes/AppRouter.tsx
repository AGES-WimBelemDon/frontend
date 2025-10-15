import { BrowserRouter, Routes, Route } from "react-router";

import ActivityList from "../pages/Activity";
import AnamnesisForm from "../pages/Anamnese/Form/index.tsx";
import SelectForm from "../pages/Anamnese/SelectForm/";
import Classes from "../pages/Classes";
import Frequency from "../pages/Frequency";
import { FrequencyCall } from "../pages/FrequencyCall";
import FrequencyClasses from "../pages/FrequencyClasses";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import ResponsibleRegistration from "../pages/ResponsibleRegistration";
import StudentRegistration from "../pages/StudentRegistration";
import Students from "../pages/Students";
import TechDemo from "../pages/TechDemo";
import TechDemoMockAPI from "../pages/TechDemo/MockAPI.tsx";
import Users from "../pages/Users";

function AppRouter() {
  return (
    <BrowserRouter basename="/frontend/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="alunos" element={<Students />} />
          <Route path="alunos/cadastro" element={<StudentRegistration />} />
          <Route
            path="alunos/:id/responsaveis"
            element={<ResponsibleRegistration />}
          />
          <Route path="atividades" element={<ActivityList />} />
          <Route path="anamnese" element={<SelectForm />} />
          <Route path="anamnese/form/:id" element={<AnamnesisForm />} />
          <Route path="frequencias/atividades" element={<Frequency />} />
          <Route
            path="frequencias/atividades/:id/turmas"
            element={<FrequencyClasses />}
          />
          <Route
            path="frequencias/atividades/:id/turmas/:id/chamada"
            element={<FrequencyCall />}
          />
          <Route path="tech-demo" element={<TechDemo />}>
            <Route path=":id" element={<TechDemoMockAPI />} />
          </Route>
          <Route path="turmas" element={<Classes />} />
          <Route path="usuarios" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
