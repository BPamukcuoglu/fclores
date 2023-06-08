import { useState } from 'react';
import type { FC } from 'react';
import numeral from 'numeral';
import {
    Box,
    Card,
    CardHeader,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography
} from '@material-ui/core';
import InformationCircleIcon from '../../../icons/InformationCircle';
import PropTypes from 'prop-types';
import { Report } from 'src/types/report';

interface CourseCLO {
    department: string;
    code: string;
    cloNumber: number;
    description: string;
    average: number;
}

const turnReportsToCourseCLOs = (reports: Report[]) => {
    const descriptions = [
        "Explain and compare functionalities of various system software",
        "Explain the idea behind various system software",
        "Use the Unix environment, Unix tools and clouds",
        "Design and develop system software",
        "Develop Graphical User Interface (GUI) programs",
        "Do introductory level assembly language programming",
    ]
    const courseCLOs = [];
    reports.forEach((report) => {
        const reportCLOs = JSON.parse(report.clo).surveyCLOs;
        reportCLOs.forEach((clo, index) => {
            courseCLOs.push({
                course: report.department.concat(report.course),
                cloNumber: index + 1,
                description: descriptions[index % 6],
                average: clo
            })
        })
    })

    return courseCLOs;
}

const AnalyticsShortViewPerCourse: FC<any> = ({ reports }) => {
    const courseCLOs = turnReportsToCourseCLOs(reports);
    const distinctCodes = [...new Set(courseCLOs.map((course) => course.course))];
    const [selectedCode, setSelectedCode] = useState<any>(distinctCodes[0] || 'CMPE230');

    return (
        <Card>
            <CardHeader
                disableTypography
                title={(
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Select
                            defaultValue={selectedCode}
                            onChange={(e) => { setSelectedCode(e.target.value) }}
                        >
                            {distinctCodes.map((code) => (
                                <MenuItem
                                    value={code}
                                >
                                    {code}
                                </MenuItem>
                            ))}
                        </Select>
                        <Tooltip title="This is a summary of course learning outcomes of a lecture.">
                            <InformationCircleIcon fontSize="small" />
                        </Tooltip>
                    </Box>
                )}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            CLO Number
                        </TableCell>
                        <TableCell align="right">
                            Average Score
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courseCLOs.filter((a) => a.course === selectedCode).map((clo) => (
                        <Tooltip title={clo.description}>
                            <TableRow
                                key={clo.cloNumber}
                            >
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        sx={{ ml: 2 }}
                                        variant="subtitle2"
                                    >
                                        {"CLO".concat(clo.cloNumber.toString())}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    {numeral(clo.average).format('0.0')}
                                </TableCell>
                            </TableRow>
                        </Tooltip>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default AnalyticsShortViewPerCourse;

AnalyticsShortViewPerCourse.propTypes = {
    reports: PropTypes.array.isRequired
};
