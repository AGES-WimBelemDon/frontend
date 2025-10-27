import { useState, useEffect } from "react";

import { Box, Typography, MenuItem, Select } from "@mui/material";

import { useDateInput } from "./hook";
import { strings } from "../../../constants";

export function DateInput({ id, label }: { id: string, label: string }) {
  const { setDate, searchParams } = useDateInput();
  const value = searchParams.get(`date${id}`);
  
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split("-");
      setDay(d || "");
      setMonth(m || "");
      setYear(y || "");
    }
  }, [value]);

  const handleDateChange = (newDay: string, newMonth: string, newYear: string) => {
    if (newDay && newMonth && newYear) {
      const dateString = `${newYear}-${newMonth.padStart(2, "0")}-${newDay.padStart(2, "0")}`;
      setDate(dateString, id);
    } else if (!newDay && !newMonth && !newYear) {
      setDate("", id);
    }
  };

  // Função para calcular o número de dias no mês
  const getDaysInMonth = (monthValue: string, yearValue: string): number => {
    if (!monthValue) return 31;
    if (!yearValue) yearValue = new Date().getFullYear().toString();
    
    const monthNum = parseInt(monthValue, 10);
    const yearNum = parseInt(yearValue, 10);
    
    return new Date(yearNum, monthNum, 0).getDate();
  };

  const daysInSelectedMonth = getDaysInMonth(month, year);
  const dayOptions = Array.from({ length: daysInSelectedMonth }, (_, i) => {
    const dayNum = i + 1;
    return { value: dayNum.toString().padStart(2, "0"), label: dayNum.toString().padStart(2, "0") };
  });

  const months = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2025 + i);

  return (
    <Box sx={{ paddingY: 1, width: "100%" }}>
      <Typography 
        fontSize={15} 
        fontWeight="600" 
        color="text.primary" 
        sx={{ mb: 1.2 }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: { xs: 1, sm: 1.5 }, alignItems: "flex-end", flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: { xs: 1, sm: 0 }, minWidth: { xs: "0", sm: "70px" } }}>
          <Typography 
            fontSize={13} 
            color="grey.600" 
            fontWeight="500"
            sx={{ mb: 0.5, ml: 0.5 }}
          >
            {strings.dateInput.day}
          </Typography>
          <Select
            value={day}
            data-cy="date-input-day"
            onChange={(e) => {
              setDay(e.target.value);
              handleDateChange(e.target.value, month, year);
            }}
            displayEmpty
            sx={{
              width: "100%",
              height: "40px",
              borderRadius: 1.5,
              fontSize: 14,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.300",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
                borderWidth: "2px",
              },
              "& .MuiSelect-select": {
                padding: "8px 12px",
                textAlign: "center",
              }
            }}
          >
            <MenuItem value="" disabled sx={{ fontSize: 14 }}>
              dd
            </MenuItem>
            {dayOptions.map((d) => (
              <MenuItem key={d.value} value={d.value} sx={{ fontSize: 14 }}>
                {d.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flex: { xs: 1, sm: 0 }, minWidth: { xs: "0", sm: "70px" } }}>
          <Typography 
            fontSize={13} 
            color="grey.600" 
            fontWeight="500"
            sx={{ mb: 0.5, ml: 0.5 }}
          >
            {strings.dateInput.month}
          </Typography>
          <Select
            value={month}
            data-cy="date-input-month"
            onChange={(e) => {
              const newMonth = e.target.value;
              setMonth(newMonth);
              
              // Ajusta o dia se o dia atual não existir no novo mês
              const maxDays = getDaysInMonth(newMonth, year);
              const currentDay = parseInt(day, 10);
              if (currentDay > maxDays) {
                const adjustedDay = maxDays.toString().padStart(2, "0");
                setDay(adjustedDay);
                handleDateChange(adjustedDay, newMonth, year);
              } else {
                handleDateChange(day, newMonth, year);
              }
            }}
            displayEmpty
            sx={{
              width: "100%",
              height: "40px",
              borderRadius: 1.5,
              fontSize: 14,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.300",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
                borderWidth: "2px",
              },
              "& .MuiSelect-select": {
                padding: "8px 12px",
                textAlign: "center",
              }
            }}
          >
            <MenuItem value="" disabled sx={{ fontSize: 14 }}>
              mm
            </MenuItem>
            {months.map((m) => (
              <MenuItem key={m.value} value={m.value} sx={{ fontSize: 14 }}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flex: { xs: 1, sm: 0 }, minWidth: { xs: "0", sm: "90px" } }}>
          <Typography 
            fontSize={13} 
            color="grey.600" 
            fontWeight="500"
            sx={{ mb: 0.5, ml: 0.5 }}
          >
            {strings.dateInput.year}
          </Typography>
          <Select
            value={year}
            data-cy="date-input-year"
            onChange={(e) => {
              const newYear = e.target.value;
              setYear(newYear);
              
              // Ajusta o dia se for 29 de fevereiro em ano não bissexto
              if (month === "02" && day === "29") {
                const maxDays = getDaysInMonth(month, newYear);
                if (maxDays === 28) {
                  setDay("28");
                  handleDateChange("28", month, newYear);
                  return;
                }
              }
              handleDateChange(day, month, newYear);
            }}
            displayEmpty
            sx={{
              width: "100%",
              height: "40px",
              borderRadius: 1.5,
              fontSize: 14,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.300",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
                borderWidth: "2px",
              },
              "& .MuiSelect-select": {
                padding: "8px 12px",
                textAlign: "center",
              }
            }}
          >
            <MenuItem value="" disabled sx={{ fontSize: 14 }}>
              aaaa
            </MenuItem>
            {years.map((y) => (
              <MenuItem key={y} value={y.toString()} sx={{ fontSize: 14 }}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  );
}
