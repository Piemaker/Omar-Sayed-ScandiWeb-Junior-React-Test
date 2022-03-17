import { apolloClient } from "../App";

const fetchData = async (parameter = "", query, setState) => {
  const { data, loading, error } = await apolloClient.query({
    query,
    variables: { parameter },
  });

  console.log("🚀 ~ file: fetchData.js ~ line 8 ~ fetchData ~ data, loading, error", data, loading, error)
  setState({ data, loading, error });
};

export default fetchData;
