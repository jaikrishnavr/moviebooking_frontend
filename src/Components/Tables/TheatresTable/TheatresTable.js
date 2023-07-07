import MaterialTable from 'material-table'
import React, { forwardRef, useEffect, useState } from 'react'


import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { deleteTheatresById, getAllTheatres, updateTheatresById } from '../../../Api/Theatres.api';

function TheatresTable({theatresList}) {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} /> ),
        FirstPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
      };

      const [tableData, setTableData] = useState(theatresList); // Initialize the table data with initial props value

      useEffect(() => {
        const fetchTheatresData = async () => {
          try {
            const response = await getAllTheatres(); // Call the function with parentheses to invoke it
            if (response.ok) {
              const data = await response.json();
              setTableData(data); // Update the table data in state
            } else {
              throw new Error('Failed to fetch table data');
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchTheatresData(); // Fetch the initial table data
    
        // Subscribe to changes and update the table data in state
        const updateTableData = (newData) => {
          setTableData(newData);
        };
         // Add event listener for real-time updates
        const eventListener = (event) => {
          // Handle the event and update the table data accordingly
          updateTableData(event.data);
        };
         // Add event listener for real-time updates
          // Cleanup function to remove the event listener
      return () => { 

      };
      },[]);


      const handleRowUpdate = (newData, oldData) => {
        return new Promise(async (resolve, reject) => {
          try {
            // Perform the necessary data update or API call here
            const updatedData = { ...oldData, ...newData }; // Merge the old and new data
    
            await updateTheatresById(newData._id, updatedData); // Call the API function to update the theater
    
            // Update the table data in state
            const updatedTableData = tableData.map(row => {
              if (row._id === newData._id) {
                return { ...row, ...newData };
              }
              return row;
            });
            setTableData(updatedTableData);
    
            resolve(); // Resolve the promise to indicate success
          } catch (error) {
            console.log(error);
            reject();
          }
        });
      };
    
      const handleRowDelete = oldData => {
        return new Promise(async (resolve, reject) => {
          try {
            // Perform the necessary data deletion or API call here
    
            await deleteTheatresById(oldData._id); // Call the API function to delete the theater
    
            // Remove the deleted row from the table data in state
            const updatedTableData = tableData.filter(row => row._id !== oldData._id);
            setTableData(updatedTableData);
    
            resolve(); // Resolve the promise to indicate success
          } catch (error) {
            console.log(error);
            reject();
          }
        });
      };
    


  return (
  <MaterialTable
  
  columns={[
    {title:"Id", field:"_id"},
    {title:"Name", field:"name"},
    {title:"Description", field:"description"},
    {title:"Pincode", field:"pinCode"},
    {title:"City", field:"city"}
  ]}

  data={tableData}
  title= "Theaters List"
  icons={tableIcons}
  options={{
    headerStyle: {
      backgroundColor: 'black',
      color: '#FFF'
    },    

    exportButton: false,
  sorting: false,
 
  rowStyle: {
    cursor: "pointer",
    backgroundColor: '#EEE',
  },
  paginationType: isMobile ? "stepped" : "normal",
          pageSizeOptions: [5, 10, 15],
}}
editable={{

  onRowUpdate: handleRowUpdate,
  onRowDelete: handleRowDelete

}}

 
  />
  );
}

export default TheatresTable