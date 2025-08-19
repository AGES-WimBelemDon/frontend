import { BrowserRouter, Routes, Route } from 'react-router';

import Home from '../pages/Home/Home';
import TechDemo from '../pages/TechDemo';
import TechDemoMockAPI from '../pages/TechDemo/MockAPI.tsx';

function AppRouter() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route index element={<Home />} />
        <Route path="tech-demo" element={<TechDemo />}>
          <Route path=":id" element={<TechDemoMockAPI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
