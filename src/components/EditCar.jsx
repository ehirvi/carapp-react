import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useState } from "react"

const EditCar = (props) => {
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        year: "",
        price: ""
    });
    const [snackbarMsg, setSnackbarMsg] = useState("Edit succesful");
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const handleClickOpen = () => {
        setCar({ brand: props.car.brand, model: props.car.model, color: props.car.color, fuel: props.car.fuel, year: props.car.year, price: props.car.price });
        setDialogueOpen(true);
    }

    const handleClose = () => {
        setDialogueOpen(false);
    }

    const handleInputChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const updateCar = () => {
        props.editCar(car, props.car._links.self.href)
    }

    return (
        <>
            <Button color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={dialogueOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" name="brand" value={car.brand} onChange={e => handleInputChange(e)} label="Brand" fullWidth />
                    <TextField margin="dense" name="model" value={car.model} onChange={e => handleInputChange(e)} label="Model" fullWidth />
                    <TextField margin="dense" name="color" value={car.color} onChange={e => handleInputChange(e)} label="Color" fullWidth />
                    <TextField margin="dense" name="fuel" value={car.fuel} onChange={e => handleInputChange(e)} label="Fuel" fullWidth />
                    <TextField margin="dense" name="year" value={car.year} onChange={e => handleInputChange(e)} label="Year" fullWidth />
                    <TextField margin="dense" name="price" value={car.price} onChange={e => handleInputChange(e)} label="Price" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { updateCar(), setDialogueOpen(false), setSnackbarOpen(true) }} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} message={snackbarMsg} />
        </>
    )


}

export default EditCar