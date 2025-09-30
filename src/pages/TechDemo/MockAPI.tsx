import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";

import { pt } from "../../constants";
import { getTechDemo } from "../../services/tech-demo";

function MockAPI() {
  const { id } = useParams();
  const [searchParams] =  useSearchParams();
  const c2 = searchParams.get("c2");

  const { isPending, error: apiError, data, isFetching } = useQuery({
    queryKey: ["techDemo", id],
    queryFn: getTechDemo,
  });

  if (isPending) {
    return (
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (apiError) {
    return (
      <Typography color="error">{pt.techDemo.children.mockAPI.apiError({ message: apiError.message })}</Typography>
    );
  }

  return (
    <Stack mt={4} spacing={2}>
      <Typography variant="h2" data-cy="tech-demo-api-full-name">{data.full_name}</Typography>
      <Typography variant="body1" data-cy="tech-demo-api-description">{data.description}</Typography>
      <Stack direction="row" spacing={4}>
        <Typography data-cy="tech-demo-api-subscribers-count">👀 {data.subscribers_count}</Typography>
        <Typography data-cy="tech-demo-api-stargazers-count">✨ {data.stargazers_count}</Typography>
        <Typography data-cy="tech-demo-api-forks-count">🍴 {data.forks_count}</Typography>
      </Stack>
      {isFetching && <Typography mt={1}>{pt.techDemo.fetching}</Typography>}
      {c2 && <Typography variant="body2">{pt.techDemo.children.mockAPI.detail({ c2 })}</Typography>}
    </Stack>
  );
}

export default MockAPI;
