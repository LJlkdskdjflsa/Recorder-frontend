import React, {useEffect, useRef, useState} from "react";
import axiosInstance from "../../services/axios";
import {Box, Button, Container} from "@chakra-ui/react";
import {Card} from "../../components/record/Card";
import {Loading} from "../../components/loading";
import {NavLink} from "react-router-dom";

interface Record {
    _id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export const List = () => {
    const [records, setRecords] = useState<Record[]>([]);
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
            <Box mt={6}>
                {records?.map((record) => (
                    <Card record={record} key={record._id}/>
                ))}
            </Box>
        )}
    </Container>
}