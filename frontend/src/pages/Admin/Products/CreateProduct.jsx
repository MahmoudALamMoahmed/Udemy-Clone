import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function CreateProduct() {
    const [validationErrors, setValidationErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState(""); // State for alerts
    const [alertType, setAlertType] = useState(""); // State for alert type (success, danger)

    const navigate = useNavigate();

    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const product = Object.fromEntries(formData.entries());

        if (!product.title || !product.category || !product.price || !product.image.name) {
            setAlertMessage("Please fill all fields");
            setAlertType("danger");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/products`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                // Product created correctly
                setAlertMessage("Product created successfully");
                setAlertType("success");
                setTimeout(() => navigate("/Admin/Products"), 500); // Redirect after 0.5 seconds
            } else if (response.status === 400) {
                setValidationErrors(data);
                setAlertMessage("Validation errors occurred");
                setAlertType("danger");
            } else {
                setAlertMessage("Unable to create the product!");
                setAlertType("danger");
            }
        } catch (error) {
            setAlertMessage("Unable to connect to the server!");
            setAlertType("danger");
        }
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Create Product</h2>

                    {alertMessage && (
                        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                            {alertMessage}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}

                    <form onSubmit={HandleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Title</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="title" />
                                <span className="text-danger">{validationErrors.title}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="category">
                                    <option value='Other'>Other</option>
                                    <option value='FrontEnd'>FrontEnd</option>
                                    <option value='BackEnd'>BackEnd</option>
                                    <option value='FullStack'>FullStack</option>
                                    <option value='Programming language'>Programming language</option>
                                    <option value='Design'>Design</option>
                                    <option value='Marketing'>Marketing</option>
                                    <option value='languages'>languages</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="price" type="number" step="0.01" min="1" />
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="file" name="image" />
                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/Admin/Products' role="button">Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
