import React, {useEffect, useRef, useState} from "react";
import {Box, Button, Container, Flex, Spacer} from "@chakra-ui/react";
import axiosInstance from "../../services/axios";
import {Loading} from "../../components/loading";
import {Template} from "../../type/Template";
import {TemplateIconView} from "../../components/template/view/TemplateIconView";
import {TemplateListView} from "../../components/template/view/TemplateListView";
import {AddUpdateTemplateModal} from "../../components/template/AddUpdateTemplateModal";

enum TemplateViewType {
    List = 0,
    Icon = 1
}

export const AllTemplate = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<TemplateViewType>(TemplateViewType.List);
    const isMounted = useRef(false);

    const handleCreateNewTemplate = () => {
        // 處理新建模板的邏輯
    }

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
            {/*<Button onClick={handleCreateNewTemplate}>New Template</Button>*/}
            <Box p={3}> <AddUpdateTemplateModal
                editable={false}
                defaultValues={{
                    title: "new template",
                    description: "new template",
                    json_schema: {},
                    ui_schema: {}
                }}
            /></Box>
            <Spacer/>
            {view === TemplateViewType.Icon ? (<Button onClick={changeView}>List View</Button>) : (
                <Button onClick={changeView}>Icon View</Button>)}
        </Flex>


        <Container maxW='container.xl'>
            {loading ? (
                <Loading/>
            ) : (
                <>{view === TemplateViewType.Icon ?
                    (<TemplateIconView templates={templates}/>) :
                    (<TemplateListView templates={templates}/>)
                }
                </>
            )}
        </Container>
    </>
}