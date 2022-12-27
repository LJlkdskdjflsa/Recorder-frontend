import {Button, Container, Text, useColorModeValue, useToast,} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../services/axios";
import {AddUpdateTemplateModal} from "../../components/Template/AddUpdateTemplateModal";
import {Loading} from "../../components/Loading";

export const TemplateDetail = () => {
    const [template, setTemplate] = useState({
        title: "default title", description: "default description", json_schema: {}, ui_schema: {}
    });
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const {templateId} = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const background = useColorModeValue("gray.300", "gray.600");

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

    const deleteTemplate = () => {
        setLoading(true);
        axiosInstance
            .delete(`/templates/${templateId}`)
            .then(() => {
                toast({
                    title: "Template deleted successfully",
                    status: "success",
                    isClosable: true,
                    duration: 1500,
                });
                navigate("/template");
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: "Could'nt delete template",
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

    return (
        <>
            <Container mt={6}>
                <Button
                    colorScheme="gray"
                    onClick={() => navigate("/template", {replace: true})}
                >
                    Back
                </Button>
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
                <Text fontSize={22}>{template.title}</Text>
                <Text fontSize={22}>{template.description}</Text>

                <AddUpdateTemplateModal
                    my={3}
                    editable={true}
                    defaultValues={{
                        title: template.title,
                        description: template.description,
                        json_schema: {}, ui_schema: {}

                    }}
                    onSuccess={fetchTemplate}
                />
                <Button
                    isLoading={loading}
                    colorScheme="red"
                    width="100%"
                    onClick={deleteTemplate}
                >
                    Delete
                </Button>
            </Container>
        </>
    );
};