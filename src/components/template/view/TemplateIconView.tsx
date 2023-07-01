import React from "react";
import {SimpleGrid} from "@chakra-ui/react";
import TemplateCard from "../Card";
import {Template} from "../../../type/Template";


export const TemplateIconView = (props: { templates: Template[] }) => {
    // @ts-ignore
    return (
        <SimpleGrid minChildWidth='240px' spacing='30px'>
            {props.templates?.map((template) => (
                <TemplateCard
                    imageURL={'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80'}
                    title={template.title} key={template._id} _id={template._id}
                />
            ))}
        </SimpleGrid>)
}