import React from "react";
import {AddIcon} from "@chakra-ui/icons";
import axiosInstance from "../../services/axios";
import {useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export const AddNewRecordButton = (props: { templateId: string }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const createRecord = async (templateId: string) => {
        try {

            const result = await axiosInstance.post(`/records/create/`, {
                "title": "Test",
                "template": templateId,
                "data": {}
            });
            toast({
                title: "record Created",
                status: "success",
                isClosable: true,
                duration: 1500,
            });

            console.log(result);
            navigate("/record")
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
    return <>
        <AddIcon onClick={async () => {
            await createRecord(props.templateId)
        }} boxSize={6}/>
    </>
}