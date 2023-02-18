import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

// function createData(fullname, course, firstname, lastname, middlename, email, gender, password, birthday) {
//   return {
//     fullname,
//     course,
//     lastname,
//     firstname,
//     middlename,
//     email,
//     gender,
//     password,
//     birthday
//   };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    id: "fullname",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
  },
  {
    id: "lastname",
    numeric: false,
    disablePadding: false,
    label: "Lastname",
  },
  {
    id: "firstname",
    numeric: false,
    disablePadding: false,
    label: "Firstname",
  },
  {
    id: "middlename",
    numeric: false,
    disablePadding: false,
    label: "Middlename",
  },
  {
    id: "course",
    numeric: false,
    disablePadding: false,
    label: "Course",
  },
  {
    id: "student-number",
    numeric: false,
    disablePadding: false,
    label: "Student Number",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender",
  },
  {
    id: "password",
    numeric: false,
    disablePadding: false,
    label: "Password",
  },
  {
    id: "birthday",
    numeric: false,
    disablePadding: false,
    label: "Birthday",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
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
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  // console.log(props.selected[0]);
  const navigate = useNavigate();

  // Edit student icon click
  const editStudentData = () => {
    navigate("/admin/edit-student-data", { state: { studentId: props.selected[0] } });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Students
        </Typography>
      )}

      {numSelected > 0 ? (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {numSelected == 1 && (
            <Tooltip title="Edit">
              <IconButton onClick={editStudentData}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);

  // get the student in firebase students doc
  const studentCollectionRef = collection(db, "students");

  useEffect(() => {
    const getStudentList = async () => {
      // get the student data in firebase
      const data = await getDocs(studentCollectionRef);
      setStudentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getStudentList();
  }, []);

  // console.log(studentList);

  // MUI TABLE CONFIG ---------->
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = studentList.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - studentList.length) : 0;

  // END: MUI TABLE CONFIG -------------->

  return (
    // <Box>
    //   {studentList.map((student) => {
    //     return (
    //       <Box key={student.id}>
    //         <Typography>{student.firstname}</Typography>
    //         <Typography>{student.lastname}</Typography>
    //       </Box>
    //     );
    //   })}
    // </Box>
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={studentList.length}
            />
            <TableBody>
              {stableSort(studentList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const lname =
                    row.lastname.charAt(0).toUpperCase() +
                    row.lastname.slice(1);
                  const fname =
                    row.firstname.charAt(0).toUpperCase() +
                    row.firstname.slice(1);
                  const middleInitial = row.middlename.charAt(0).toUpperCase();

                  // Create the fullname of student
                  const fullname =
                    lname + ", " + fname + ", " + middleInitial + ".";

                  // console.log(fullname)

                  // convert firebase timestamp date to readable date
                  const fireBaseTime = new Date(
                    row.birthday.seconds * 1000 +
                      row.birthday.nanoseconds / 1000000
                  );
                  const date = fireBaseTime.toDateString();
                  // const atTime = fireBaseTime.toLocaleTimeString();

                  // console.log(date, atTime);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {fullname}
                      </TableCell>
                      <TableCell align="center">
                        {row.lastname.charAt(0).toUpperCase() +
                          row.lastname.slice(1)}
                      </TableCell>
                      <TableCell align="center">
                        {row.firstname.charAt(0).toUpperCase() +
                          row.firstname.slice(1)}
                      </TableCell>
                      <TableCell align="center">
                        {row.middlename.charAt(0).toUpperCase() +
                          row.middlename.slice(1)}
                      </TableCell>
                      <TableCell align="left">{row.course}</TableCell>
                      <TableCell align="left">{row.student_number}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="center">{row.password}</TableCell>
                      <TableCell align="left">{date}</TableCell>
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
          count={studentList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default StudentList;
