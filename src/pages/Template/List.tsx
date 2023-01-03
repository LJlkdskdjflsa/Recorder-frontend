import React, {useEffect, useRef, useState} from "react";
import {Button, Container, Flex, Spacer} from "@chakra-ui/react";
import axiosInstance from "../../services/axios";
import {Loading} from "../../components/loading";
import {Template} from "../../type/Template";
import {TemplateIconView} from "../../components/template/view/TemplateIconView";
import {TemplateListView} from "../../components/template/view/TemplateListView";

enum TemplateViewType {
    List = 0,
    Icon = 1
}

export const List = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<TemplateViewType>(TemplateViewType.List);
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

    const changeView = () => {
        if (view === TemplateViewType.Icon) {
            setView(TemplateViewType.List)
        } else {
            setView(TemplateViewType.Icon)
        }
    }

    useEffect(() => {
        if (isMounted.current) return
        fetchTemplates()
        isMounted.current = true
    })

    return <>
        <Flex w={"100%"} p={9}>
            <Spacer/>
            {view === TemplateViewType.Icon ? (<Button onClick={changeView}>List View</Button>) : (
                <Button onClick={changeView}>Icon View</Button>)}
        </Flex>

        <Container maxW='container.xl'>
            {loading ? (
                <Loading/>
            ) : (
                <>{view === TemplateViewType.Icon ? (<TemplateIconView templates={templates}/>) : (
                    <TemplateListView templates={templates}/>)}</>
            )}
        </Container>


    </>
}