import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import AllQuote from "./Pages/AllQuotes";
// import NewQuote from "./Pages/NewQuotes";
// import NotFound from "./Pages/NotFound";
// import QuoteDetail from "./Pages/QuoteDetails";

const NewQuote = React.lazy(() => import("./Pages/NewQuotes"));
const AllQuote = React.lazy(() => import("./Pages/AllQuotes"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const QuoteDetail = React.lazy(() => import("./Pages/QuoteDetails"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuote />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
