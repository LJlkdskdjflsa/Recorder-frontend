import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {RecordFromBackend} from "../../type/RecordFromBackend";

export const RecordTable = ({records}: { records: RecordFromBackend[] }) => {
    const navigate = useNavigate();
    return (
        <Table variant="striped" colorScheme="teal">
            <Thead>
                <Tr>
                    <Th>Title</Th>
                    <Th>Template Title</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {records.map((record) => (
                    <Tr
                        key={record._id}
                        _hover={{
                            opacity: 0.9,
                            cursor: "pointer",
                            transform: "translateY(-3px)",
                        }}
                        onClick={() =>
                            navigate(`/record/${record._id}`, {replace: true})
                        }
                    >
                        <Td>{record.title}</Td>
                        <Td>{record.template.title}</Td>

                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
