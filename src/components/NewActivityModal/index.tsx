import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import type { NewActivityModalProps } from "./interface";
import { strings } from "../../constants";

export function NewActivityModal({ isOpen, closeModal, handleSubmit, editingActivity }: NewActivityModalProps) {

  const title = editingActivity
    ? strings.newActivityModal.editTitle
    : strings.newActivityModal.title;

  const buttonText = editingActivity
    ? strings.genericActions.saveEdit
    : strings.newActivityModal.buttonText;

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: 2,
          backgroundColor: "grey.50",
          width: "100%",
        },
      }}
    >
      <DialogTitle
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {title}

        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 2, 
            top: "50%",
            transform: "translateY(-90%)",
            color: "primary.main",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ paddingBottom: 1 }}>
        <Box
          id="activityForm"
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            required
            name="activityName"
            label={strings.newActivityModal.textFieldTitle}
            fullWidth
            defaultValue={editingActivity?.name ?? ""}
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ paddingX: 3 }}>
        <Button
          variant="contained"
          type="submit"
          form="activityForm"
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
