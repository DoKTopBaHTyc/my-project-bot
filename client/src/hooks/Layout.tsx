import { Outlet } from 'react-router';
import NavBar from '../components/ui/NavBar';

export default function Layout(): React.JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
