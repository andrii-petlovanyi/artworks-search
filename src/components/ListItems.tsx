import React, { useMemo } from "react";
import { IItem } from "../interfaces/items.interface";
import { Grid } from "@chakra-ui/react";
import { ItemCard } from "./ItemCard";
import { CardSkeleton } from "./CardSkeleton";

interface Props {
  listItems: Array<IItem> | undefined;
  isLoading: boolean;
  limit: number;
}

export const ListItems = ({
  listItems,
  isLoading,
  limit,
}: Props): React.JSX.Element => {
  const content = {
    isLoading: [...Array(limit).keys()].map((item: number) => (
      <CardSkeleton key={item} />
    )),
    hasContent: listItems?.map((item: IItem) => (
      <ItemCard key={item.id} item={item} />
    )),
    noContent: "Not found artworks with entered search params",
  };

  const rendererContent = useMemo(() => {
    switch (true) {
      case isLoading:
        return content.isLoading;
      case listItems && listItems.length > 0:
        return content.hasContent;
      case listItems && listItems.length == 0:
        return content.noContent;
    }
  }, [listItems, isLoading]);

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
      pl={4}
    >
      {rendererContent}
    </Grid>
  );
};
