import { Box, Button, CardContent, List, ListItem, ListItemText, TextField } from "@mui/material"
import { useState } from "react";
import { QuoteType } from "../Utils/types";


export const MemeQuotes = ({quotes}:{quotes: QuoteType[]}) => {
  const [newCaption, setNewCaption] = useState('');
 
  return (
    <CardContent>
       <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
       {/* Types of parameters 'quote' and 'value' are incompatible. */}
       {quotes && quotes.length > 0 ? (
          quotes.map((quote, index) => (
            <ListItem key={index}>
              <ListItemText primary={quote.text} secondary={`by ${quote.userId}`} /> {/* Assuming userId exists, replace with user details if available */}
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No quotes available for this meme." />
          </ListItem>
        )}
        </List>
        <Box sx={{ my: 2 }}>
          <TextField
            fullWidth
            variant="outlined"


            label="Add a caption"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
          />
          {/* <Button onClick={handleAddCaption} variant="contained" color="primary"> */}
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>
    </CardContent>
  )
}