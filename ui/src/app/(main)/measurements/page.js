"use client";

import dayjs from "dayjs";
import ListWithForm from "@/components/listWithForm/ListWithForm";
import { LineChart } from "@mantine/charts";
import style from "./measurements.module.css";

export default function Measurements() {
    return (
        <div className={style.row}>
            <div className={style.column}>
                <LineChart
                    h={300}
                    data={rows_pressure}
                    dataKey="mesurementTime"
                    series={[
                        { name: 'systolic', label: 'Skurczowe', color: 'orange.6' },
                        { name: 'diastolic', label: 'Rozkurczowe', color: 'teal.6' },
                    ]}
                    curveType="linear"
                    tickLine="xy"
                    gridAxis="xy"
                    withLegend
                    legendProps={{ verticalAlign: 'bottom', height: 50 }}
                />
                <ListWithForm
                    rows={rows_pressure}
                    columns={columns_pressure}
                    defaultFormValues={{
                        mesurementTime: "",
                        systolic: "",
                        diastolic: ""
                    }}
                    formValidate={{
                        mesurementTime: (val) => dayjs(val).isValid() ? null : 'Niewłaściwy format daty',
                        systolic: (val) => /^[0-9]+$/.test(val) ? null : "Ciśnienie musi być liczbą całkowitą.",
                        diastolic: (val) => /^[0-9]+$/.test(val) ? null : "Ciśnienie musi być liczbą całkowitą.",
                    }}
                />
            </div>
            <div className={style.column}>
                <LineChart
                    h={300}
                    data={rows_weight}
                    dataKey="mesurementTime"
                    series={[
                        { name: 'weight', label: 'Waga', color: 'blue.6' },
                    ]}
                    curveType="linear"
                    tickLine="xy"
                    gridAxis="xy"
                    withLegend
                    legendProps={{ verticalAlign: 'bottom', height: 50 }}
                />
                <ListWithForm
                    rows={rows_weight}
                    columns={columns_weight}
                    defaultFormValues={{
                        mesurementTime: "",
                        weight: ""
                    }}
                    formValidate={{
                        mesurementTime: (val) => dayjs(val).isValid() ? null : 'Niewłaściwy format daty',
                        weight: (val) => /^[0-9]+.[0-9]+$/.test(val) ? null : 'Waga musi być liczbą ułamkową z kropką.',
                    }}
                />
            </div>
        </div>
    );
}

const columns_pressure = [
    {
        id: "mesurementTime",
        name: "Data"
    },
    {
        id: "systolic",
        name: "Skurczowe"
    },
    {
        id: "diastolic",
        name: "Rozkurczowe"
    },
]

const columns_weight = [
    {
        id: "mesurementTime",
        name: "Data"
    },
    {
        id: "weight",
        name: "Waga"
    },
]

const rows_pressure = [
    {
        id: 1,
        mesurementTime: dayjs("4/23/2024").format("DD-MM-YYYY"),
        systolic: "110",
        diastolic: "70"
    },
    {
        id: 2,
        mesurementTime: dayjs("4/24/2024").format("DD-MM-YYYY"),
        systolic: "120",
        diastolic: "75"
    },
    {
        id: 3,
        mesurementTime: dayjs("4/25/2024").format("DD-MM-YYYY"),
        systolic: "130",
        diastolic: "80"
    },
    {
        id: 4,
        mesurementTime: dayjs("4/26/2024").format("DD-MM-YYYY"),
        systolic: "125",
        diastolic: "90"
    },
    {
        id: 5,
        mesurementTime: dayjs("4/27/2024").format("DD-MM-YYYY"),
        systolic: "105",
        diastolic: "70"
    },
]

const rows_weight = [
    {
        id: 1,
        mesurementTime: dayjs("4/23/2024").format("DD-MM-YYYY"),
        weight: "60"
    },
    {
        id: 2,
        mesurementTime: dayjs("4/24/2024").format("DD-MM-YYYY"),
        weight: "62"
    },
    {
        id: 3,
        mesurementTime: dayjs("4/25/2024").format("DD-MM-YYYY"),
        weight: "61"
    },
    {
        id: 4,
        mesurementTime: dayjs("4/26/2024").format("DD-MM-YYYY"),
        weight: "61"
    },
    {
        id: 5,
        mesurementTime: dayjs("4/27/2024").format("DD-MM-YYYY"),
        weight: "60"
    },
]