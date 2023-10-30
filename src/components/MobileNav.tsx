import { Flex, FlexProps, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Logo } from "./Logo";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent="space-between"
      {...rest}
    >
      <Logo />

      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
