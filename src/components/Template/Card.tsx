import {Badge, Box, Circle, Flex, Image, Link, Spacer, useColorModeValue, useToast,} from '@chakra-ui/react';
import {AddIcon} from "@chakra-ui/icons";
import axiosInstance from "../../services/axios";
import {Template} from "../../type/Basic";

const data = {
    isNew: true,
    imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Read Book',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
};

interface Props {
    _id: string
    imageURL: string
    title: string
}


function TemplateCard(props: Props) {
    const toast = useToast();
    const createRecord = async (template: Template) => {
        try {

            await axiosInstance.post(`/records/create/`, {
                "title": "Test",
                "data": {}
            });
            toast({
                title: "Record Created",
                status: "success",
                isClosable: true,
                duration: 1500,
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Something went wrong. Please try again.",
                status: "error",
                isClosable: true,
                duration: 1500,
            });
        }
    };
    return (
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative">
                {data.isNew && (
                    <Circle
                        size="10px"
                        position="absolute"
                        top={2}
                        right={2}
                        bg="red.200"
                    />
                )}

                <Image
                    src={props.imageURL}
                    alt={`Picture of ${props.title}`}
                    roundedTop="md"
                />

                <Box p="6">
                    <Flex alignItems="baseline">
                        {data.isNew && (
                            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                                New
                            </Badge>
                        )}
                        <Spacer/>
                        <AddIcon boxSize={6}/>
                    </Flex>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                        >
                            <Link color='teal.500' href={"template/" + props._id}>
                                {props.title}
                            </Link>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default TemplateCard;