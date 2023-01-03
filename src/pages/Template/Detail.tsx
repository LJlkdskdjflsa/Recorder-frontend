import {Box, Button, Container, Flex, Spacer, Text, useColorModeValue,} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../services/axios";
import {AddUpdateTemplateModal} from "../../components/template/AddUpdateTemplateModal";
import {Loading} from "../../components/loading";
import {DeleteTemplateButton} from "../../components/template/DeleteTemplateButton";
import {withTheme} from "@rjsf/core";
import {Theme as ChakraUITheme} from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";

export const Detail = () => {
    const [template, setTemplate] = useState({
        title: "default title", description: "default description", json_schema: {}, ui_schema: {}
    });
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const {templateId} = useParams();
    const navigate = useNavigate();
    const background = useColorModeValue("gray.300", "gray.600");
    const Form = withTheme(ChakraUITheme);
    useEffect(() => {
        if (isMounted.current) return;
        fetchTemplate();
        isMounted.current = true;
    }, [templateId]);

    const fetchTemplate = () => {
        setLoading(true);
        axiosInstance
            .get(`/templates/${templateId}`)
            .then((res) => {
                setTemplate(res.data);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <Loading/>
        );
    }
    return (
        <Box w={"100%"}>
            <Container mt={6} maxW='container.xl'>
                <Flex w={"100%"} p={9}>
                    <Button
                        colorScheme="gray"
                        onClick={() => navigate("/template", {replace: true})}
                    >
                        Back
                    </Button>
                    <Spacer/>
                    <Flex>
                        <Box p={3}> <AddUpdateTemplateModal
                            editable={true}
                            defaultValues={{
                                title: template.title,
                                description: template.description,
                                json_schema: template.json_schema,
                                ui_schema: template.ui_schema
                            }}
                            onSuccess={fetchTemplate}
                        /></Box>
                        <Box p={3}>
                            <DeleteTemplateButton templateId={templateId as string} loading={loading}
                                                  setLoading={setLoading}/>
                        </Box>

                    </Flex>
                </Flex>

            </Container>
            <Container
                w={"100%"}
                maxW='container.lg'
                bg={background}
                minHeight="7rem"
                my={3}
                p={3}
                rounded="lg"
                alignItems="center"
                justifyContent="space-between"
            >
                <Text fontSize={22} mb={5}>Preview</Text>
                <Form
                    schema={template.json_schema}
                    uiSchema={template.ui_schema}
                    validator={validator}
                />
            </Container>
        </Box>
    );
};