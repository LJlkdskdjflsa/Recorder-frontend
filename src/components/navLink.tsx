import {Link, useColorModeValue} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";

export const NavLink = (props: { title: string, to: string }) => (
    <Link
        bgColor={useColorModeValue("gray.300", "gray.600")}
        p={3}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        as={ReachLink}
        to={props.to}>
        {props.title}
    </Link>
);