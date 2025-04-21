import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {TextInputField} from "@/fields/TextInputField.tsx";

export const ServicePointForm = ({errors}) => {
    return (
        <Card
            sx={{
                borderLeft: errors[key] ? "3px solid" : "none",
                borderLeftColor: "error.main",
            }}
            id={key}
        >
            <CardHeader title={labelPlural} />
            <CardContent>
                <Grid container spacing={2}>
                    <TextInputField
                        name="date.startDate"
                        label="Start Date"
                        required={true}
                        width={3}
                    />
                    <TextInputField
                        name="date.endDate"
                        label="End Date"
                        required={false}
                        width={3}
                    />
                </Grid>
            </CardContent>
        </Card>    );
};