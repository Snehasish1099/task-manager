import { RouterProvider } from 'react-router';
import routes from '../src/routes/index'
import './index.css';

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
