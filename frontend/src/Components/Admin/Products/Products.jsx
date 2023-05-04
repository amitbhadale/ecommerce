import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../Actions/CategoryActions";
import {
  addProduct,
  getProductDetails,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../../Actions/ProductActions";
import Alert from "../Alert/Alert";
import Loader from "../Loader/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    async function loadInit() {
      await dispatch(getProducts());
      await dispatch(getCategories());
    }
    loadInit();
  }, []);

  const { categories, loading, products, product } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product) {
      const { name, description, price, quantity, _id, category } = product;
      setName(name);
      setDesc(description);
      setQuantity(quantity);
      setPrice(price);
      setCategory(category._id);
      setEditId(_id);
    }
  }, [product]);

  const updatePreview = (e) => {
    const files = e.target.files;
    const iarr = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        iarr.push(readerEvent.target.result);
        setImages(iarr);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  // useEffect(() => {
  //   console.log("images", images);
  // }, [images]);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const obj = {
      name,
      description: desc,
      quantity,
      category,
      price,
      images,
    };
    if (editId) {
      await dispatch(updateProduct(editId, obj));
    } else {
      await dispatch(addProduct(obj));
    }
    setModalOpen(false);
    setName("");
    setDesc("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setImages([]);
    inputRef.current.value = null;
    await dispatch(getProducts());
  };

  const modalToggle = (val) => {
    setModalOpen(val);
    if (val === false) {
      setName("");
      setDesc("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setEditId("");
      setImages([]);
      inputRef.current.value = null;
    }
  };

  const editProduct = async (id) => {
    setModalOpen(true);
    await dispatch(getProductDetails(id));
  };
  const deleteProductHandler = async (id) => {
    if (window.confirm("Do you want to delete the record?") === true) {
      await dispatch(deleteProduct(id));
      await dispatch(getProducts());
    }
  };

  return (
    <div className="container-main">
      <div className="list-section">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="table-title">
              <h4>Products</h4>
              <button onClick={() => modalToggle(true)}>Add Product</button>
            </div>
            <table className="tabl">
              <thead>
                <tr>
                  <th>sr number</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.category.name}</td>
                        <td
                          className="link"
                          onClick={() => editProduct(item._id)}
                        >
                          Edit
                        </td>
                        <td
                          onClick={() => deleteProductHandler(item._id)}
                          className="link"
                        >
                          Delete
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No records</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
      <div className={modalOpen ? "modal-box show" : "modal-box hide"}>
        <div className="content">
          <span className="closebtn" onClick={() => modalToggle(false)}>
            Close
          </span>
          <div className="add-product-form">
            <form className="form-container" onSubmit={submitFormHandler}>
              <div className="form-row">
                <div className="form-elmnt">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Name"
                    value={name}
                    disabled={loading}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-elmnt">
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Price"
                    disabled={loading}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-elmnt">
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Quantity"
                    disabled={loading}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="form-elmnt">
                  <select
                    disabled={loading}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories && categories.length > 0
                      ? categories.map((item, i) => {
                          return (
                            <option key={i} value={item._id}>
                              {item.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-elmnt">
                  <textarea
                    rows="3"
                    disabled={loading}
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="form-row">
                <input
                  type="file"
                  ref={inputRef}
                  multiple
                  accept="image/*"
                  onChange={(e) => updatePreview(e)}
                />
              </div>
              <div className="form-row">
                <div className="image-preview">
                  {images && images.length > 0
                    ? images.map((image, i) => {
                        return <img key={i} src={image} alt="" />;
                      })
                    : null}
                </div>
              </div>
              <div className="form-row">
                <button type="submit" disabled={loading}>
                  Submit
                </button>
              </div>
              {loading ? <Loader /> : null}
            </form>
          </div>
        </div>
      </div>
      <Alert />
    </div>
  );
};

export default Products;
