import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Searchbar } from './Searchbar';
import { Button, TextField, FormControl, FormGroup, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import Link from 'next/link';
import RadioSelection from './RadioSelection';
import CheckboxSelection from './CheckboxSelection';
import { cities, propertyTypes, statusList, numberList, facilityList, styleList, accessList, preferenceList } from '../data/data';
import { useRouter } from 'next/router'


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'address',
        numeric: false,
        disablePadding: true,
        label: 'Property Address',
    },
    {
        id: 'city',
        numeric: false,
        disablePadding: true,
        label: 'City',
    },
    {
        id: 'propertyType',
        numeric: false,
        disablePadding: true,
        label: 'Property Type',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'bedrooms',
        numeric: true,
        disablePadding: false,
        label: 'Bedrooms',
    },
    {
        id: 'bathrooms',
        numeric: true,
        disablePadding: false,
        label: 'Bathrooms',
    },
    {
        id: 'kitchen',
        numeric: true,
        disablePadding: false,
        label: 'Kitchen',
    },
    {
        id: 'description',
        numeric: true,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'rentalStatus',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: '_id',
        numeric: true,
        disablePadding: false,
        label: 'Showcase Link',
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
    }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected, onChange, handleSortClick, handleDeleteClick } = props;

    return (
        <Toolbar
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                })

            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="black"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 50%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Rental Listing
                </Typography>
            )}

            {numSelected == 0 ? (
                <Searchbar onChange={onChange} />
            ) : null}


            {numSelected == 0 ? (
                <Button variant="contained" color="success" sx={{ marginLeft: '2%' }}><Link href={`/listings/new`}>Create</Link></Button>
            ) : null}


            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon onClick={handleDeleteClick} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton onClick={handleSortClick}>
                        {/* <FilterListIcon
                            sx={{ color: 'white' }} /> */}
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const SortTable = () => {
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedPropertyType, setSelectedPropertyType] = useState([]);
    const [selectedBedroomsNumber, setSelectedBedroomsNumber] = useState();
    const [selectedBathroomsNumber, setSelectedBathroomsNumber] = useState();
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedAccessType, setSelectedAccessType] = useState();

    const handleSearch = () => {
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Paper sx={{ width: '100%', mb: 2 }} elevation={15}>
                    <CheckboxSelection formLabel='City:' options={cities} setSelectedOptions={setSelectedCities} selectedOptions={selectedCities} />
                    <CheckboxSelection formLabel='Property Type:' options={propertyTypes} setSelectedOptions={setSelectedPropertyType} selectedOptions={selectedPropertyType} />
                    <RadioSelection formLabel='Bedrooms:' options={numberList} setSelectedChecked={setSelectedBedroomsNumber} />
                    <RadioSelection formLabel='Bathrooms:' options={numberList} setSelectedChecked={setSelectedBathroomsNumber} />
                    <CheckboxSelection formLabel='Facilities:' options={facilityList} setSelectedOptions={setSelectedFacilities} selectedOptions={selectedFacilities} />
                    <RadioSelection formLabel='Private Access:' options={accessList} setSelectedChecked={setSelectedAccessType} />
                    <div style={{ marginLeft: '45%', marginTop: '0.5%', marginBottom: '0.5%' }}><Button variant="contained" onClick={handleSearch}>Search</Button></div>

                </Paper>
            </Box>

        </>
    )
}

const Listingtable = ({ rowData, setRowdata }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('address');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showData, setShowData] = useState([]);
    const [isSortList, setIsSortList] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setShowData(rowData)
    }, [rowData])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = showData.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleSearch = (keyword) => {
        const filtered = rowData.filter(row => isMathcedKeyword(keyword, row));
        setShowData(filtered);
    };

    const handleSortClick = () => {
        setIsSortList(!isSortList)
    };

    const handleDeleteClick = () => {
        selected.forEach(async (selectedListingID) => {
            await fetch(`http://18.222.121.41:3002/api/real-estate/${selectedListingID}`, { method: 'DELETE' });
        })
        const temp = rowData.filter((listing) => selected.includes(listing._id) === false);
        setRowdata(temp);
        setSelected([]);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const isMathcedKeyword = (keyword, row) => {
        for (const [, value] of Object.entries(row)) {
            const val = value.toString().toLocaleLowerCase();
            if (val.includes(keyword)) { return true }
        }
    };

    const handleUpdate = (listingID) => {
        router.push({
            pathname: `/listings/${listingID}`,
            query: { listingID: listingID },
        })

    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - showData.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onChange={(e) => handleSearch(e.target.value)}
                    handleSortClick={handleSortClick}
                    handleDeleteClick={handleDeleteClick}
                />

                {isSortList ? (<SortTable />) : null}

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={showData.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(showData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    onClick={(event) => handleClick(event, row._id)}
                                                />
                                            </TableCell>
                                            {/* {headCells.map((headCell) =>
                                                headCell.label === 'address' ?
                                                    (<TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row[headCell.id]}
                                                    </TableCell>) :
                                                    (<TableCell key={headCell.id}>{row[headCell.id]}</TableCell>)
                                            )} */}
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                align="left"
                                            >
                                                {row.address}
                                            </TableCell>
                                            <TableCell align="left">{row.city}</TableCell>
                                            <TableCell align="left">{row.propertyType}</TableCell>
                                            <TableCell align="right">${row.price}</TableCell>
                                            <TableCell align="right">{row.bedrooms}</TableCell>
                                            <TableCell align="right">{row.bathrooms}</TableCell>
                                            <TableCell align="right">{row.kitchens}</TableCell>
                                            <TableCell align="right">{row.description.length > 25 ? row.description.substring(0, 25) : row.description}</TableCell>
                                            <TableCell align="right">{row.rentalStatus}</TableCell>
                                            <TableCell align="right"><Button variant="contained"><Link href={`/showcase/${row._id}`} passHref><a target="_blank" rel="noopener noreferrer">
                                                Link
                                            </a></Link></Button></TableCell>
                                            <TableCell align="right"><Button variant="contained" color="success" onClick={() => handleUpdate(row._id)}>Update</Button></TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={showData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
        </Box>
    );
}

export default Listingtable