import { useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Box,
    Breadcrumbs,
    Container,
    Divider,
    Grid,
    Link,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import {
    AccountGeneralSettings,
    AccountNotificationsSettings,
    AccountSecuritySettings
} from '../../components/dashboard/account';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import LecturePC from 'src/components/dashboard/latex/Lecture';
import CollectivePC from 'src/components/dashboard/latex/Collective';

const tabs = [
    { label: 'Lecture PC', value: 'lecturePC' },
    { label: 'Lecture CLO', value: 'lectureCLO' },
    { label: 'Collective PC', value: 'Collective PC' },
    { label: 'Collective CLO', value: 'Collective CLO' }
];

const LatexGenerator: FC = () => {
    const { settings } = useSettings();
    const [currentTab, setCurrentTab] = useState<string>('lecturePC');

    const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
        setCurrentTab(value);
    };

    return (
        <>
            <Helmet>
                <title>BOUN Blockchain Based Assestment</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 8
                }}
            >
                <Container maxWidth={settings.compact ? 'xl' : false}>
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Grid item>
                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                Latex Generator
                            </Typography>
                            <Breadcrumbs
                                aria-label="breadcrumb"
                                separator={<ChevronRightIcon fontSize="small" />}
                                sx={{ mt: 1 }}
                            >
                                <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to="/dashboard"
                                    variant="subtitle2"
                                >
                                    Dashboard
                                </Link>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Latex Generator
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <Tabs
                            indicatorColor="primary"
                            onChange={handleTabsChange}
                            scrollButtons="auto"
                            textColor="primary"
                            value={currentTab}
                            variant="scrollable"
                        >
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.value}
                                    label={tab.label}
                                    value={tab.value}
                                />
                            ))}
                        </Tabs>
                    </Box>
                    <Divider />
                    <Box sx={{ mt: 3 }}>
                        {currentTab === 'lecturePC' && <LecturePC field="pc" />}
                        {currentTab === 'lectureCLO' && <LecturePC field="clo" />}
                        {currentTab === 'Collective PC' && <CollectivePC field="cpc" />}
                        {currentTab === 'Collective CLO' && <CollectivePC field="cclo" />}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default LatexGenerator;
