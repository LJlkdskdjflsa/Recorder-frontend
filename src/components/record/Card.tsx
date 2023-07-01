import {Badge, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import {useNavigate} from "react-router-dom";

// @ts-ignore
export const Card = ({record}) => {
    const navigate = useNavigate();
    return (
        <Flex
            bg={useColorModeValue("gray.300", "gray.600")}
            minHeight="3rem"
            my={3}
            p={3}
            rounded="lg"
            alignItems="center"
            justifyContent="space-between"
            _hover={{
                opacity: 0.9,
                cursor: "pointer",
                transform: "translateY(-3px)",
            }}
            onClick={() => navigate(`/record/${record._id}`, {replace: true})}
        >
            <Text>{record.title}</Text>
            <Text>{record.template.title}</Text>
            <Badge colorScheme={record.status ? "green" : "purple"}>
                {record.status ? "Complete" : "Pending"}
            </Badge>
        </Flex>
    );
};