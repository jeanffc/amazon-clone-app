import { BrowserRouter } from 'react-router-dom';

import StoreProvider from './hooks';
import Routes from './routes';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Header />
        <Routes />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
