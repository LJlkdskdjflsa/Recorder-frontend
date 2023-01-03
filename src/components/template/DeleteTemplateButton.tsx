import React from "react";
import axiosInstance from "../../services/axios";
import {Button, useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export const DeleteTemplateButton = (props: { templateId: string, loading: boolean, setLoading: Function }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const deleteTemplate = () => {
        props.setLoading(true);
        axiosInstance
            .delete(`/templates/${props.templateId}`)
            .then(() => {
                toast({
                    title: "template deleted successfully",
                    status: "success",
                    isClosable: true,
                    duration: 1500,
                });
                navigate("/template");
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: "Couldn't delete template",
                    status: "error",
                    isClosable: true,
                    duration: 2000,
                });
            })
            .finally(() => props.setLoading(false));
    };
    return <Button
        isLoading={props.loading}
        colorScheme="red"
        w={"100%"}
        onClick={deleteTemplate}
    >
        Delete
    </Button>
}