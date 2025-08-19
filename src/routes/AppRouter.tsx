import { BrowserRouter, Routes, Route } from 'react-router';

import Home from '../pages/Home/Home';
import TechDemo from '../pages/TechDemo';

function AppRouter() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route index element={<Home />} />
        <Route path="tech-demo/:id" element={<TechDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
