import {Button, Container, Text, useColorModeValue, useToast,} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../services/axios";
import {AddUpdateRecordModal} from "../../components/Record/AddUpdateRecordModal";
import {Loading} from "../../components/Loading";

export const RecordDetail = () => {
    const [record, setRecord] = useState({
        title: "default title", data: {},
    });
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const {recordId} = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const background = useColorModeValue("gray.300", "gray.600");

    useEffect(() => {
        if (isMounted.current) return;
        fetchRecord();
        isMounted.current = true;
    }, [recordId]);

    const fetchRecord = () => {
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

    const deleteRecord = () => {
        setLoading(true);
        axiosInstance
            .delete(`/records/${recordId}`)
            .then(() => {
                toast({
                    title: "Record deleted successfully",
                    status: "success",
                    isClosable: true,
                    duration: 1500,
                });
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: "Could'nt delete record",
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
                    onClick={() => navigate("/", {replace: true})}
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
                <Text fontSize={22}>{record.title}</Text>

                <AddUpdateRecordModal
                    my={3}
                    editable={true}
                    defaultValues={{
                        title: record.title,
                        data: {}
                    }}
                    onSuccess={fetchRecord}
                />
                <Button
                    isLoading={loading}
                    colorScheme="red"
                    width="100%"
                    onClick={deleteRecord}
                >
                    Delete
                </Button>
            </Container>
        </>
    );
};