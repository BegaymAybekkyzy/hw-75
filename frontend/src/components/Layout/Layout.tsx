import AppToolbar from "../AppToolbar/AppToolbar.tsx";
import {Container} from "@mui/material";
import {PropsWithChildren} from "react";
import * as React from "react";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <AppToolbar/>
            <Container sx={{mt: 4}}>
                {children}
            </Container>
        </>
    );
};

export default Layout;