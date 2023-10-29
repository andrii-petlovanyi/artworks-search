import React, { memo } from "react";
import { IPagination } from "../interfaces/items.interface";
import { Flex, IconButton } from "@chakra-ui/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface Props {
  paginationData: IPagination;
}

export const Pagination = memo((props: Props): React.JSX.Element => {
  const { paginationData } = props;
  const { current_pages, total_pages } = paginationData;

  return (
    <Flex gap={4} align={"center"}>
      <IconButton
        icon={<MdOutlineKeyboardArrowLeft />}
        aria-label="Prev page"
        size={"md"}
        isDisabled={current_pages == 1}
      />

      <IconButton
        icon={<MdOutlineKeyboardArrowRight />}
        aria-label="Prev page"
        size={"md"}
        isDisabled={current_pages == total_pages}
      />
    </Flex>
  );
});
