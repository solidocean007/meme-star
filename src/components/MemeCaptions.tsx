import { Box, Button, CardContent, List, ListItem, ListItemText, TextField } from "@mui/material"


export const MemeCaptions = ({captions}) => {
  return (
    <CardContent>
       <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {captions.map((caption, index) => (
            <ListItem key={index}>
              <ListItemText primary={caption.text} secondary={`by ${caption.user}`} />
            </ListItem>
          ))}
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