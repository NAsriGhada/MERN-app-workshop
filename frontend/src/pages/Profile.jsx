import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPosts, getPosts } from "../redux/postSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createPosts({ title, description }));
    setTitle("");
    setDescription("");
  };
  useEffect(() => {
    dispatch(getPosts());
  }, [user, dispatch]);
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Title</label>
          <input
            type="title"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Description</label>
          <input
            type="description"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Add Post
          </button>
        </div>
      </form>
      <div style={{display: "flex"}}>
      {posts.map((el, key) => {
        return (
          <div className="row" style={{ width: "18rem" }} key={key}>
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{el.title}</h5>
                  <p className="card-text">{el.description}</p>
                  <Link to={""} className="btn btn-primary">
                    {" "}
                    Button
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
        </div>
    </div>
  );
};

export default Profile;
