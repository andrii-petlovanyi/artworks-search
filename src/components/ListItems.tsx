import React, { useMemo } from "react";
import { IItem } from "../interfaces/items.interface";
import { Grid } from "@chakra-ui/react";
import { ItemCard } from "./ItemCard";

interface Props {
  listItems: Array<IItem>;
}

export const ListItems = ({ listItems }: Props): React.JSX.Element => {
  const content = {
    hasContent: listItems.map((item: IItem) => (
      <ItemCard key={item.id} item={item} />
    )),
    noContent: "Not found artworks with entered search params",
  };

  const rendererContent = useMemo(() => {
    switch (true) {
      case listItems.length > 0:
        return content.hasContent;
      default:
        return content.noContent;
    }
  }, [listItems]);

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
    >
      {rendererContent}
    </Grid>
  );
};
