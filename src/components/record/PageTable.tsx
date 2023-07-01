import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {Button, Center, ChakraProvider, Grid, Select, Stack, Text} from "@chakra-ui/react";
import {
    Pagination,
    PaginationContainer,
    PaginationNext,
    PaginationPage,
    PaginationPageGroup,
    PaginationPrevious,
    PaginationSeparator,
    usePagination
} from "@ajna/pagination";

const fetchPokemons = async (
    pageSize: number,
    offset: number
): Promise<any> => {
    return await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
    ).then(async (res) => await res.json());
};

const PageTable: FC = () => {
    // states
    const [pokemonsTotal, setPokemonsTotal] = useState<number | undefined>(
        undefined
    );
    const [pokemons, setPokemons] = useState<any[]>([]);

    // constants
    const outerLimit = 2;
    const innerLimit = 2;

    const {
        pages,
        pagesCount,
        offset,
        currentPage,
        setCurrentPage,
        setIsDisabled,
        isDisabled,
        pageSize,
        setPageSize
    } = usePagination({
        total: pokemonsTotal,
        limits: {
            outer: outerLimit,
            inner: innerLimit
        },
        initialState: {
            pageSize: 5,
            isDisabled: false,
            currentPage: 1
        }
    });
    // effects
    useEffect(() => {
        fetchPokemons(pageSize, offset)
            .then((pokemons) => {
                setPokemonsTotal(pokemons.count);
                setPokemons(pokemons.results);
            })
            .catch((error) => console.log("App =>", error));
    }, [currentPage, pageSize, offset]);

    // handlers
    const handlePageChange = (nextPage: number): void => {
        // -> request new data using the page number
        setCurrentPage(nextPage);
        console.log("request new data with ->", nextPage);
    };

    const handlePageSizeChange = (
        event: ChangeEvent<HTMLSelectElement>
    ): void => {
        const pageSize = Number(event.target.value);

        setPageSize(pageSize);
    };

    const handleDisableClick = (): void => {
        setIsDisabled((oldState) => !oldState);
    };

    return (
        <ChakraProvider>
            <Stack>
                <Pagination
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    isDisabled={isDisabled}
                    onPageChange={handlePageChange}
                >
                    <PaginationContainer
                        align="center"
                        justify="space-between"
                        p={4}
                        w="full"
                    >
                        <PaginationPrevious
                            _hover={{
                                bg: "yellow.400"
                            }}
                            bg="yellow.300"
                            onClick={() =>
                                console.log(
                                    "Im executing my own function along with Previous component functionality"
                                )
                            }
                        >
                            <Text>Previous</Text>
                        </PaginationPrevious>
                        <PaginationPageGroup
                            isInline
                            align="center"
                            separator={
                                <PaginationSeparator
                                    onClick={() =>
                                        console.log(
                                            "Im executing my own function along with Separator component functionality"
                                        )
                                    }
                                    bg="blue.300"
                                    fontSize="sm"
                                    w={7}
                                    jumpSize={11}
                                />
                            }
                        >
                            {pages.map((page: number) => (
                                <PaginationPage
                                    w={7}
                                    bg="red.300"
                                    key={`pagination_page_${page}`}
                                    page={page}
                                    onClick={() =>
                                        console.log(
                                            "Im executing my own function along with Page component functionality"
                                        )
                                    }
                                    fontSize="sm"
                                    _hover={{
                                        bg: "green.300"
                                    }}
                                    _current={{
                                        bg: "green.300",
                                        fontSize: "sm",
                                        w: 7
                                    }}
                                />
                            ))}
                        </PaginationPageGroup>
                        <PaginationNext
                            _hover={{
                                bg: "yellow.400"
                            }}
                            bg="yellow.300"
                            onClick={() =>
                                console.log(
                                    "Im executing my own function along with Next component functionality"
                                )
                            }
                        >
                            <Text>Next</Text>
                        </PaginationNext>
                    </PaginationContainer>
                </Pagination>
                <Center w="full">
                    <Button
                        _hover={{
                            bg: "purple.400"
                        }}
                        bg="purple.300"
                        onClick={handleDisableClick}
                    >
                        Disable ON / OFF
                    </Button>
                    <Select ml={3} onChange={handlePageSizeChange} w={40}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </Select>
                </Center>
                <Grid
                    gap={3}
                    mt={20}
                    px={20}
                    templateColumns="repeat(5, 1fr)"
                    templateRows="repeat(2, 1fr)"
                >
                    {pokemons?.map(({name}) => (
                        <Center key={name} bg="green.100" p={4}>
                            <Text>{name}</Text>
                        </Center>
                    ))}
                </Grid>
            </Stack>
        </ChakraProvider>
    );
};

export default PageTable;
