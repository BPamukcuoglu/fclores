import type { FC } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    useTheme,
    Typography,
    Divider,
    Stack,
    Box,
} from '@material-ui/core';

const OverviewStoreScore: FC = () => {
    const theme = useTheme()

    return (
        <Card>
            <CardHeader title="Mağaza Metriklerim" />
            <Divider />
            <CardContent
                sx={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <Box style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Stack direction="column">
                        <Typography
                            variant="subtitle1"
                        >
                            Bekleyen Siparişlerim
                        </Typography>
                        <Typography
                            align="center"
                            variant="h4"
                        >
                            2
                        </Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography
                            variant="subtitle1"
                        >
                            Aksiyon Bekleyen İşlerim
                        </Typography>
                        <Typography
                            align="center"
                            variant="h4"
                        >
                            1
                        </Typography>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    )
};

export default OverviewStoreScore;
