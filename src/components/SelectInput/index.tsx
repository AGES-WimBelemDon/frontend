import { Box, Select, Typography } from '@mui/material';

export function SelectInput({ label, options }: { label: string, options: string[] }) {
    return (
        <Box>
            <Typography fontSize={16} fontWeight='bold'>
                {label}
            </Typography>
            <Select
                native
                id="select"
                variant="standard"
                fullWidth
                defaultValue= ""
                sx={{
                    width: "300px",
                    marginTop: "1px",
                }}
            >
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </Select>
        </Box>
    );
}