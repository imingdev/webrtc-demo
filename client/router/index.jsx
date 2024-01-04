import React, { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './routes';

const RenderRoutes = () => useRoutes(routes);

const Router = () => (
  <BrowserRouter>
    <Suspense>
      <RenderRoutes />
    </Suspense>
  </BrowserRouter>
);

export default Router;
