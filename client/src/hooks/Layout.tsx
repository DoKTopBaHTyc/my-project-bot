import { Outlet } from 'react-router';
import Navbar from '../ui/Navbar';

export default function Layout(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
