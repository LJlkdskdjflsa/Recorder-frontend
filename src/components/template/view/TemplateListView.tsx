import React, {useEffect, useState} from "react";
import {Template} from "../../../type/Template";
import {DataTable} from "../../dataTable";
import {createColumnHelper} from "@tanstack/react-table";
import {LinkIcon} from "@chakra-ui/icons";
import {NavLink} from "react-router-dom";
import {AddNewRecordButton} from "../AddNewRecordButton";
import {DeleteTemplateButton} from "../DeleteTemplateButton";

interface templateView {
    _id: string,
    title: string,
    createdAt: Date,
}

export const TemplateListView = (props: { templates: Template[] }) => {
    const [templateDatas, setTemplateDatas] = useState<templateView[]>([]);
    const columnHelper = createColumnHelper<templateView>();

    const templateColumns = [
        columnHelper.accessor("_id", {
            cell: (info) => {
                return <NavLink to={"/template/" + info.getValue()}> <LinkIcon/></NavLink>
            },
            header: "link",
        }),

        columnHelper.accessor("title", {
            cell: (info) => {
                return info.getValue();
            },
            header: "Title",
        }),


        columnHelper.accessor("createdAt", {
            cell: (info) => {
                const date = new Date(info.getValue());

                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();

                const dateWithSlashes = [year, month, day].join('/');

                return dateWithSlashes;
            },
            header: "Create Date",
        }),

        columnHelper.accessor("_id", {
            cell: (info) => {
                return <AddNewRecordButton templateId={info.getValue()}/>

            },
            header: "",
        }),
        columnHelper.accessor("_id", {
            cell: (info) => {
                return <DeleteTemplateButton templateId={info.getValue()} loading={false} setLoading={() => {
                }}/>

            },
            header: "",
        }),
    ];
    useEffect(() => {
        const templateData = getT_idiedTemplateData(props.templates);
        setTemplateDatas(templateData);
    }, []);
    const getT_idiedTemplateData = (templates: Template[]) => {
        return templates.map((template) => {
            return {
                _id: template._id,
                title: template.title,
                createdAt: template.created_at,
            };
        }, []);
    };


    return <>
        <DataTable data={templateDatas} columns={templateColumns}/>
    </>
}