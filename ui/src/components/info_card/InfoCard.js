"use client";

import style from './infoCard.module.css';
import { IconCalendarWeek, IconPhone } from '@tabler/icons-react';
import { Group, Paper, Text } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { patientCardAtom } from '@/store/store';

export default function InfoCard() {
    const patientCard = useAtomValue(patientCardAtom);

    return (
        <div className={style.wrapper}>
            <Paper withBorder radius="md" className={style.card}>
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                    Pacjent
                </Text>

                <Text fz="lg" fw={500} pt={4} pb={4} className={style.name}>
                    {(patientCard?.fname ?? '-') + " " + (patientCard?.lname ?? '')}
                </Text>

                <Group wrap="nowrap" gap={10} mt={3}>
                    <IconCalendarWeek stroke={1.5} size={16} className={style.icon} />
                    <Text fz="xs" c="dimmed">
                    {patientCard?.dateOfBirth ?? '-'}
                    </Text>
                </Group>

                <Group wrap="nowrap" gap={10} mt={5}>
                    <IconPhone stroke={1.5} size={16} className={style.icon} />
                    <Text fz="xs" c="dimmed">
                    {patientCard?.phone ?? '-'}
                    </Text>
                </Group>
            </Paper>
        </div>
    );
}