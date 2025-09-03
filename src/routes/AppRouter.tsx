import { BrowserRouter, Routes, Route } from 'react-router';

import Frequency from '../pages/Frequency/index.tsx';
import Home from '../pages/Home/Home';
import TechDemo from '../pages/TechDemo';
import TechDemoMockAPI from '../pages/TechDemo/MockAPI.tsx';

function AppRouter() {
  return (
    <BrowserRouter basename='/frontend/'>
      <Routes>
        <Route index element={<Home />} />
        <Route path="tech-demo" element={<TechDemo />}>
          <Route path=":id" element={<TechDemoMockAPI />} />
        </Route>
        <Route path="frequencia" element={<Frequency/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
