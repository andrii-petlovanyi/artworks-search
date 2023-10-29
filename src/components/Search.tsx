import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";
import { BiSearchAlt2 } from "react-icons/bi";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Search(props: Props): React.JSX.Element {
  const { searchQuery, setSearchQuery } = props;

  const debouncedCallback = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedCallback(value);
  };

  return (
    <InputGroup size={"md"}>
      <Input
        mx="auto"
        size="md"
        defaultValue={searchQuery}
        colorScheme="purple"
        onChange={handleSearchChange}
        placeholder="Enter for search.."
      />
      <InputRightElement fontSize={"18px"}>
        <BiSearchAlt2 />
      </InputRightElement>
    </InputGroup>
  );
}
