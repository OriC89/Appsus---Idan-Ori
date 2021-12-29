const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { Home } from "./pages/home.jsx";
// import { BookApp } from "./pages/book-app.jsx";
// import { KeepApp } from "./pages/keep-app.jsx";
// import { MisterMail } from "./pages/mister-mail.jsx";
// import { MisterMail } from "./pages/mister-mail.jsx";
// import { EmailDetails } from "./pages/mister-mail/email-details.jsx";

export function App() {
  return (
    <Router>
      <section className="app">
        <header className="main-header">
          <h1>Appsus</h1>
        </header>
        <main>
          <Switch>
            {/* <Route path="/MisterMail/emailDetails" component={EmailDetails} />
            <Route path="/MisterMail/emailCompose" component={EmailCompose}/>
            <Route exact path="/MisterMail" component={EmailApp} />
            <Route path="/BookApp" component={BookApp} />
            <Route path="/KeepApp" component={KeepApp} /> */}
            {/* <Route path="/MisterMail" component={MisterMail} /> */}
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </section>
    </Router>
  );
}
