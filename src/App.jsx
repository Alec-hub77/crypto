import './App.scss';
import { Navbar, Home, News, Cryptocurrencies, Exchanges, CryptoDetails, Footer  } from './components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';


const App = () => {
  return (
    <>
      <BrowserRouter>
    <div className="app">
        <Navbar />
        <div className="routes">
          <Switch>
            <Route exact path={'/'}>
              <Home />
            </Route>
            <Route  path={'/cryptocurrencies'}>
              <Cryptocurrencies />
            </Route>
            <Route  path={'/crypto/:coinId'}>
              <CryptoDetails />
            </Route>
            <Route path={'/exchanges'}>
              <Exchanges />
            </Route>
            <Route path={'/news'}>
              <News />
            </Route>
          </Switch>
        <Footer/>
        </div>
    </div>
      </BrowserRouter>
    </>
  );
};

export default App;
