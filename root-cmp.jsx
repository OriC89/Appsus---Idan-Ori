const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { AppHeader } from "./js/cmps/AppHeader.jsx";
import { EmailApp } from "./js/apps/mail/pages/email-app.jsx";
import { KeepApp } from "./js/apps/keep/pages/KeepApp.jsx";
import { About } from "./pages/About.jsx";
import { Home } from "./pages/home.jsx";
// import { BookApp } from "./pages/book-app.jsx";
import { AppFooter } from "./js/cmps/AppFooter.jsx";
import { UserMsg } from "./js/cmps/UserMsg.jsx";

export function App() {
  return (
    <Router>
      <section className="app">
        <header className="main-header">
          <AppHeader />
        </header>
        <main>
          <Switch>
            <Route path="/email-app" component={EmailApp} />
            <Route path="/notes" component={KeepApp} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
        <UserMsg />
        <footer>
          {/* <AppFooter /> */}
        </footer>
      </section>
    </Router>
  );
}
