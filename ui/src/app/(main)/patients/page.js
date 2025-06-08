"use client";

import { useAtom, useSetAtom } from "jotai";
import { CREATE_PATIENT, currentPatientIdAtom, patientCardAtom, QUERY_PATIENTS, REMOVE_PATIENT, removePatientIdAtom, UPDATE_PATIENT } from "@/store/store";
import dayjs from "dayjs";
import ListWithForm from "@/components/listWithForm/ListWithForm";
import { useMutation, useQuery } from '@apollo/client';
import { useCallback } from "react";


export default function Patients() {
    const setPatientCard = useSetAtom(patientCardAtom);
    const { loading, error, data, refetch } = useQuery(QUERY_PATIENTS);
    const [createPatient, createPatientObj] = useMutation(CREATE_PATIENT);
    const [updatePatient, updatePatientObj] = useMutation(UPDATE_PATIENT);
    const [removePatient, removePatientObj] = useMutation(REMOVE_PATIENT);
    const [currentPatientId, setCurrentPatientId] = useAtom(currentPatientIdAtom);

    const onCreate = useCallback(async (values) => {
        await createPatient({ variables: { patientInput: {
            ...values,
            date_of_birth: dayjs(values.date_of_birth + " +00:00", "DD-MM-YYYY Z", false).format()
        } }});
        refetch();
    }, [refetch, createPatient]);
    const onUpdate = useCallback(async (values) => {
        await updatePatient({ variables: { 
            id: currentPatientId,
            patientInput: {
                ...values,
                date_of_birth: dayjs(values.date_of_birth + " +00:00", "DD-MM-YYYY Z", false).format()
            }
        }});
        refetch();
    }, [refetch, updatePatient, currentPatientId]);
    const onRemove = useCallback(async (id) => {
        await removePatient({ variables: { 
            id: id
        }});
        refetch();
    }, [refetch, removePatient]);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error}`;

    return (
        <ListWithForm
            rows={data.patients.map((patient) => {
                return { 
                    ...patient,
                    date_of_birth: dayjs(patient.date_of_birth).format("DD-MM-YYYY"),
                }
            })}
            columns={columns}
            onRowClick={setPatientCard}
            defaultFormValues={{
                fname: "",
                lname: "",
                date_of_birth: "",
                phone: ""
            }}
            formValidate={{
                fname: (val) => /^[a-zA-Z]+$/.test(val) ? null : "Imię może mieć tylko litery.",
                lname: (val) => /^[a-zA-Z]+$/.test(val) ? null : "Nazwisko może mieć tylko litery.",
                date_of_birth: (val) => dayjs(val, "DD-MM-YYYY", true).isValid() ? null : 'Niewłaściwy format daty',
                phone: (val) => ((val.length === 9) && /^\d+$/.test(val)) ? null : 'Numer telefonu powinien zawierać 9 cyfr.',
            }}
            onCreate={onCreate}
            onUpdate={onUpdate}
            onRemove={onRemove}
            setCurrentId={setCurrentPatientId}
        />
    );
}

const columns = [
    {
        id: "fname",
        name: "Imię"
    },
    {
        id: "lname",
        name: "Nazwisko"
    },
    {
        id: "date_of_birth",
        name: "Rok urodzenia"
    },
    {
        id: "phone",
        name: "Telefon"
    },
]
