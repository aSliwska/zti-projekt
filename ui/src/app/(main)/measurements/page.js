"use client";

import dayjs from "dayjs";
import ListWithForm from "@/components/listWithForm/ListWithForm";
import { LineChart } from "@mantine/charts";
import style from "./measurements.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BLOOD_PRESSURE, CREATE_WEIGHT, currentBloodPressureIdAtom, currentWeightIdAtom, patientCardAtom, QUERY_PATIENT_CHARTS, REMOVE_BLOOD_PRESSURE, REMOVE_WEIGHT, UPDATE_BLOOD_PRESSURE, UPDATE_WEIGHT } from "@/store/store";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

export default function Measurements() {
    const patientCard = useAtomValue(patientCardAtom);
    const { loading, error, data, refetch } = useQuery(QUERY_PATIENT_CHARTS, { variables: { id: patientCard?.id }});
    const [bloodPressures, setBloodPressures] = useState(data?.patient.bloodPressures);
    const [weights, setWeights] = useState(data?.patient.weights);

    const [createBloodPressure, createBloodPressureObj] = useMutation(CREATE_BLOOD_PRESSURE);
    const [updateBloodPressure, updateBloodPressureObj] = useMutation(UPDATE_BLOOD_PRESSURE);
    const [removeBloodPressure, removeBloodPressureObj] = useMutation(REMOVE_BLOOD_PRESSURE);
    const [currentBloodPressureId, setCurrentBloodPressureId] = useAtom(currentBloodPressureIdAtom);
    const [createWeight, createWeightObj] = useMutation(CREATE_WEIGHT);
    const [updateWeight, updateWeightObj] = useMutation(UPDATE_WEIGHT);
    const [removeWeight, removeWeightObj] = useMutation(REMOVE_WEIGHT);
    const [currentWeightId, setCurrentWeightId] = useAtom(currentWeightIdAtom);

    useEffect(() => {
        setBloodPressures(data?.patient.bloodPressures.map((pressure) => {
            return {
                ...pressure,
                measurement_time: dayjs(pressure.measurement_time).format("DD-MM-YYYY"),
            }
        }));
        setWeights(data?.patient.weights.map((weight) => {
            return {
                ...weight,
                measurement_time: dayjs(weight.measurement_time).format("DD-MM-YYYY"),
            }
        }));
    }, [data])

    const onCreateBloodPressure = useCallback(async (values) => {
        await createBloodPressure({ variables: { 
            patient_id: parseInt(patientCard.id),
            bloodPressureInput: {
                measurement_time: dayjs(values.measurement_time + " +00:00", "DD-MM-YYYY Z", false).format(),
                systolic: parseInt(values.systolic),
                diastolic: parseInt(values.diastolic)
            } 
        }});
        refetch();
    }, [refetch, createBloodPressure]);
    const onUpdateBloodPressure = useCallback(async (values) => {
        await updateBloodPressure({ variables: { 
            id: currentBloodPressureId,
            bloodPressureInput: {
                measurement_time: dayjs(values.measurement_time + " +00:00", "DD-MM-YYYY Z", false).format(),
                systolic: parseInt(values.systolic),
                diastolic: parseInt(values.diastolic)
            }
        }});
        refetch();
    }, [refetch, updateBloodPressure, currentBloodPressureId]);
    const onRemoveBloodPressure = useCallback(async (id) => {
        await removeBloodPressure({ variables: { 
            id: id
        }});
        refetch();
    }, [refetch, removeBloodPressure]);

    const onCreateWeight = useCallback(async (values) => {
        await createWeight({ variables: { 
            patient_id: parseInt(patientCard.id),
            weightInput: {
                measurement_time: dayjs(values.measurement_time + " +00:00", "DD-MM-YYYY Z", false).format(),
                weight: parseInt(values.weight)
            } 
        }});
        refetch();
    }, [refetch, createWeight]);
    const onUpdateWeight = useCallback(async (values) => {
        await updateWeight({ variables: { 
            id: currentWeightId,
            weightInput: {
                measurement_time: dayjs(values.measurement_time + " +00:00", "DD-MM-YYYY Z", false).format(),
                weight: parseInt(values.weight)
            }
        }});
        refetch();
    }, [refetch, updateWeight, currentWeightId]);
    const onRemoveWeight = useCallback(async (id) => {
        await removeWeight({ variables: { 
            id: id
        }});
        refetch();
    }, [refetch, removeWeight]);

    if (loading) return 'Loading...';
    if (error) return `Proszę wybierz pacjenta z listy.`;

    return (
        <div className={style.row}>
            <div className={style.column}>
                <LineChart
                    yAxisProps={{
                        domain: [
                            ((bloodPressures && bloodPressures.length > 0) ? bloodPressures.reduce((prev, curr) => prev.diastolic < curr.diastolic ? prev : curr).diastolic - 5 : 0), 
                            ((bloodPressures && bloodPressures.length > 0) ? bloodPressures.reduce((prev, curr) => prev.systolic > curr.systolic ? prev : curr).systolic + 5 : 200)
                        ]
                    }}
                    h={300}
                    data={bloodPressures}
                    dataKey="measurement_time"
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
                    rows={bloodPressures}
                    columns={columns_pressure}
                    defaultFormValues={{
                        measurement_time: "",
                        systolic: "",
                        diastolic: ""
                    }}
                    formValidate={{
                        measurement_time: (val) => dayjs(val, "DD-MM-YYYY", true).isValid() ? null : 'Niewłaściwy format daty',
                        systolic: (val) => /^[0-9]+$/.test(val) ? null : "Ciśnienie musi być liczbą całkowitą.",
                        diastolic: (val) => /^[0-9]+$/.test(val) ? null : "Ciśnienie musi być liczbą całkowitą.",
                    }}
                    onCreate={onCreateBloodPressure}
                    onUpdate={onUpdateBloodPressure}
                    onRemove={onRemoveBloodPressure}
                    setCurrentId={setCurrentBloodPressureId}
                />
            </div>
            <div className={style.column}>
                <LineChart
                    yAxisProps={{
                        domain: [
                            ((weights && weights.length > 0) ? weights.reduce((prev, curr) => prev.weight < curr.weight ? prev : curr).weight - 5 : 0), 
                            ((weights && weights.length > 0) ? weights.reduce((prev, curr) => prev.weight > curr.weight ? prev : curr).weight + 5 : 200)
                        ]
                    }}
                    h={300}
                    data={weights}
                    dataKey="measurement_time"
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
                    rows={weights}
                    columns={columns_weight}
                    defaultFormValues={{
                        measurement_time: "",
                        weight: ""
                    }}
                    formValidate={{
                        measurement_time: (val) => dayjs(val, "DD-MM-YYYY", true).isValid() ? null : 'Niewłaściwy format daty',
                        weight: (val) => /^[0-9]+.[0-9]+$/.test(val) ? null : 'Waga musi być liczbą ułamkową z kropką.',
                    }}
                    onCreate={onCreateWeight}
                    onUpdate={onUpdateWeight}
                    onRemove={onRemoveWeight}
                    setCurrentId={setCurrentWeightId}
                />
            </div>
        </div>
    );
}

const columns_pressure = [
    {
        id: "measurement_time",
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
        id: "measurement_time",
        name: "Data"
    },
    {
        id: "weight",
        name: "Waga"
    },
]