import React from "react";
import { IItem } from "../interfaces/items.interface";
import { GridItem, Heading, Image, Link, Text } from "@chakra-ui/react";
import { generateImgUrl } from "../helpers/generateImgUrl";
import sanitizeHtml from "sanitize-html";
import placeholder from "/public/placeholder.png";

interface Props {
  item: IItem;
}

export const ItemCard = ({ item }: Props): React.JSX.Element => {
  const { title, description, image_id, api_link } = item;
  const imgUrl = image_id ? generateImgUrl(image_id) : placeholder;

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
      {
        <Image
          position={"absolute"}
          src={imgUrl}
          width={"100%"}
          objectFit={"cover"}
          objectPosition={"top"}
          height={"230px"}
          ml={-4}
          mt={-4}
        />
      }
      {!!title && (
        <Heading mt={"230px"} as={"h2"} fontSize={"24px"}>
          {title}
        </Heading>
      )}
      <Text
        fontSize={"16px"}
        mt={"auto"}
        maxH={"150px"}
        overflowY={"hidden"}
        textOverflow={"ellipses"}
        noOfLines={6}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
      />
      <Link href={api_link}>Read more...</Link>
    </GridItem>
  );
};
