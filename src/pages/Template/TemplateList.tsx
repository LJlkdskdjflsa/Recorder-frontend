import React, {useEffect, useRef, useState} from "react";
import {Flex, SimpleGrid} from "@chakra-ui/react";
import TemplateCard from "../../components/Template/Card";
import axiosInstance from "../../services/axios";
import {Loading} from "../../components/Loading";
import {Template} from "../../type/Basic";
import {AddUpdateTemplateModal} from "../../components/Template/AddUpdateTemplateModal";


export const TemplateList = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);


    const fetchTemplates = async () => {
        setLoading(true)
        axiosInstance.get("/templates/")
            .then((response) => {
                // @ts-ignore
                setTemplates(response.data)
            }).catch((error) => {
            console.error(error)
        }).finally(() => {
            setLoading(false)
        })

    }

    useEffect(() => {
        if (isMounted.current) return
        fetchTemplates()
        isMounted.current = true
    })
    console.log(templates)

    // @ts-ignore
    return <>
        <Flex w={"100%"}>
            <AddUpdateTemplateModal onSuccess={fetchTemplates} p={9} w={"50%"}/>
        </Flex>


        {loading ? (
            <Loading/>
        ) : (
            <SimpleGrid minChildWidth='240px' spacing='30px' p={"10"}>
                {templates?.map((template) => (
                    <TemplateCard
                        imageURL={'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80'}
                        title={template.title} key={template._id} _id={template._id}
                    />
                ))}
            </SimpleGrid>
        )}

    </>
}