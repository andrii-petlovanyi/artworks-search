import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Search from "./Search";
import { IItem, IListResponse } from "../interfaces/items.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config/config";
import { NumberInput } from "./FilterElements/NumberInput";
import { TextInput } from "./FilterElements/TextInput";
import {
  generateSearchFilterParams,
  generateSearchMustParams,
} from "../helpers/generateSearchParams";
import { CheckboxInput } from "./FilterElements/CheckboxInput";

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  setListItems: (listItems: Array<IItem>) => void;
  setIsLoading: (isLoading: boolean) => void;
  limit: number;
}

export const SidebarContent = ({
  onClose,
  setListItems,
  setIsLoading,
  limit,
  ...rest
}: SidebarContentProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateStart, setDateStart] = useState<number>(0);
  const [dateDisplay, setDateDisplay] = useState<number>(0);
  const [dateEnd, setDateEnd] = useState<number>(0);
  const [artistTitle, setArtistTitle] = useState<string>("");
  const [artistLocation, setArtistLocation] = useState<string>("");
  const [artTitle, setArtTitle] = useState<string>("");
  const [galleryTitle, setGalleryTitle] = useState<string>("");
  const [isBoosted, setIsBoosted] = useState<boolean>(false);

  const [key, setKey] = useState<number>(0);

  const searchParams = {
    query: {
      bool: {
        must: generateSearchMustParams(
          artistTitle,
          artTitle,
          galleryTitle,
          artistLocation,
          dateDisplay,
          isBoosted
        ),
        filter: generateSearchFilterParams(dateStart, dateEnd),
      },
    },
  };

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const { data: res } = await axios.post<IListResponse>(
          config.BASE_API_URL +
            `?q=${
              searchQuery ?? ""
            }&fields=api_model, id, title, description, term_titles, thumbnail, image_id, api_link&limit=${limit}`,
          searchParams
        );

        if ("data" in res) {
          setListItems(res.data);
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [
    searchQuery.length,
    dateDisplay,
    dateEnd,
    dateStart,
    artistTitle,
    artTitle,
    artistLocation,
    galleryTitle,
    isBoosted,
    limit,
  ]);

  const handleClearFilters = () => {
    setKey((prev: number) => prev + 1);
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.100")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      minH="100vh"
      pb={"4"}
      pl={1}
      overflowY={"scroll"}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="4" justifyContent={"space-between"}>
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          color="purple.500"
          fontWeight="bold"
        >
          ArtworksLib
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex direction={"column"} gap={4} width={"100%"} pr={5}>
        <Divider />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Divider />
        <TextInput
          key={`input-artName-${key}`}
          searchQuery={artTitle}
          setSearchQuery={setArtTitle}
          placeholder="Enter artwork name"
          title="Artwork name:"
        />
        <TextInput
          key={`input-artistName-${key}`}
          searchQuery={artistTitle}
          setSearchQuery={setArtistTitle}
          title="Artist name:"
          placeholder="Enter artist name"
        />
        <TextInput
          key={`input-artistLocation-${key}`}
          searchQuery={artistLocation}
          setSearchQuery={setArtistLocation}
          title="Country of origin:"
          placeholder="Enter country"
        />
        <TextInput
          key={`input-galleryName-${key}`}
          searchQuery={galleryTitle}
          setSearchQuery={setGalleryTitle}
          title="Gallery name:"
          placeholder="Enter gallery name"
        />
        <Divider />
        <NumberInput
          key={`input-dateDisplay-${key}`}
          currentValue={dateDisplay}
          setCurrentValue={setDateDisplay}
          title="Art displayed at (year)"
        />
        <Text fontSize={"16px"} mb={-4}>
          Period of work on art (year)
        </Text>
        <Flex gap={4}>
          <NumberInput
            key={`input-dateStart-${key}`}
            currentValue={dateStart}
            setCurrentValue={setDateStart}
            label="Start"
          />
          <NumberInput
            key={`input-dateEnd-${key}`}
            currentValue={dateEnd}
            setCurrentValue={setDateEnd}
            label="End"
          />
        </Flex>
        <CheckboxInput
          key={`input-isBoosted-${key}`}
          checkboxValue={isBoosted}
          setCheckboxValue={setIsBoosted}
          title="Is boosted"
        />
        <Divider />
        <Button
          size={"sm"}
          fontWeight={500}
          colorScheme="purple"
          onClick={handleClearFilters}
        >
          Clear all filters
        </Button>
      </Flex>
    </Box>
  );
};
