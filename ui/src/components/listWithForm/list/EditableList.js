"use client";

import { Table, TableThead, TableTr, TableTh, TableTd, TableTbody, ActionIcon } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import style from "./editableList.module.css";


export default function EditableList({ columns, rows, setAction, setEditedRow, onRowClick }) {
    return (
        <Table verticalSpacing="xs">
            <TableThead>
                <TableTr>
                    {columns.map((column, index) => 
                        <TableTh key={"column_" + index}>{column.name}</TableTh>
                    )}
                    <TableTh></TableTh>
                </TableTr>
            </TableThead>
            <TableTbody>
                {rows.map((row, index) => 
                    <TableTr 
                        key={"row_" + index} 
                        onClick={() => {
                            if (onRowClick !== undefined) {
                                onRowClick(row);
                            }
                        }}
                        className={(onRowClick !== undefined) && style.hover}
                    >
                        {columns.map((column, col_index) => 
                            <TableTd key={"cell_" + index + "_" + col_index}>
                                {row[column.id]}
                            </TableTd>
                        )}
                        <TableTd className={style.actions}>
                            <ActionIcon
                                onClick={() => {
                                    setAction("edit");
                                    setEditedRow(row);
                                }}
                                variant="default"
                                size="md"
                                radius="sm"
                                aria-label="Edytuj"
                            >
                                <IconPencil stroke={1.25} size={20}/>
                            </ActionIcon>
                            <ActionIcon
                                onClick={() => {}}
                                variant="default"
                                size="md"
                                radius="sm"
                                aria-label="Usuń"
                            >
                                <IconTrash stroke={1.25} size={20}/>
                            </ActionIcon>
                        </TableTd>
                    </TableTr>
                )}
            </TableTbody>
        </Table>
    );
}
