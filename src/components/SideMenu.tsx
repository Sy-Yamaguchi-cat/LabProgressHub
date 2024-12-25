import List, { ListProps } from "@mui/material/List";

import Drawer, { DrawerProps } from "@/layouts/Drawer";

import { useAtomValue } from "jotai";

import { isSideMenuOpen } from "@/states/layout";

export type Props = Omit<DrawerProps, "children"> & Pick<ListProps, "children">;

export default function SideMenu({ children, ...restProps }: Props) {
    const isOpen = useAtomValue(isSideMenuOpen);
    return <Drawer open={isOpen} {...restProps} >
        <List>
            {children}
        </List >
    </Drawer>
}
