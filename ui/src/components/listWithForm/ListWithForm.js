"use client";

import AddForm from "@/components/listWithForm/form/AddForm";
import EditableList from "@/components/listWithForm/list/EditableList";
import style from "./listWithForm.module.css";
import { useState } from "react";


export default function ListWithForm({ rows, columns, onRowClick, defaultFormValues, formValidate }) {
    const [action, setAction] = useState('none');
    const [editedRow, setEditedRow] = useState(undefined);

    return (
        <div className={style.container}>
            <AddForm 
                action={action} 
                setAction={setAction} 
                editedRow={editedRow}
                defaultFormValues={defaultFormValues}
                formValidate={formValidate}
                columns={columns}
            />
            <EditableList 
                columns={columns} 
                rows={rows} 
                setAction={setAction} 
                setEditedRow={setEditedRow}
                onRowClick={onRowClick}
            />
        </div>
    );
}