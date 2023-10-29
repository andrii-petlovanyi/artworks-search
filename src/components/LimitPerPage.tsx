import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import constants from "../constants/constants";

const limitsList: Array<number> = [20, 50, 100];

interface Props {
  limit: number;
  setLimit: (limit: number) => void;
}

export const LimitPerPage = (props: Props): React.JSX.Element => {
  const { limit, setLimit } = props;

  const handleChangeLimit = (limit: number) => {
    window.localStorage.setItem(
      constants.LIMIT_PER_PAGE,
      JSON.stringify(limit)
    );
    setLimit(limit);
  };

  return (
    <Menu>
      <MenuButton
        width="65px"
        bg={"white"}
        as={Button}
        size={"sm"}
        px="10px"
        border="1px solid"
        fontWeight="500"
        borderColor="gray.400"
        rightIcon={<ChevronDownIcon />}
        _focus={{ bg: "gray.50" }}
        _active={{ bg: "gray.50" }}
        _hover={{ bg: "gray.50" }}
      >
        {limit}
      </MenuButton>
      <MenuList borderColor="borderColor" minW={"0"} width={"65px"}>
        {limitsList.map((itemLimit: number) => (
          <MenuItem
            key={itemLimit}
            bg="sectionBG"
            _hover={{ bg: "gray.100" }}
            onClick={() => handleChangeLimit(itemLimit)}
          >
            {itemLimit}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
