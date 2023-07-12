import React, { forwardRef, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MaterialTable from "material-table";
import {Add, Check, ChevronLeft,ChevronRight,Clear, DeleteOutline,Edit,FilterList,FirstPage,LastPage,ArrowDownward,Remove, SaveAlt,Search,ViewColumn, Delete
} from "@material-ui/icons";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  createMovies,
  deleteMovieById,
  getAllMovies,
  updateMovieById
} from "../../../Api/Movie.api";

const tableIcons = {
  Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (<ChevronRight {...props} ref={ref} /> )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (<ChevronLeft {...props} ref={ref} />)),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => (<ArrowDownward {...props} ref={ref} />)),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function MoviesTable() {
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [createSelectedMovie, setCreateSelectedMovie] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMovies();
        const newData = response.data;
        setTableData(newData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

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
        await updateMovieById(newData._id, updatedData);

        const updatedTableData = tableData.map((row) =>
          row._id === newData._id ? { ...row, ...updatedData } : row
        );
        setTableData(updatedTableData);

        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
      .finally(() => {
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOpenCreateModal = () => {
    setCreateSelectedMovie({
      posterUrl: "",
      trailerUrl: "",
      name: "",
      director: "",
      releaseDate: "",
      releaseStatus: ""
    });
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    setCreateSelectedMovie({});
  };

  const handleAddRow = (newData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const movieData = {
          trailerUrl: newData.trailerUrl,
          posterUrl: newData.posterUrl,
          name: newData.name,
          director: newData.director,
          releaseDate: newData.releaseDate,
          releaseStatus: newData.releaseStatus,
          language: newData.language,
          description: newData.description,
          casts : newData.casts 
        };

        // Check if any required fields are missing
        const requiredFields = ['trailerUrl', 'posterUrl', 'name', 'director', 'releaseDate', 'releaseStatus'];
        const missingFields = requiredFields.filter(field => !movieData[field]);

        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        await createMovies(movieData);

        const response = await getAllMovies();
        const updatedTableData = response.data;
        setTableData(updatedTableData);

        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
      .finally(() => {
        setShowCreateModal(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add the movie. Please check the entered data.");
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
            )
          },
          { title: "Name", field: "name" },
          { title: "Director", field: "director" },
          { title: "Release Date", field: "releaseDate" },
          { title: "Release Status", field: "releaseStatus" }
        ]}
        data={tableData}
        title="Movie List"
        icons={tableIcons}
        options={{
          headerStyle: {
            backgroundColor: "black",
            color: "#FFF"
          },
          exportButton: true,
          sorting: false,
          filtering: false,
          rowStyle: {
            cursor: "pointer",
            backgroundColor: "#EEE"
          },
          paginationType: isMobile ? "stepped" : "normal",
          pageSizeOptions: [5, 10, 15],
          actionsCellStyle: { width: "100px" },
          actionsColumnIndex: 0
        }}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit Movie",
            onClick: handleEditClick
          },
          {
            icon: Delete,
            tooltip: "Delete Movie",
            onClick: (event, rowData) => {
              deleteMovieById(rowData._id)
                .then(() => {
                  const updatedTableData = tableData.filter(
                    (row) => row._id !== rowData._id
                  );
                  setTableData(updatedTableData);
                })
                .catch((error) => {
                  console.error("Error deleting movie:", error);
                });
            }
          },
          {
            icon: Add,
            tooltip: "Add Movie",
            isFreeAction: true,
            onClick: handleOpenCreateModal
          }
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
              className="form-control"
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
              name="Trailer url"
              className="form-control"
              value={selectedMovie?.trailerUrl}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  trailerUrl: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text ">Movie Name </span>
            <input
              type="text"
              name="name"
              className="form-control"
              value={selectedMovie?.name}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, name: e.target.value })
              }
            />
          </div>

          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text "> description </span>
            <textarea
            rows='5'
              type="text"
              className="form-control"
              name="description"
              value={selectedMovie?.description}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, description: e.target.value })
              }
            />
          </div>

          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text "> Director </span>
            <input
              type="text"
              className="form-control"
              name="director"
              value={selectedMovie?.director}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, director: e.target.value })
              }
            />
          </div>
          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text "> casts </span>
            <input
              type="text"
              className="form-control"
              name="casts"
              value={selectedMovie?.casts}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, casts: e.target.value })
              }
            />
          </div>
          <div className="input-group mt-3 mx-2 ">
            <span className="input-group-text "> language </span>
            <input
             className="form-control"
              type="text"
              name="language"
              value={selectedMovie?.language}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, language: e.target.value })
              }
            />
          </div>

          <div className="input-group mt-3 mx-2">
            <span className="input-group-text"> Release Date </span>
            <input
              type="text"
              className="form-control"
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

        

          <div className="input-group mb-3 mt-3">
  <span className="input-group-text">Release Status </span>
  <select
    name="priority"
    className="form-select"
    value={selectedMovie?.releaseStatus || ""}
    onChange={(e) =>
      setSelectedMovie({
        ...selectedMovie,
        releaseStatus: e.target.value,
    })
  }
  >
    <option value=""> select the status </option>
    <option value="RELEASED"> RELEASED </option>
    <option value="UNRELEASED"> UNRELEASED </option>
    <option value="BLOCKED"> BLOCKED </option>
  </select>
</div>



       {/*  <div className="input-group mt-3 mx-2 ">
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
          </div>*/ } 
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

      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <div className="input-group mt-3 mx-2 " >
            <span className="input-group-text ">Movie Name</span>
            <input
              type="text"
              name="name"
              value={createSelectedMovie?.name || ""}
              onChange={(e) =>
                setCreateSelectedMovie({
                  ...createSelectedMovie,
                  name: e.target.value
                })
              }
              key="name"
            />
          </div>


          <div className="input-group mt-3 mx-2">
            <span className="input-group-text">description </span>
            <textarea 
            rows="4"
              type="text"
              name="description"
              value={createSelectedMovie?.description || ""}
              onChange={(e) =>
                setCreateSelectedMovie({
                  ...createSelectedMovie,
                  description: e.target.value
                })
              }
              key="description"
            />
          </div>

          <div className="input-group mt-3 mx-2">
            <span className="input-group-text">Poster</span>
            <input
              type="text"
              name="posterUrl"
              value={createSelectedMovie?.posterUrl || ""}
              onChange={(e) =>
                setCreateSelectedMovie({
                  ...createSelectedMovie,
                  posterUrl: e.target.value
                })
              }
              key="posterUrl"
            />
          </div>

          <div className="input-group mt-3 mx-2">
            <span className="input-group-text">Trailer URL</span>
            <input
              type="text"
              name="trailerUrl"
              value={createSelectedMovie?.trailerUrl || ""}
              onChange={(e) =>
                setCreateSelectedMovie({
                  ...createSelectedMovie,
                  trailerUrl: e.target.value
                })
              }
              key="trailerUrl"
            />
          </div>


          <div className="input-group mt-3 mx-2">
            <span className="input-group-text">Director</span>
            <input
              type="text"
              name="director"
              value={createSelectedMovie?.director || ""}
              onChange={(e) =>
                setCreateSelectedMovie({
                  ...createSelectedMovie,
                  director: e.target.value
                })
              }
              key="director"
            />
          </div>

          <div className="input-group mt-3 mx-2">
            <span className="input-group-text">language</span>
            <input
              type="text"
              name="language"
              value={createSelectedMovie?.language || ""}
              onChange={(e) =>
                setCreateSelectedMovie({
                  ...createSelectedMovie,
                  language: e.target.value
                })
              }
              key="language"
            />
          </div>

          <div className="input-group mt-3 mx-2">
            <span className="input-group-text">casts</span>
            <input
              type="text"
              name="casts"
              value={createSelectedMovie?.casts || ""}
              onChange={(e) =>
                setCreateSelectedMovie({
                  ...createSelectedMovie,
                  casts: e.target.value
                })
              }
              key="casts"
            />
          </div>
          
     

          <div className="input-group mt-3 mx-2">
            <span className="input-group-text">Release Date</span>
            <input
              type="date"
              name="releaseDate"
              value={createSelectedMovie?.releaseDate || ""}
              onChange={(e) =>
                setCreateSelectedMovie({
                  ...createSelectedMovie,
                  releaseDate: e.target.value
                })
              }
              key="releaseDate"
            />
          </div>

          <div className="input-group mb-3 mt-3">
  <span className="input-group-text">Release Status </span>
  <select
    name="priority"
    className="form-select"
    value={createSelectedMovie?.releaseStatus || ""}
    onChange={(e) =>
      setCreateSelectedMovie({
        ...createSelectedMovie,
        releaseStatus: e.target.value
      })
    }
    key="releaseStatus"
  >
    <option value=""> select the status </option>
    <option value="RELEASED"> RELEASED </option>
    <option value="UNRELEASED"> UNRELEASED </option>
    <option value="BLOCKED"> BLOCKED </option>
  </select>
</div>


        
        {  /*<div className="input-group mt-3 mx-2">
            <span className="input-group-text">Release Status</span>
            <input
              type="text"
              name="releaseStatus"
              value={createSelectedMovie?.releaseStatus || ""}
              onChange={(e) =>
                setCreateSelectedMovie({
                  ...createSelectedMovie,
                  releaseStatus: e.target.value
                })
              }
              key="releaseStatus"
            />
          </div>*/}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateModalClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => handleAddRow(createSelectedMovie)}
          >
            Add Movie
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MoviesTable;
