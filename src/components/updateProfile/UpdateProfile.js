import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateMyProfile } from "../../redux/slices/appConfigSlice";
function UpdateProfile() {
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [userImg, setUserImg] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        setName(myProfile?.name || "");
        setBio(myProfile?.setBio || "");
        setUserImg(myProfile?.avatar?.url || "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png");
    }, [myProfile]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setUserImg(fileReader.result);
            }
        };
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(
            updateMyProfile({
                name,
                bio,
                userImg,
            })
        );
    }

    return (
        <div className="update-profile">
            <div className="container">
                <div className="left-part">
                    <div className="input-user-img">
                        <label htmlFor="userImg" className="label-img">
                            <img src={userImg} alt="" />
                        </label>
                        <input
                            className="input-img"
                            id="userImg"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="right-part">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={name}
                            type="text"
                            placeholder="Your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            value={bio}
                            type="text"
                            placeholder="Your Bio"
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <input
                            type="submit"
                            className="btn-primary"
                            value="Submit"
                            onClick={handleSubmit}
                        />
                    </form>
                    <button className="delete-account btn-primary">
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;
