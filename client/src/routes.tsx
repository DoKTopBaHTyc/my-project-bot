import type { RouteObject } from 'react-router';
import ErrorPage from './pages/ErrorPage';
import EvenLessMain from './pages/EvenLessMain';
import MainPage from './pages/MainPage';
import NotMainPage from './pages/NotMainPage';
import TotallyNotMain from './pages/TotallyNotMain';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/not-main',
    element: <NotMainPage />,
  },
  {
    path: '/even-less-main',
    element: <EvenLessMain />,
  },
  {
    path: '/totally-not-main',
    element: <TotallyNotMain />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];
