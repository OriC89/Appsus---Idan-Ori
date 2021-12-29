const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { Home } from "./pages/home.jsx";
// import { BookApp } from "./pages/book-app.jsx";
// import { KeepApp } from "./pages/keep-app.jsx";
import { AppHeader } from './js/cmps/AppHeader.jsx';
import { EmailApp } from "./pages/email-app.jsx";

export function App() {
  return (
    <Router>
      <section className="app">
        <header className="main-header">
        <AppHeader />
        </header>
        <main>
          <h1>Hi</h1>
          <Switch>
            {/* <Route path="/" component={BookApp} />
            <Route path="/" component={KeepApp} />*/}
            <Route exact path="/email-app" component={EmailApp} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </section>
    </Router>
  )
}
