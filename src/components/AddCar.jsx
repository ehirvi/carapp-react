import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useState } from "react"

const AddCar = (props) => {
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        year: "",
        price: ""
    });
    const [snackbarMsg, setSnackbarMsg] = useState("Car succesfully added");
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const handleClickOpen = () => {
        setDialogueOpen(true);
    }

    const handleClose = () => {
        setDialogueOpen(false);
    }

    const handleInputChange = (e) => {
        setCar({...car, [e.target.name]: e.target.value})
    }

    return (
        <>
            <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add a car
            </Button>
            <Dialog open={dialogueOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Car</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" name="brand" value={car.brand} onChange={e => handleInputChange(e)} label="Brand" fullWidth />
                    <TextField margin="dense" name="model" value={car.model} onChange={e => handleInputChange(e)} label="Model" fullWidth />
                    <TextField margin="dense" name="color" value={car.color} onChange={e => handleInputChange(e)} label="Color" fullWidth />
                    <TextField margin="dense" name="fuel" value={car.fuel} onChange={e => handleInputChange(e)} label="Fuel" fullWidth />
                    <TextField margin="dense" name="year" value={car.year} onChange={e => handleInputChange(e)} label="Year" fullWidth />
                    <TextField margin="dense" name="price" value={car.price} onChange={e => handleInputChange(e)} label="Price" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {props.addCar(car), setDialogueOpen(false), setSnackbarOpen(true)}} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} message={snackbarMsg} />
        </>
    )


}

export default AddCar