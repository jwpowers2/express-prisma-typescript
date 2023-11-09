import * as React from "react";
import { useState, useEffect } from "react";
// import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setFeedbackMessage } from "../imageSlice";

const style = {
  position: "absolute",
  top: "20%",
  left: "80%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function FeedBack() {
  const [open, setOpen] = useState(false);
  const feedbackMessage = useSelector(state => state.feedbackMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(feedbackMessage)
    if (feedbackMessage) {
      if (feedbackMessage.length > 0) {
        setOpen(true);
        setTimeout(() => {
          dispatch(setFeedbackMessage(""));
          setOpen(false);
        }, 1000);
      }
    }
  }, [feedbackMessage]);
  return (
    <Box component="div">
      {open && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          hideBackdrop={true}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {feedbackMessage}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      )}
    </Box>
  );
}
// export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);