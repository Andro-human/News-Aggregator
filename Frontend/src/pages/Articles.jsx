import { Box } from "@mui/material";
import data from "../assets/data.json";
import CardComponent from "../components/CardComponent.jsx";

const Articles = () => {
  const articles = Array.from({ length: 10 });
  
  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "2rem"
      }}
    >
      {articles.map((_, index) => (
        <CardComponent key={index} data={data} />
      ))}
    </Box>
  );
};

export default Articles;
