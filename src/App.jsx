import './App.scss';
import {
  Navbar,
  Home,
  News,
  Cryptocurrencies,
  Exchanges,
  CryptoDetails,
  Footer,
} from './components';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <>
      <HashRouter>
        <div className="app">
          <Navbar />
          <div className="routes">
            <div className="main_content">
              <Switch>
                <Route exact path={'/'}>
                  <Home />
                </Route>
                <Route path={'/cryptocurrencies'}>
                  <Cryptocurrencies />
                </Route>
                <Route path={'/crypto/:coinId'}>
                  <CryptoDetails />
                </Route>
                <Route path={'/exchanges'}>
                  <Exchanges />
                </Route>
                <Route path={'/news'}>
                  <News />
                </Route>
              </Switch>
            </div>
            <footer className="footer_content">
              <Footer />
            </footer>
          </div>
        </div>
      </HashRouter>
    </>
  );
};

export default App;
