import { useQuery } from "@apollo/client";
import { client, getPageQuery } from "./apollo";

function App() {
  const { data, loading } = useQuery(getPageQuery, {
    client,
    fetchPolicy: "cache-and-network",
    variables: {
      pageId: "welcome-page",
    },
  });

  return (
    <div>
      {loading && <h1>Loading with Apollo....</h1>}
      {!loading && (
        <>
          <h1>
            Apollo "cache-and-network" response, see network request for acual
            data.
          </h1>
          <p>
            <b>
              Notice the missing data in "MetadataItemString" and "PosterLabels"
            </b>
          </p>
          <p>{JSON.stringify(data, undefined, 4)}</p>
        </>
      )}
    </div>
  );
}

export default App;
