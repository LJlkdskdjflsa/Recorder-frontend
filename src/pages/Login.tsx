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
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {ThemeToggler} from "../components/Theme/ThemeToggler";
import {useAuth} from "../hooks/useAuth";

export const Login = () => {
    const {handleSubmit, register, formState: {errors, isSubmitting}} = useForm();
    const navigate = useNavigate();
    const {login} = useAuth()
    const toast = useToast()
    const onSubmit = async (values: any) => {
        try {
            // @ts-ignore
            await login(values.email, values.password)
        } catch (errors) {
            toast({
                title: "Invalid email or password",
                status: "error",
                isClosable: true,
                duration: 1500,
            });
        }
    }

    const background = useColorModeValue("gray.100", "gray.700")
    // @ts-ignore
    // @ts-ignore
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
        <Heading mb={6}>Login</Heading>
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
            <FormControl isInvalid={errors.email !== undefined}>
                <Input
                    placeholder="Password"
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="password"
                    size="lg"
                    mt={6}
                    {...register("password", {
                        required: "This is required field",
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
                Login
            </Button>
        </form>
        <Button
            onClick={() => navigate("/register", {replace: true})}
            width="100%"
            colorScheme="gray"
            variant="outline"
            mt={6}
        >
            Register
        </Button>

        <ThemeToggler showLabel={true}/>
    </Flex>
    </Flex>
}