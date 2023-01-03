import {Button, Container, Flex, Input, Spacer, Text, useColorModeValue, useToast} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../services/axios";
import {Loading} from "../../components/loading";
import validator from "@rjsf/validator-ajv8";
import {withTheme} from "@rjsf/core";
import {Theme as ChakraUITheme} from "@rjsf/chakra-ui";

export const Detail = () => {
    const [record, setRecord] = useState({
        title: "default title", template: {json_schema: {}, ui_schema: {}}, data: {},
    });
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const {recordId} = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const background = useColorModeValue("gray.300", "gray.600");
    const Form = withTheme(ChakraUITheme);


    useEffect(() => {
        if (isMounted.current) return;
        fetchRecord();
        isMounted.current = true;
    }, [recordId]);

    const fetchRecord = async () => {
        setLoading(true);
        axiosInstance
            .get(`/records/${recordId}`)
            .then((res) => {
                setRecord(res.data);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
            });
    };
    const saveRecord = async (title: string, data: object) => {
        try {
            await axiosInstance.put(`/records/${recordId}`, {title: title, data: data});

            toast({
                title: "record Saves",
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

    const deleteRecord = () => {
        setLoading(true);
        axiosInstance
            .delete(`/records/${recordId}`)
            .then(() => {
                toast({
                    title: "record deleted successfully",
                    status: "success",
                    isClosable: true,
                    duration: 1500,
                });
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: "Couldn't delete record",
                    status: "error",
                    isClosable: true,
                    duration: 2000,
                });
            })
            .finally(() => setLoading(false));
    };

    if (loading) {
        return (
            <Loading/>
        );
    }
    console.log(record);

    return (
        <>
            <Container mt={6}>

            </Container>
            <Container
                bg={background}
                minHeight="7rem"
                my={3}
                p={3}
                rounded="lg"
                alignItems="center"
                justifyContent="space-between"
            >
                <Text>Title</Text>
                <Input
                    pr='4.5rem'
                    type={'text'}
                    defaultValue={record.title}
                    onBlur={(e) => setRecord({...record, title: e.target.value})}
                />
                <Form
                    schema={record.template.json_schema}
                    uiSchema={{
                        ...record.template.ui_schema, "ui:submitButtonOptions": {
                            "norender": true,
                        }
                    }}
                    formData={record.data}

                    onSubmit={(data, event) => {
                        saveRecord(record.title, data.formData);
                        setRecord({...record, data: data.formData});
                    }}
                    validator={validator}
                > <Flex>
                    <Button
                        colorScheme="green"
                        type="submit"
                    >
                        Save
                    </Button>
                    <Spacer/>
                    <Button
                        isLoading={loading}
                        colorScheme="red"
                        onClick={deleteRecord}
                    >
                        Delete
                    </Button></Flex>
                </Form>


            </Container>
        </>
    );
};