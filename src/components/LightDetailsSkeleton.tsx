import Skeleton from "@mui/material/Skeleton";

export const LightDetailsSkeleton = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Skeleton
        variant="rectangular"
        width={375}
        height={50}
        sx={{ borderRadius: 2 }}
      />
      <Skeleton variant="text" width={300} sx={{ marginTop: 2 }} />
      <Skeleton
        variant="rectangular"
        width={250}
        height={500}
        sx={{
          borderRadius: 4,
          marginTop: 5,
        }}
      />
      <Skeleton variant="text" width={200} sx={{ marginTop: 6 }} />
      <Skeleton variant="text" width={150} sx={{ marginTop: 0.5 }} />
    </div>
  );
};
