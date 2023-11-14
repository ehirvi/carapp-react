import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useRef } from "react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";


const CarList = () => {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("Car succesfully deleted");

    const CAR_URL = "https://carrestapi.herokuapp.com/cars";

    const gridRef = useRef();

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch(CAR_URL)
            .then(res => res.json())
            .then(resData => setCars(resData._embedded.cars))
            .catch(err => console.error(err));
    }


    const deleteCar = (params) => {
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.self.href, {
                method: "DELETE",
            })
                .then(res => {
                    if (res.ok) {
                        setOpen(true);
                        fetchData();
                    }
                })
        }
    }

    const addCar = (car) => {
        fetch(CAR_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const editCar = (car, link) => {
        fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }


    const columns = [
        { headerName: "Brand", field: "brand", sortable: true, filter: true },
        { headerName: "Model", field: "model", sortable: true, filter: true },
        { headerName: "Color", field: "color", sortable: true, filter: true },
        { headerName: "Fuel", field: "fuel", sortable: true, filter: true },
        { headerName: "Year", field: "year", sortable: true, filter: true },
        { headerName: "Price", field: "price", sortable: true, filter: true },
        {
            cellRenderer: params =>
                <EditCar car={params.data} editCar={editCar} />
        },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCar(params)}>
                    Delete
                </Button>, width: 120
        }
    ]

    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{ height: "700px", width: "100%", margin: "auto" }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    animateRows={true}
                    columnDefs={columns}
                    rowData={cars}
                    pagination={true}
                    paginationPageSize={20}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={() => setOpen(false)}
                    message={msg} />
            </div>
        </>
    )

}

export default CarList