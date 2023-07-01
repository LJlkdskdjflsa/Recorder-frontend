import React, {useEffect, useRef, useState} from "react";
import axiosInstance from "../../services/axios";
import {Button, Container} from "@chakra-ui/react";
import {Loading} from "../../components/loading";
import {NavLink} from "react-router-dom";
import {RecordFromBackend} from "../../type/RecordFromBackend";
import {RecordTable} from "../../components/record/RecordTable";

export const ALLRecord = () => {
    const [records, setRecords] = useState<RecordFromBackend[]>([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);

    const fetchRecords = async () => {
        setLoading(true)
        axiosInstance.get("/records/")
            .then((response) => {
                // @ts-ignore
                console.log(response.data);
                setRecords(response.data)
            }).catch((error) => {
            console.error(error)
        }).finally(() => {
            setLoading(false)
        })

    }

    useEffect(() => {
        if (isMounted.current) return
        fetchRecords()
        isMounted.current = true

    })


    console.log(records)
    return <Container mt={9}>

        <NavLink to={"/template"}><Button w="100%" colorScheme="green">Create New Record </Button></NavLink>

        {loading ? (
            <Loading/>
        ) : (
            // <Box mt={6}>
            //     {records?.map((record) => (
            //         <Card record={record} key={record._id}/>
            //     ))}
            // </Box>
            <RecordTable records={records}/>
        )}
    </Container>
}