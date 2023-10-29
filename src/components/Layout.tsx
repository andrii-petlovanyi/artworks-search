import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { SidebarContent } from "./SidebarContent";
import { MobileNav } from "./MobileNav";
import { IItem } from "../interfaces/items.interface";
import { ListItems } from "./ListItems";

export default function Layout(): React.JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listItems, setListItems] = useState<Array<IItem>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Box minH="100vh" bg={"gray.50"} maxW={"2048px"} mx={"auto"}>
      <SidebarContent
        onClose={() => onClose}
        setListItems={setListItems}
        setIsLoading={setIsLoading}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            setListItems={setListItems}
            setIsLoading={setIsLoading}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={4} bg={"gray.50"}>
        {isLoading ? (
          <Spinner
            size={"md"}
            colorScheme={"purple"}
            mx={"center"}
            my={"center"}
          />
        ) : (
          <ListItems listItems={listItems} />
        )}
      </Box>
    </Box>
  );
}
