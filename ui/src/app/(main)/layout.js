
import InfoCard from "@/components/info_card/InfoCard";
import { Grid, GridCol } from "@mantine/core";

export default function MainLayout({ children }) {
  return (
    <Grid gutter={'0px'}>
        <GridCol span={{ base: 0, sm: 0, md: 0, lg: 1, xl: 2 }}/>
        <GridCol span={{ base: 8, sm: 8, md: 8, lg: 8, xl: 6 }}>
            {children}
        </GridCol>
        <GridCol 
          span={{ base: 3, sm: 3, md: 3, lg: 2, xl: 2 }} 
          offset={{ base: 0.5, sm: 0.5, md: 0.5, lg: 0.5, xl: 1 }}
        >
            <InfoCard/>
        </GridCol>
        <GridCol span={{ base: 0, sm: 0, md: 0, lg: 1, xl: 2 }}/>
    </Grid>
  );
}