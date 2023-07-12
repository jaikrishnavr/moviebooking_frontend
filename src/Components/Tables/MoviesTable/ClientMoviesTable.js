import React, { forwardRef, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MaterialTable from "material-table";

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

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

import { getAllMovies, updateMovieById } from "../../../Api/Movie.api";

function MoviesTable({ moviesList }) {
  const [tableData, setTableData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    NextPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request to fetch all movies
        const response = await getAllMovies(); // Replace "your-api-endpoint" with the actual URL
        const newData = response.data; // Assuming the response data contains the updated table data
    
        // Update the table data in state
        setTableData(newData);
      } catch (error) {
        // Handle the error
        console.error('Error fetching movies:', error);
      }
    };
    
    fetchData(); // Call the fetchData function when the component mounts
    
  })

//model starts from here

  const handleEditClick = (event, rowData) => {
    setSelectedMovie(rowData);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = (newData, oldData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedData = { ...oldData, ...newData };
        await updateMovieById(newData._id, oldData);

        const updatedTableData = (tableData || []).map((row) => {
          if (row._id === newData._id) {
            return { ...row, ...updatedData };
          }
          return row;
        });
        setTableData(updatedTableData);

        resolve();
      } catch (error) {
        console.log(error);
        reject(error); // Pass the error to reject()
      }
    })
      .then(() => {
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error); // Handle the error here
      });
  };

  return (
    <>
      <MaterialTable
        columns={[
          { title: "Id", field: "_id" },
          {
            title: "Poster",
            field: "posterUrl",
            render: (rowData) => (
              <img src={rowData.posterUrl} alt="Poster" style={{ width: 70 }} />
            ),
          },
          { title: "Name", field: "name" },
          { title: "Director", field: "director" },
          { title: "Release Date", field: "releaseDate" },
          { title: "Release Status", field: "releaseStatus" },
        ]}
        data={tableData}
        title="Movie List"
        icons={tableIcons}
        options={{
          headerStyle: {
            backgroundColor: "black",
            color: "#FFF",
          },
          exportButton: true,
          sorting: false,
          filtering: false,
          rowStyle: {
            cursor: "pointer",
            backgroundColor: "#EEE",
          },
          paginationType: isMobile ? "stepped" : "normal",
          pageSizeOptions: [5, 10, 15],
          actionsCellStyle: { width: "100px" },
          actionsColumnIndex: 0,
        }}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit Movie",
            onClick: handleEditClick,
          },
        ]}
  
      />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="m-1">Id: {selectedMovie?._id}</h5>

          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text "> Poster </span>
            <input
              type="text"
              name="posterUrl"
              value={selectedMovie?.posterUrl}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  posterUrl: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text "> Trailer url </span>
            <input
              type="text"
              name="posterUrl"
              value={selectedMovie?.trailerUrl}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  posterUrl: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text "> Name </span>
            <input
              type="text"
              name="name"
              value={selectedMovie?.name}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, name: e.target.value })
              }
            />
          </div>

          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text "> Director </span>
            <input
              type="text"
              name="director"
              value={selectedMovie?.director}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, director: e.target.value })
              }
            />
          </div>

          <div className="input-group mt-3 mx-2">
            <span className="input-group-text"> Release Date </span>
            <input
              type="text"
              name="releaseDate"
              value={selectedMovie?.releaseDate}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  releaseDate: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text "> Release status </span>
            <input
              type="text"
              name="releaseStatus"
              value={selectedMovie?.releaseStatus}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  releaseStatus: e.target.value,
                })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleModalSave(selectedMovie, selectedMovie)}>
            Update Movie
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MoviesTable;
