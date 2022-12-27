import React, {useEffect, useRef, useState} from "react";
import axiosInstance from "../../services/axios";
import {Box, Container} from "@chakra-ui/react";
import {RecordCard} from "../../components/Record/RecordCard";
import {Loading} from "../../components/Loading";
import {AddUpdateRecordModal} from "../../components/Record/AddUpdateRecordModal";

interface Record {
    _id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export const RecordList = () => {
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
        <AddUpdateRecordModal onSuccess={fetchRecords}/>
        {loading ? (
            <Loading/>
        ) : (
            <Box mt={6}>
                {records?.map((record) => (
                    <RecordCard record={record} key={record._id}/>
                ))}
            </Box>
        )}
    </Container>
}