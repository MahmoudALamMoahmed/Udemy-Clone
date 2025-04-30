import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function EditProduct() {
    const params = useParams();
    const [initialData, setInitialData] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(""); // 'success' or 'danger'

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/products/` + params.id)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then(data => setInitialData(data))
            .catch(() => {
                setAlertMessage("Unable to read product details");
                setAlertType("danger");
            });
    }, [params.id]);

    async function HandleSubmit(event) {
       
            event.preventDefault();
        
            const formData = new FormData(event.target);
        
            const title = formData.get("title");
            const category = formData.get("category");
            const price = formData.get("price");
            const image = formData.get("image"); // الصورة الجديدة
        
            if (!title || !category || !price) {
                setAlertMessage("Please fill all fields");
                setAlertType("danger");
                return;
            }
        
            // 👇 لو الصورة مش متحددة، بنمسحها من الفورم داتا
            if (!image || image.size === 0) {
                formData.delete("image");
            }
        
            try {
                const response = await fetch(`${BASE_URL}/products/` + params.id, {
                    method: "PATCH",
                    body: formData
                });
        
                const data = await response.json();
        
                if (response.ok) {
                    setAlertMessage("Product updated successfully");
                    setAlertType("success");
                    setTimeout(() => navigate("/Admin/Products"), 1000);
                } else if (response.status === 400) {
                    setValidationErrors(data);
                    setAlertMessage("Validation errors occurred");
                    setAlertType("danger");
                } else {
                    setAlertMessage("Unable to update the product!");
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
                    <h2 className="text-center mb-5">Edit Product</h2>

                    {alertMessage && (
                        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                            {alertMessage}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}

                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">ID</label>
                        <div className="col-sm-8">
                            <input readOnly className="form-control-plaintext" defaultValue={params.id} />
                        </div>
                    </div>

                    {initialData && (
                        <form onSubmit={HandleSubmit}>
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Title</label>
                                <div className="col-sm-8">
                                    <input className="form-control" name="title" defaultValue={initialData.title} />
                                    <span className="text-danger">{validationErrors.title}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Category</label>
                                <div className="col-sm-8">
                                    <select className="form-select" name="category" defaultValue={initialData.category}>
                                        <option value='Other'>Other</option>
                                        <option value='FrontEnd'>FrontEnd</option>
                                        <option value='BackEnd'>BackEnd</option>
                                        <option value='FullStack'>FullStack</option>
                                        <option value='Programming language'>Programming language</option>
                                        <option value='Design'>Design</option>
                                        <option value='Marketing'>Marketing</option>
                                        <option value='languages'>Languages</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Price</label>
                                <div className="col-sm-8">
                                    <input className="form-control" name="price" type="number" step="0.01" min="1" defaultValue={initialData.price} />
                                    <span className="text-danger">{validationErrors.price}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="offset-sm-4 col-sm-8">
                                    <img src={ initialData.url} width={150} alt="Product" />
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
                    )}
                </div>
            </div>
        </div>
    );
}
