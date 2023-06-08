import type { FC } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import Scrollbar from './Scrollbar';

interface ExcelToTableProps {
    data: any[];
    title: string;
}

const ExcelToTable: FC<ExcelToTableProps> = (props) => {
    const { data, title, ...other } = props;
    console.log(data)

    if (!data) {
        return null
    }

    const headers = data[0];
    const rows = data.slice(1);

    return (
        <Card {...props}>
            <CardHeader
                title={title || 'Details'}
            />
            <Divider />
            <Scrollbar>
                <Box sx={{ minWidth: 1150 }}>
                    <Table>
                        <TableHead>
                            {headers.map((header) => (
                                <TableCell>
                                    {header}
                                </TableCell>
                            ))}
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row[0]}>
                                    {row.map((dat) => (
                                        <TableCell>
                                            {dat}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
        </Card>
    );
};

ExcelToTable.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default ExcelToTable;
