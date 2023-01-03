import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import axiosInstance from "../../services/axios";


export const AddUpdateRecordModal = ({
                                         editable = false,
                                         defaultValues = {
                                             title: "Default Title",
                                             data: {}
                                         },
                                         onSuccess = () => {
                                         },
                                         ...rest
                                     }) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    const {recordId} = useParams();

    const {
        handleSubmit,
        register,
        control,
        formState: {errors, isSubmitting},
    } = useForm({
        defaultValues: {...defaultValues},
    });

    const onSubmit = async (values: any) => {
        try {
            if (editable) {
                await axiosInstance.put(`/records/${recordId}`, values);
            } else {
                await axiosInstance.post(`/records/create/`, values);
            }
            toast({
                title: editable ? "record Updated" : "record Added",
                status: "success",
                isClosable: true,
                duration: 1500,
            });
            onSuccess();
            onClose();
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

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <Box {...rest}>
            <Button w="100%" colorScheme="green" onClick={onOpen}>
                {editable ? "Update record" : "ADD record"}
            </Button>
            <Modal
                closeOnOverlayClick={false}
                size="xl"
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <ModalOverlay/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent>
                        <ModalHeader>{editable ? "Update record" : "ADD record"}</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl isInvalid={errors.title !== undefined}>
                                <Input
                                    placeholder="Record Title...."
                                    background={useColorModeValue("gray.300", "gray.600")}
                                    type="text"
                                    variant="filled"
                                    size="lg"
                                    mt={6}
                                    {...register("title", {
                                        required: "This is required field",
                                        minLength: {
                                            value: 5,
                                            message: "Title must be at least 5 characters",
                                        },
                                        maxLength: {
                                            value: 55,
                                            message: "Title must be at most 55 characters",
                                        },
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.title && errors.title.message}
                                </FormErrorMessage>
                            </FormControl>


                        </ModalBody>
                        <ModalFooter>
                            <Stack direction="row" spacing={4}>
                                <Button onClick={onClose} disabled={isSubmitting}>
                                    Close
                                </Button>
                                <Button
                                    colorScheme="green"
                                    type="submit"
                                    isLoading={isSubmitting}
                                    loadingText={editable ? "Updating" : "Creating"}
                                >
                                    {editable ? "Update" : "Create"}
                                </Button>
                            </Stack>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </Box>
    );
};