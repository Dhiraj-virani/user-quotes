import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Comments from "../components/comments/Comments";
import HighLightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
// const Dummy_Quotes = [
//   {
//     id: "q1",
//     author: "Robert",
//     text: "Financial Freedom is the key to success",
//   },
//   {
//     id: "q2",
//     author: "Jason",
//     text: "Crypto trading new path of investment",
//   },
// ];
const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    <div className="centered">
      <LoadingSpinner />
    </div>;
  }

  if (error) {
    <p className="centered">{error}</p>;
  }

  if (!loadedQuote) {
    return <p>No Quote found!!</p>;
  }

  return (
    <Fragment>
      <HighLightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
