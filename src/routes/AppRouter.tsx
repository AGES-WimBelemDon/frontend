import { BrowserRouter, Routes, Route } from 'react-router';

import Home from '../pages/Home/Home';
import TechDemo from '../pages/TechDemo';
import TechDemoChild from '../pages/TechDemo/Child.tsx';

function AppRouter() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route index element={<Home />} />
        <Route path="tech-demo" element={<TechDemo />}>
          <Route path=":id" element={<TechDemoChild />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
