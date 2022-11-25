import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import SelectField from "../../common/form/selectField";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [usersList, setUsersList] = useState();
    const [commentsList, setCommentsList] = useState();
    const [commentFor, setCommentFor] = useState("");
    const [comment, setComment] = useState("");
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.users.fetchAll().then((data) => setUsersList(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setCommentsList(data));
    }, []);

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    const handleDelete = (e) => {
        api.comments.remove(e);
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setCommentsList(data));
        console.log("comment to delete", e);
        console.log(commentsList);
    };
    const handleCommentForChange = (event) => {
        console.log("write comment for", event.target.value);
        console.log("write comment for", event);
        setCommentFor(event.target.value);
    };

    const handleCommentChange = (event) => {
        console.log("comment", event.target.value);
        setComment(event.target.value);
    };

    // doing: continue here
    const handleCommentSubmit = () => {
        // const _id = "comment_id";
        const pageId = user._id;
        const userId = commentFor;
        const content = comment;
        console.log("userId", userId);
        const data = { userId, pageId, content };
        console.log("data", data);
        api.comments.add(data).then((d) => console.log("comment posted", d));
        api.comments
            .fetchCommentsForUser(user._id)
            .then((data) => setCommentsList(data));
        setComment("");
        setCommentFor("");
    };

    console.log(1);

    if (user && usersList) {
        return (
            <div className="container mt-3">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <button
                                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                                    onClick={handleClick}
                                >
                                    <i className="bi bi-gear"></i>
                                </button>
                                <div
                                    className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                                >
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="150"
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">
                                            {user.profession.name}
                                        </p>
                                        <div className="text-muted">
                                            <i
                                                className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                                role="button"
                                            ></i>
                                            <i
                                                className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                                role="button"
                                            ></i>
                                            <span className="ms-2">
                                                {user.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div
                                className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                            >
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    <Qualities qualities={user.qualities} />
                                </p>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div
                                className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                            >
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>

                                <h1 className="display-1">
                                    {user.completedMeetings}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card mb-2">
                            <div className="card-body">
                                <div>
                                    <h2>New comment</h2>
                                    <div className="mb-4">
                                        <select
                                            className="form-select"
                                            name="userId"
                                            value={commentFor}
                                            onChange={handleCommentForChange}
                                        >
                                            <option
                                                disabled
                                                value=""
                                                defaultValue
                                            >
                                                Выберите пользователя
                                            </option>
                                            {usersList.map((user) => (
                                                <option
                                                    key={user._id}
                                                    value={user._id}
                                                >
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="exampleFormControlTextarea1"
                                            className="form-label"
                                        >
                                            Сообщение
                                        </label>
                                        <textarea
                                            className="form-control mb-3"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            value={comment}
                                            onChange={handleCommentChange}
                                        ></textarea>
                                        <button
                                            onClick={handleCommentSubmit}
                                            disabled={commentFor === ""}
                                            className="btn btn-primary w-100"
                                        >
                                            Опубликовать
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {commentsList.length > 0 ? (
                            <div className="card mb-3">
                                <div className="card-body">
                                    {console.log(commentsList)}
                                    <h2>Comments</h2>
                                    <hr />
                                    {commentsList.map((comment) => (
                                        <div
                                            key={comment._id}
                                            className="bg-light card-body mb-3"
                                        >
                                            <div className="row">
                                                <div className="col">
                                                    <div className="d-flex flex-start">
                                                        <img
                                                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                                                Math.random() +
                                                                1
                                                            )
                                                                .toString(36)
                                                                .substring(
                                                                    7
                                                                )}.svg`}
                                                            className="rounded-circle shadow-1-strong me-3"
                                                            alt="avatar"
                                                            width="65"
                                                        />
                                                        <div className="flex-grow-1 flex-shrink-1">
                                                            <div className="mb-4">
                                                                <div className=" d-flex justify-content-between align-items-center">
                                                                    {usersList.map(
                                                                        (
                                                                            user
                                                                        ) =>
                                                                            user._id ===
                                                                            comment.userId ? (
                                                                                <p
                                                                                    className="mb-1"
                                                                                    key={
                                                                                        comment.userId
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        user.name
                                                                                    }{" "}
                                                                                    (
                                                                                    <span className="small">
                                                                                        5
                                                                                        минут
                                                                                        назад
                                                                                    </span>

                                                                                    )
                                                                                </p>
                                                                            ) : null
                                                                    )}

                                                                    <button
                                                                        className="btn btn-sm text-primary d-flex align-items-center"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                comment._id
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="bi bi-x-lg"></i>
                                                                    </button>
                                                                </div>
                                                                <p className="small mb-0">
                                                                    {
                                                                        comment.content
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
