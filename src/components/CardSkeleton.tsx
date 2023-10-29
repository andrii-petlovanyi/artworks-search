import React from "react";
import { GridItem, Skeleton, SkeletonText } from "@chakra-ui/react";

export const CardSkeleton = (): React.JSX.Element => {
  return (
    <GridItem
      w="100%"
      bg="white"
      boxShadow="sm"
      p={4}
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      borderRadius={"lg"}
      position={"relative"}
      overflow={"hidden"}
      _hover={{ boxShadow: "md", cursor: "pointer" }}
    >
      <Skeleton height="120px" />
      <Skeleton height="20px" />
      <SkeletonText noOfLines={6} spacing="3" skeletonHeight="2" />
    </GridItem>
  );
};
