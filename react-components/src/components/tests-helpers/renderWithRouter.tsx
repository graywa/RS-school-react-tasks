import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import AppRouter from '../app-router/AppRouter';

export const renderWidthRouter = (component: JSX.Element, initRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initRoute]}>
      {/* <AppRouter /> */}
      {component}
    </MemoryRouter>
  );
};
