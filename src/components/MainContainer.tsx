import Main, { MainProps } from "@/layouts/Main";

import { useAtomValue } from "jotai";
import { isSideMenuOpen } from "@/states/layout";

export type Props = MainProps;

export default function MainContainer({ children, ...restProps }: MainProps) {
  const isOpen = useAtomValue(isSideMenuOpen);
  return (
    <Main open={isOpen} {...restProps}>
      {children}
    </Main>
  );
}
