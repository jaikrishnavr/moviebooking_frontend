import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  AddBox,
  Check,
  Clear,
  DeleteOutline,
  ChevronRight,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  ChevronLeft,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";
import { getAllUsers, updateUsers } from '../../../Api/Users.api';

function UsersTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tableIcons = {
    Add: AddBox,
    Check: Check,
    Clear: Clear,
    Delete: DeleteOutline,
    DetailPanel: ChevronRight,
    Edit: Edit,
    Export: SaveAlt,
    Filter: FilterList,
    FirstPage: FirstPage,
    LastPage: LastPage,
    NextPage: ChevronRight,
    PreviousPage: ChevronLeft,
    ResetSearch: Clear,
    Search: Search,
    SortArrow: Remove,
    ThirdStateCheck: Remove,
    ViewColumn: ViewColumn
  };

  const [tableData, setTableData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      const newData = response.data;
      setTableData(newData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRowUpdate = async (newData, oldData) => {
    try {
      const updatedData = { ...oldData, ...newData };
      await updateUsers(oldData.userId, updatedData);
      const updatedTableData = tableData.map(row => {
        if (row.userId === oldData.userId) {
          return { ...row, ...newData };
        }
        return row;
      });
      setTableData(updatedTableData);
      setSelectedUser({ ...oldData, ...newData }); // Update the selected user data
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={[
          { title: "User Id", field: "userId", editable: 'never' },
          { title: "User Name", field: "name", editable: 'never' },
          { title: "Email", field: "email", editable: 'never' },
          { title: "User Type", field: "userTypes", editable: 'never' },
          { title: "Status", field: "userStatus" }
        ]}
        data={tableData}
        title="User List"
        icons={tableIcons}
        options={{
          headerStyle: {
            backgroundColor: 'black',
            color: '#FFF'
          },
          exportButton: true,
          sorting: false,
          filtering: true,
          rowStyle: {
            cursor: "pointer",
            backgroundColor: '#EEE'
          },
          paginationType: isMobile ? "stepped" : "normal",
          pageSizeOptions: [5, 10, 15]
        }}
        editable={{
          onRowUpdate: (newData, oldData) => handleRowUpdate(newData, oldData)
        }}
      />
    </div>
  );
}

export default UsersTable;
