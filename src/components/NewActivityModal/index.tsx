import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";

import type { NewActivityModalProps } from "./interface";
import { strings } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { theme } from "../../styles/theme";

const BACKGROUND_STYLE = {
  position: "fixed" as const,
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  backdropFilter: "blur(6px)",
  zIndex: "1000",
  alignContent: "center"
};

const MODAL_STYLE = {
  backgroundColor: theme.palette.background.default,
  width: 621,
  height: 191,
  borderRadius: 12,
  margin: "auto",
  display: "flex" as const,
  flexDirection: "column" as const,
  justifyContent: "center" as const,
  alignItems: "center" as const,
  gap: 16,
};

export function NewActivityModal({ isOpen, setModalOpen }: NewActivityModalProps) {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [, setError] = useState<string>("");

  if (!isOpen) return null;
  const validate = () => {
    const onlyLettersRegex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!name.trim()) {
      setError("Campo obrigatório");
      showToast(strings.newResponsibleModal.pleaseFillAllFields, "error", true);
      return false;
    }
    if (!onlyLettersRegex.test(name)) {
      setError("Use apenas letras (sem números ou símbolos)");
      showToast(strings.newActivityModal.numberSymbolError, "error", true);
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    showToast(strings.newActivityModal.sucessToast, "success", true);
    setModalOpen(false);
  };

  return (
    <div style={BACKGROUND_STYLE}>
      <form
        style={MODAL_STYLE}
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: 561,
            height: 42
          }}
        >
          <div></div>
          <Typography variant="h6" fontWeight={"Bold"}>
            {strings.newActivityModal.title}
          </Typography>

          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ color: theme.palette.primary.main }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: 561,
            height: 57
          }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "regular",
              fontSize: 12,
            }}>
            {strings.newActivityModal.textFieldTitle}
          </Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={strings.newActivityModal.textFieldPlaceholder}
            InputProps={{
              sx: {
                width: 561,
                height: 37
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: 561,
            height: 52
          }}>
          <Button
            variant="contained"
            type="submit"
            onClick={validate}
            sx={{
              width: 100,
              height: 37,
              backgroundColor: theme.palette.primary.main,
              fontWeight: "bold",
              fontSize: 14,
              textTransform: "none"
            }}>
            {strings.newActivityModal.buttonText}
          </Button>
        </Box>
      </form>
    </div>
  );
}
