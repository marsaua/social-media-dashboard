import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRef, useState, useEffect } from "react";
import { EditPost } from "./EditPost";
import { DeletePost } from "./DeletePost";

export default function MediaCard({ post }) {
  const { image, description, title } = post;
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [description]);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
      <CardMedia sx={{ height: 140 }} image={image ? image : "./no-image.png"} title={title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Typography
          ref={descriptionRef}
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: expanded ? "none" : 10,
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>

        {isClamped && (
          <Button size="small" onClick={toggleExpanded}>
            {expanded ? "Show less" : "Show more"}
          </Button>
        )}
      </CardContent>
      <CardActions>
        <DeletePost post={post} />
        <EditPost post={post} />
      </CardActions>
    </Card>
  );
}
