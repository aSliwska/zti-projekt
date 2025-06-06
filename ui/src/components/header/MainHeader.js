import { Box, Group } from '@mantine/core';
import style from './MainHeader.module.css';
import Link from 'next/link';

export default function MainHeader() {
  return (
    <Box pb={80}>
      <header className={style.header}>
        <Group justify="center" gap={64} h="100%">
          <Link href="/measurements" className={style.link}>
            Pomiary
          </Link>
          <Link href="/patients" className={style.link}>
            Pacjenci
          </Link>
        </Group>
      </header>
    </Box>
  );
}