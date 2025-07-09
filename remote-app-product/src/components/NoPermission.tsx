import { Box, Alert, AlertTitle, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NoPermission() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="60vh"
    >
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon fontSize="inherit" />}
        sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}
      >
        <AlertTitle sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้
        </AlertTitle>
      </Alert>
      <Typography mt={4} color="text.secondary">
        กรุณาติดต่อผู้ดูแลระบบหากคิดว่านี่เป็นข้อผิดพลาด
      </Typography>
    </Box>
  );
}
