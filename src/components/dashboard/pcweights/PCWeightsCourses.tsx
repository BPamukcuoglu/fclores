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

interface Course {
    department: string;
    code: string;
    semester: string;
    instructor: string;
}

const PCWeightsCourses: FC<any> = (props) => {
    const courses = [
        {
          department: "CMPE",
          code: "230",
          instructor: "OZTURAN",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "160",
          instructor: "TUGCU",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "140",
          instructor: "OZTURK",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "150",
          instructor: "OZGUR",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "240",
          instructor: "SEN",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "260",
          instructor: "AYDEMIR",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "300",
          instructor: "GUNGOR",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "321",
          instructor: "GUNDEM",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "350",
          instructor: "SAY",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "352",
          instructor: "USKUDARLI",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "362",
          instructor: "ALAGOZ",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "460",
          instructor: "AKARUN",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "462",
          instructor: "BAYTAS",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "477",
          instructor: "ERSOY",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "478",
          instructor: "OZTURAN",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "491",
          instructor: "GUNDEM",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "492",
          instructor: "GUNDEM",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "493",
          instructor: "OZGUR",
          semester: "2020-SPRING"
        },
        {
          department: "CMPE",
          code: "496",
          instructor: "GURGEN",
          semester: "2020-SPRING"
        },
        {
            department: "CMPE",
            code: "483",
            instructor: "OZTURAN",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "140",
            instructor: "OZTURK",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "150",
            instructor: "OZGUR",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "210",
            instructor: "GURGEN",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "220",
            instructor: "BINGOL",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "250",
            instructor: "YILMAZ",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "300",
            instructor: "GUNGOR",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "322",
            instructor: "TUGCU",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "343",
            instructor: "BAYTAS",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "344.01",
            instructor: "AKARUN",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "425",
            instructor: "OZTURAN",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "436",
            instructor: "SEN",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "443",
            instructor: "YURDAKUL",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "451",
            instructor: "USKUDARLI",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "475",
            instructor: "ERSOY",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "480",
            instructor: "UGUR",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "487",
            instructor: "SOYAK",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "491",
            instructor: "FAZELI",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "492",
            instructor: "FAZELI",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "493",
            instructor: "OZGUR",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "494",
            instructor: "AYDEMIR",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "49F",
            instructor: "ALAGOZ",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "49G",
            instructor: "YILMAZ",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "344.02",
            instructor: "FAZELI",
            semester: "2020-FALL"
          },
          {
            department: "CMPE",
            code: "230",
            instructor: "OZTURAN",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "160",
            instructor: "TUGCU",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "140",
            instructor: "OZTURK",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "150",
            instructor: "OZGUR",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "240",
            instructor: "SEN",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "260",
            instructor: "AYDEMIR",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "321",
            instructor: "OZGUR",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "350",
            instructor: "SAY",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "352",
            instructor: "USKUDARLI",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "362",
            instructor: "ALAGOZ",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "460",
            instructor: "AKARUN",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "462",
            instructor: "BAYTAS",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "476",
            instructor: "YILMAZ",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "477",
            instructor: "ERSOY",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "482",
            instructor: "CEMGIL",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "491",
            instructor: "GUNGOR",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "492",
            instructor: "GUNGOR",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "496",
            instructor: "GURGEN",
            semester: "2021-SPRING"
          },
          {
            department: "CMPE",
            code: "483",
            instructor: "OZTURANTEST",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "140",
            instructor: "OZTURK",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "150",
            instructor: "OZYURT",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "210",
            instructor: "GURGEN",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "220",
            instructor: "BINGOL",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "250",
            instructor: "YILMAZ",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "300",
            instructor: "GUNGOR",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "322",
            instructor: "TUGCU",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "343",
            instructor: "BAYTAS",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "344",
            instructor: "AKARUN",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "436",
            instructor: "SEN",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "443",
            instructor: "YURDAKUL",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "451",
            instructor: "USKUDARLI",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "475",
            instructor: "ERSOY",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "478",
            instructor: "OZTURAN",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "480",
            instructor: "UGUR",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "481",
            instructor: "GOKBERK",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "487",
            instructor: "SOYAK",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "48A",
            instructor: "OZGOVDE",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "491",
            instructor: "GURGEN",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "492",
            instructor: "GURGEN",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "493",
            instructor: "OZGUR",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "494",
            instructor: "AYDEMIR",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "49F",
            instructor: "ALAGOZ",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "49G",
            instructor: "YILMAZ",
            semester: "2021-FALL"
          },
          {
            department: "CMPE",
            code: "230",
            instructor: "OZTURAN",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "160",
            instructor: "GOKBERK-TUGCU",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "140",
            instructor: "OZGOVDE",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "150",
            instructor: "OZYURT",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "220",
            instructor: "YILMAZ",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "240",
            instructor: "SEN",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "260",
            instructor: "AYDEMIR",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "321",
            instructor: "OZGUR",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "350",
            instructor: "SAY",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "352",
            instructor: "USKUDARLI",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "362",
            instructor: "ALAGOZ",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "460",
            instructor: "AKARUN",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "462",
            instructor: "BAYTAS",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "476",
            instructor: "TUGCU",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "483",
            instructor: "OZTURAN",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "484",
            instructor: "OZGUR",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "485",
            instructor: "OZGOVDE",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "486",
            instructor: "ULUS",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "491",
            instructor: "OZGUR",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "492",
            instructor: "OZGUR",
            semester: "2022-SPRING"
          },
          {
            department: "CMPE",
            code: "496",
            instructor: "GURGEN",
            semester: "2022-SPRING"
          }
      ];
      
    const [selectedCode, setSelectedCode] = useState<any>('2020-FALL');
    const distinctCodes = [...new Set(courses.map((course) => course.semester))];
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
                            {distinctCodes.map((course) => (
                                <MenuItem
                                    value={course}
                                >
                                    {course}
                                </MenuItem>
                            ))}
                        </Select>
                        <Tooltip title="This is the list of courses given by CMPE department.">
                            <InformationCircleIcon fontSize="small" />
                        </Tooltip>
                    </Box>
                )}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Course Code
                        </TableCell>
                        <TableCell align="right">
                            Instructor
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.filter((a) => a.semester === selectedCode).map((course) => (
                        <Tooltip title={course.instructor}>
                            <TableRow
                                key={course.code}
                            >
                                <TableCell>
                                    <Typography
                                        color="textPrimary"
                                        sx={{ ml: 2 }}
                                        variant="subtitle2"
                                    >
                                        {course.department.concat(course.code)}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    {course.instructor}
                                </TableCell>
                            </TableRow>
                        </Tooltip>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default PCWeightsCourses;
