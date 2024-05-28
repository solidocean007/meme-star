// MemeCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { MemeType } from '../Utils/types';
import { MemeCaptions } from './MemeCaptions';

const MemeCard = ({ meme }:{meme: MemeType}) => {
  const [newCaption, setNewCaption] = React.useState("");
  const [captions , setCaptions] = useState([]); // i should probably think about how this component will know about the captions for this meme

  const handleAddCaption = () => {
    onAddCaption(newCaption);
    setNewCaption("");
  };
  return (
    <Card sx={{ maxWidth: 345, position: 'relative', m: 2 }}>
      <CardMedia
        component="img"
        height="250"
        image={meme.imageUrl}
        // alt={meme.altImageText}
      />
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
        padding: '8px'
      }}>
        <Typography variant="body2" color="text.primary" component="p">
          {meme.caption}
        </Typography>
      </Box>
      <MemeCaptions newCaption={newCaption} setNewCaption={setNewCaption} handleAddCaption={handleAddCaption}/>
    </Card>
  );
};

export default MemeCard;


