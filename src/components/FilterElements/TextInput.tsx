import { Flex, Input, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  placeholder: string;
  title?: string;
}

export const TextInput = memo((props: Props): React.JSX.Element => {
  const { setSearchQuery, placeholder, title } = props;

  const debouncedCallback = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedCallback(value);
  };

  return (
    <Flex width={"100%"} direction={"column"}>
      {!!title && <Text>{title}</Text>}
      <Input
        size={"sm"}
        borderRadius={"md"}
        placeholder={placeholder ?? ""}
        colorScheme="purple"
        onChange={handleSearchChange}
      />
    </Flex>
  );
});
