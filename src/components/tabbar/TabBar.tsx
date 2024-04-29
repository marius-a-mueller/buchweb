import { MenuItem } from "./MenuItem"
import { Button } from "@mui/material";

export const TabBar = () => {
    return (
        <div>
            <Button variant="outlined">Home</Button>
            <MenuItem name="About" />
            <MenuItem name="Contact" />
        </div>
    )
}