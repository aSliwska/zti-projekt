"use client";

import { useSetAtom } from "jotai";
import { patientCardAtom } from "@/store/store";
import dayjs from "dayjs";
import ListWithForm from "@/components/listWithForm/ListWithForm";


export default function Patients() {
    const setPatientCard = useSetAtom(patientCardAtom);

    return (
        <ListWithForm
            rows={rows}
            columns={columns}
            onRowClick={setPatientCard}
            defaultFormValues={{
                fname: "",
                lname: "",
                dateOfBirth: "",
                phone: ""
            }}
            formValidate={{
                fname: (val) => /^[a-zA-Z]+$/.test(val) ? null : "Imię może mieć tylko litery.",
                lname: (val) => /^[a-zA-Z]+$/.test(val) ? null : "Nazwisko może mieć tylko litery.",
                dateOfBirth: (val) => dayjs(val).isValid() ? null : 'Niewłaściwy format daty',
                phone: (val) => ((val.length === 9) && /^\d+$/.test(val)) ? null : 'Numer telefonu powinien zawierać 9 cyfr.',
            }}
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
        id: "dateOfBirth",
        name: "Rok urodzenia"
    },
    {
        id: "phone",
        name: "Telefon"
    },
]

const rows = [
    {
        id: 1,
        fname: "Amy",
        lname: "Broker",
        dateOfBirth: dayjs("4/23/1999").format("DD-MM-YYYY"),
        phone: "123456789"
    },
    {
        id: 2,
        fname: "Amy",
        lname: "Broker",
        dateOfBirth: dayjs("4/23/1999").format("DD-MM-YYYY"),
        phone: "123456789"
    },
    {
        id: 3,
        fname: "Amy",
        lname: "Broker",
        dateOfBirth: dayjs("4/23/1999").format("DD-MM-YYYY"),
        phone: "123456789"
    },
    {
        id: 4,
        fname: "Amy",
        lname: "Broker",
        dateOfBirth: dayjs("4/23/1999").format("DD-MM-YYYY"),
        phone: "123456789"
    },
    {
        id: 5,
        fname: "Amy",
        lname: "Broker",
        dateOfBirth: dayjs("4/23/1999").format("DD-MM-YYYY"),
        phone: "123456789"
    },
]