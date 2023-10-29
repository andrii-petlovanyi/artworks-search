import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

interface Props {
  checkboxValue: boolean;
  setCheckboxValue: (newValue: boolean) => void;
  title: string;
}

export const CheckboxInput = (props: Props): React.JSX.Element => {
  const { setCheckboxValue, title } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(e.target.checked);
  };

  return (
    <Checkbox
      defaultChecked={false}
      onChange={handleChange}
      colorScheme="purple"
    >
      {title}
    </Checkbox>
  );
};
