import { Box } from "@mui/material";
import CardComponent from "../components/CardComponent.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
    try {
      const api = `${import.meta.env.VITE_SERVER_URL}api/v1/articles`;
      const response = await axios.get(api);
      setArticles(response.data.data);
      console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const articles = Array.from({ length: 10 });

  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      {articles.map((item, index) => (
        <CardComponent key={index} data={item} fetchData={fetchData} />
      ))}
    </Box>
  );
};

export default Articles;
