import { Outlet } from 'react-router';
import Navbar from './ui/Navbar';

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
