import {Center, Container, Spinner} from "@chakra-ui/react";

export const Loading = () => {
    return <Container mt={6}>
        <Center mt={6}>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="green.200"
                color="green.500"
                size="xl"
            />
        </Center>
    </Container>
}