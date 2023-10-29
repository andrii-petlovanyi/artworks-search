import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { IItem } from "./interfaces/items.interface";
import { useState } from "react";
import constants from "./constants/constants";
import { SidebarContent } from "./components/SidebarContent";
import { MobileNav } from "./components/MobileNav";
import { LimitPerPage } from "./components/LimitPerPage";
import { ListItems } from "./components/ListItems";

function App(): React.JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listItems, setListItems] = useState<Array<IItem> | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(
    Number(window.localStorage.getItem(constants.LIMIT_PER_PAGE) ?? 20)
  );
  return (
    <Box minH="100vh" bg={"gray.50"} maxW={"2048px"} mx={"auto"}>
      <SidebarContent
        onClose={() => onClose}
        setListItems={setListItems}
        setIsLoading={setIsLoading}
        display={{ base: "none", md: "block" }}
        limit={limit}
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
            limit={limit}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={4} bg={"gray.50"}>
        <Flex mb={4} w={"100%"} justify={"flex-end"}>
          <LimitPerPage limit={limit} setLimit={setLimit} />
        </Flex>
        <ListItems listItems={listItems} isLoading={isLoading} limit={limit} />
      </Box>
    </Box>
  );
}

export default App;
