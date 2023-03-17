import React, { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryDetails,
  updateCategory,
} from "../../../Actions/CategoryActions";
import "../CSS/form.scss";
import "../CSS/table.scss";
import "../CSS/common.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Alert from "../Alert/Alert";

const Category = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState("");
  useEffect(() => {
    async function fetchData() {
      await dispatch(getCategories());
    }
    fetchData();
  }, []);

  const { loading, categories, category } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (category) {
      setName(category.name);
      setEditId(category._id);
    }
  }, [category]);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (editId) {
      await dispatch(updateCategory(editId, { name }));
    } else {
      await dispatch(addCategory(name));
    }
    setName("");
    modalToggle(false);
    await dispatch(getCategories());
  };
  const modalToggle = (val) => {
    setModalOpen(val);

    //empty variables after modal close
    if (val === false) {
      setName("");
      setEditId("");
    }
  };
  const editCategory = async (id) => {
    setModalOpen(true);
    await dispatch(getCategoryDetails(id));
  };

  const deleteCategoryHandler = async (id) => {
    if (window.confirm("Do you want to delete the record?") === true) {
      await dispatch(deleteCategory(id));
      await dispatch(getCategories());
    }
  };
  return (
    <>
      <div className="container-main">
        <div className="list-section">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="table-title">
                <h4>
                  Product Categories {name}
                  {editId}
                </h4>
                <button onClick={() => modalToggle(true)}>Add Category</button>
              </div>
              <table className="tabl">
                <thead>
                  <tr>
                    <th>sr number</th>
                    <th>Categories</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.length > 0 ? (
                    categories.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.name}</td>
                          <td
                            className="link"
                            onClick={() => editCategory(item._id)}
                          >
                            Edit
                          </td>
                          <td
                            onClick={() => deleteCategoryHandler(item._id)}
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

            <div className="add-category-form">
              <form className="form-container" onSubmit={submitFormHandler}>
                <div className="form-row">
                  <div className="form-elmnt">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Category Name"
                      value={name}
                      disabled={loading}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <button type="submit" disabled={loading}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Alert />
      </div>
    </>
  );
};

export default Category;
