import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import './SuccessToast.css'; 

export default function SuccessToaster({ message }) {
  const [open, setOpen] = React.useState(true);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <div className="success-toast-container"> 
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={message}
        className="success-toast-snackbar" 
        action={[
          <IconButton key="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <Alert 
          onClose={handleClose} 
          severity="success"
          sx={{
            width: {
              xs: '80vw',
              sm: '50vw', 
              md: '30vw',
            },
            borderRadius: '10px',
            padding: {
              xs: '12px', 
              sm: '16px', 
              md: '20px', 
            }
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
