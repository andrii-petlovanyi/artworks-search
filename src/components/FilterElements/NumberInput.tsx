import {
  NumberInput as ChakraNumberInput,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";
import React, { memo } from "react";

interface Props {
  title?: string;
  label?: string;
  currentValue: number;
  setCurrentValue: (value: number) => void;
}

export const NumberInput = memo((props: Props): React.JSX.Element => {
  const { currentValue, setCurrentValue, title, label } = props;
  const currentYear = new Date().getFullYear();

  const handleChange = useDebouncedCallback((value: string) => {
    setCurrentValue(parseInt(value));
  }, 500);

  return (
    <Flex direction="column" width={"100%"}>
      {!!title && <Text>{title}</Text>}
      {!!label && (
        <Text fontSize={"14px"} color={"gray.500"}>
          {label}
        </Text>
      )}
      <ChakraNumberInput
        defaultValue={currentValue}
        min={0}
        max={currentYear}
        onChange={handleChange}
        size={"sm"}
      >
        <NumberInputField borderRadius={"md"} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    </Flex>
  );
});
