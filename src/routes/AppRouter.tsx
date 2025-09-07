import { BrowserRouter, Routes, Route } from 'react-router';

import Frequency from '../pages/Frequency';
import FrequencyClasses from '../pages/FrequencyClasses/index.tsx';
import Home from '../pages/Home';
import Layout from '../pages/Layout';
import TechDemo from '../pages/TechDemo';
import TechDemoMockAPI from '../pages/TechDemo/MockAPI.tsx';

function AppRouter() {
  return (
    <BrowserRouter basename='/frontend/'>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="frequencia" element={<Frequency />} />
          <Route path="turmas" element={<FrequencyClasses />} />
          <Route path="tech-demo" element={<TechDemo />}>
            <Route path=":id" element={<TechDemoMockAPI />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
