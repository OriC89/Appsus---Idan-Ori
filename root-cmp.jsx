const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { Home } from "./pages/home.jsx";
// import { BookApp } from "./pages/book-app.jsx";
// import { KeepApp } from "./pages/keep-app.jsx";
import { AppHeader } from './js/cmps/AppHeader.jsx';
import { EmailApp } from "./pages/email-app.jsx";
import { AppFooter } from './js/cmps/AppFooter.jsx'
import { About } from './pages/About.jsx';

export function App() {
  return (
    <Router>
      <section className="app">
        <header className="main-header">
          <AppHeader />
        </header>
        <main>
          <Switch>
            {/* <Route path="/" component={BookApp} />*/}
            <Route exact path="/email-app" component={EmailApp} />
            {/* <Route path="/" component={KeepApp} /> */}
            <Route path="/about" component={About} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
        <footer>
          <AppFooter />
        </footer>
      </section>
    </Router>
  )
}
