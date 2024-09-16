import { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import Like from "../assets/Like.jsx";
import Dislike from "../assets/Dislike.jsx";
import moment from "moment";
import axios from "axios";
import { useUser } from "../userContext";

const CardComponent = ({ data, fetchData }) => {
  console.log("CardComponent ", data);
  const [likeColor, setLikeColor] = useState("#f6f6f6");
  const [disLikeColor, setDislikeColor] = useState("#f6f6f6");

  const { user } = useUser();

  const likeButton = async () => {
    setLikeColor((prevColor) =>
      prevColor === "#f6f6f6" ? "black" : "#f6f6f6"
    );
    setDislikeColor("#f6f6f6");

    await axios.put(`${import.meta.env.VITE_SERVER_URL}api/v1/articles`, {
      articleId: data._id,
      userId: user._id,
      voteStatus: "upvoted",
    });

    await fetchData();

    console.log("buttons pressed");
  };

  const dislikeButton = async () => {
    setDislikeColor((prevColor) =>
      prevColor === "#f6f6f6" ? "black" : "#f6f6f6"
    );
    setLikeColor("#f6f6f6");

    await axios.put(`${import.meta.env.VITE_SERVER_URL}api/v1/articles`, {
      articleId: data._id,
      userId: user._id,
      voteStatus: "downvoted",
    });

    await fetchData();
    console.log("buttons pressed");
  };

  const handleLikeButton = () => {};

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem 0rem",
        transition: "all 0.5s",
        cursor: "pointer",
        backgroundColor: "#f6f6f6",
        padding: "1rem",
        width: {
          sm: "34rem",
        },
        "&:hover": {
          transform: "translateX(-0.4vmax) translateY(-0.4vmax)",
          boxShadow: "0px 6px 15px rgba(53, 53, 53,  0.363)",
        },
      }}
    >
      <Box
        component="img"
        src={data.urlToImage}
        alt="article photo"
        sx={{
          width: "370px",
          height: "200px",
          margin: "1rem",
          boxShadow:
            "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          margin: "1rem",
          width: "80%",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          sx={{
            fontWeight: "400",
            fontSize: {
              xs: "18px",
              sm: "18px",
            },
            color: "rgb(94, 94, 94)",
          }}
        >
          {data.author}
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
          }}
        ></Box>
        <Typography
          sx={{
            color: "rgb(94, 94, 94)",
            fontSize: {
              xs: "15px",
              sm: "17px",
            },
          }}
        >
          {moment(data.publishedAt).format("MMMM D, YYYY")}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        align="center"
        sx={{
          margin: "1rem",
          color: "rgb(94, 94, 94)",
          fontWeight: "400",
          lineHeight: "1.5",
          fontSize: {
            xs: "15px",
            sm: "17px",
          },
        }}
      >
        {data.title}{" "}
      </Typography>
      {/* <Typography
    sx={{
      display: "block",
      margin: "0.5rem 0",
      color: "rgb(94, 94, 94)",
      fontWeight: "400",
      // lineHeight: "1.5",
      // wordWrap: "break-word",
    }}
  >
    {data.description}{" "}
  </Typography> */}

      <Typography
        sx={{
          margin: "1rem 0",
          color: "rgb(27, 27, 27)",
          fontSize: {
            xs: "15px",
            sm: "17px",
          },
          fontFamily: "'Josefin Sans', Arial, sans-serif",
        }}
      >
        {data.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "3rem",
        }}
      >
        <Box
          onClick={likeButton}
          sx={{
            width: "2rem",
            height: "2rem",
            margin: "1rem 0",
            display: "inline-block",
            backgroundColor: likeColor,
          }}
        >
          <Like />
          {data.upvote}
        </Box>
        <Box
          onClick={dislikeButton}
          sx={{
            width: "2rem",
            height: "2rem",
            margin: "1rem 0",
            backgroundColor: disLikeColor,
          }}
        >
          <Dislike />
          {data.downvote}
        </Box>
      </Box>
      <Typography
        align="center"
        sx={{
          margin: "2rem",
          color: "rgb(27, 27, 27)",
        }}
      >
        Total Votes: {data.totalVotes}
      </Typography>
    </Card>
  );
};

export default CardComponent;
