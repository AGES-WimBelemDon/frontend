import { BrowserRouter, Routes, Route } from "react-router";

import ErrorBoundary from "./ErrorBoundary";
import NotFound from "./NotFound";
import ActivityList from "../pages/Activity";
import AnamnesisForm from "../pages/Anamnese/Form";
import SelectForm from "../pages/Anamnese/SelectForm";
import ClassDetails from "../pages/ClassDetails";
import Classes from "../pages/Classes";
import Frequency from "../pages/Frequency";
import { FrequencyCall } from "../pages/FrequencyCall";
import FrequencyClasses from "../pages/FrequencyClasses";
import { FrequencyGeneralCall } from "../pages/FrequencyGeneralCall";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import ResponsibleRegistration from "../pages/ResponsibleRegistration";
import StudentRegistration from "../pages/StudentRegistration";
import Students from "../pages/Students";
import TechDemo from "../pages/TechDemo";
import TechDemoMockAPI from "../pages/TechDemo/MockAPI";
import Users from "../pages/Users";

function AppRouter() {
  return (
    <BrowserRouter basename="/frontend/">
      <ErrorBoundary>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="alunos" element={<Students />} />
            <Route path="alunos/cadastro" element={<StudentRegistration />} />
            <Route path="alunos/:id/editar" element={<StudentRegistration />} />
            <Route path="alunos/:id/responsaveis" element={<ResponsibleRegistration />} />
            <Route path="anamnese" element={<SelectForm />} />
            <Route path="anamnese/form/:id" element={<AnamnesisForm />} />
            <Route path="atividades" element={<ActivityList />} />
            <Route path="frequencias/atividades" element={<Frequency />}/>
            <Route path="frequencias/atividades/:id/turmas" element={<FrequencyClasses />}/>
            <Route path="frequencias/atividades/:id/turmas/:id/chamada" element={<FrequencyCall/>} />
            <Route path="frequencias/chamada-geral" element={<FrequencyGeneralCall/>} />
            <Route path="tech-demo" element={<TechDemo />}>
              <Route path=":id" element={<TechDemoMockAPI />} />
            </Route>
            <Route path="turmas" element={<Classes />} />
            <Route path="turmas/:id" element={<ClassDetails />} />
            <Route path="usuarios" element={<Users />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRouter;
