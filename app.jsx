const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { Home } from "./pages/home.jsx";
import { BookApp } from "./pages/book-app.jsx";
import { KeepApp } from "./pages/keep-app.jsx";
import { MisterMail } from "./pages/mister-mail.jsx";

export function App() {
  return (
    <Router>
      <section className="app">
        <header className="main-header">
          <h1>Appsus</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={BookApp} />
            <Route exact path="/" component={KeepApp} />
            <Route exact path="/" component={MisterMail} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </section>
    </Router>
  );
}
