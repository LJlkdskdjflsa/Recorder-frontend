import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import {ThemeToggler} from "../Theme/ThemeToggler";
import axiosInstance from "../../services/axios";

export const Register = () => {
    const {handleSubmit, register, formState: {errors, isSubmitting}} = useForm();
    const navigate = useNavigate();
    const toast = useToast();
    const onSubmit = async (values: any) => {
        try {
            await axiosInstance.post("/users/create", values);
            toast({
                title: "Account created successfully.",
                status: "success",
                isClosable: true,
                duration: 1500,
            });
            navigate("/login", {replace: true});
        } catch (error: any) {
            toast({
                title: `${error.response.data.detail}`,
                status: "error",
                isClosable: true,
                duration: 1500,
            });
        }
    }

    const background = useColorModeValue("gray.100", "gray.700")
    return <Flex
        height={"100vh"}
        align={"center"}
        justifyContent={"center"}><Flex
        direction={"column"}
        alignItems={"center"}
        background={background}
        p={12}
        rounded={6}

    >
        <Heading mb={6}>Register</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email !== undefined}>
                <Input
                    placeholder="Email"
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="email"
                    size="lg"
                    mt={6}
                    {...register("email", {
                        required: "This is required field",
                    })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.username !== undefined}>
                <Input
                    placeholder="username"
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="text"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("username", {
                        required: "This filed is required",
                        minLength: {
                            value: 5,
                            message: "Username must be at least 5 characters",
                        },
                        maxLength: {
                            value: 24,
                            message: "Username must be at most 24 characters",
                        },
                    })}
                />
                <FormErrorMessage>
                    {errors.username && errors.username.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email !== undefined}>
                <Input
                    placeholder="Password"
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="password"
                    size="lg"
                    mt={6}
                    {...register("password", {
                        required: "This is required field",
                        minLength: {
                            value: 5,
                            message: "Password must be at least 5 characters long",
                        },
                        maxLength: {
                            value: 24,
                            message: "Password must be at most 24 characters",
                        },
                    })}
                />
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button
                isLoading={isSubmitting}
                loadingText="Logging in..."
                width="100%"
                colorScheme="green"
                variant="outline"
                mt={6}
                mb={6}
                type="submit"
            >
                Register
            </Button>
        </form>
        <Button
            onClick={() => navigate("/login", {replace: true})}
            width="100%"
            colorScheme="gray"
            variant="outline"
            mt={6}
        >
            Login
        </Button>

        <ThemeToggler showLabel={true}/>
    </Flex>
    </Flex>

};