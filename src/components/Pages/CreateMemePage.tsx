import { Box, Card, Container, Typography } from "@mui/material"

export const CreateMemePage = () => {
  return (
    <Container>
      <Box>
        <Card>
          <Box>
            <Typography>Upload Image</Typography>
          </Box>
          <Box>
            <Typography>Your Quote</Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  )
}