"use client";

import { IconPlus, IconX } from '@tabler/icons-react';
import style from "./addForm.module.css";
import { useForm } from '@mantine/form';
import { Button, Group, Stack, Text, TextInput, ActionIcon } from '@mantine/core';
import { useEffect } from 'react';


export default function AddForm({ action, setAction, editedRow, defaultFormValues, formValidate, columns }) {
    const form = useForm({
        initialValues: (action === "edit") ? editedRow : defaultFormValues,
        validate: formValidate,
    });

    useEffect(() => {
        if ((action === "edit") && (form !== undefined)) {
            columns.forEach(column => {
                form.setFieldValue(column.id, editedRow[column.id]);
            });
        }
        else {
            columns.forEach(column => {
                form.setFieldValue(column.id, "");
            });
        }
    }, [action, editedRow]);

    return (
        <div className={style.form}>
            {(action === "add") || (action === "edit") ?
                <form onSubmit={form.onSubmit(() => {})}>
                    <Stack>
                        {columns.map((column, index) => 
                            <TextInput
                                key={"field_" + index}
                                required
                                label={column.name}
                                value={form.values[column.id]}
                                onChange={(event) => form.setFieldValue(column.id, event.currentTarget.value)}
                                error={form.errors[column.id]}
                                radius="md"
                            />
                        )}
                    </Stack>

                    <Group justify="space-around" mt="lg">
                        <ActionIcon
                            onClick={() => { setAction("none"); }}
                            variant="default"
                            size="md"
                            radius="sm"
                            aria-label="Anuluj"
                        >
                            <IconX stroke={1.25} size={20}/>
                        </ActionIcon>
                        <Button type="submit" radius="xl">
                            {(action === "add") ? "Dodaj" : "Zapisz"}
                        </Button>
                    </Group>
                </form>
            :
                <>
                    <ActionIcon
                        onClick={() => { setAction("add"); }}
                        variant="filled"
                        size="md"
                        radius="sm"
                        aria-label="Dodaj"
                    >
                        <IconPlus stroke={1.25} size={20}/>
                    </ActionIcon>
                    <Text>Dodaj</Text>
                </>
            }
        </div>
    );
}