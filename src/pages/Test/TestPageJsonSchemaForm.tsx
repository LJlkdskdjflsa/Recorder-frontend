import {withTheme} from "@rjsf/core";
import {Theme as ChakraUITheme} from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";
import React from "react";
import {Container, useColorModeValue} from "@chakra-ui/react";

// Make modifications to the theme with your own fields and widgets

export const TestPageJsonSchemaForm = () => {
    const Form = withTheme(ChakraUITheme);
    const [formData, setFormData] = React.useState(null);
    const background = useColorModeValue("gray.300", "gray.600");

    return <>
        <Container
            bg={background}
            minHeight="7rem"
            my={3}
            p={3}
            rounded="lg"
            alignItems="center"
            justifyContent="space-between"
        >
            <Form
                schema={{type: "string"}}
                formData={formData}
                onChange={e => setFormData(e.formData)}
                validator={validator}
            />
        </Container>
    </>
}