import { useDispatch } from "react-redux";
import { useState } from "react";
import { editUserThunk } from "../../store/users";

function EditUserProfileModal({setIsOpen, user, sendDataToUser}) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [profileImg, setProfileImg] = useState(user.profileImg);
    const [errors, setErrors] = useState([]);
	

    const handleSubmit = async (e) => {
		e.preventDefault();

		const editedUser = {
			id: user.id,
            username: username,
            email: email,
            profile_img: profileImg,
			wins: user.wins,
			losses: user.losses
		};
		let data = await dispatch(editUserThunk(editedUser));
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false);
			sendDataToUser(true)
		}
	};    

    return (
        <>
        <div className="darkBG" onClick={() => setIsOpen(false)} />
			<div className="centered">
				<div className="modal">
					<div className="modalHeader">
						<h5 className="modalHeading">Edit User Profile</h5>
					</div>
					<button
						onClick={() => setIsOpen(false)}
						className="closeBtn"
					>
						X
					</button>
					<div className="modalContent">
						<form onSubmit={handleSubmit}>
							<div className="errors-section">
								{errors.map((error, ind) => (
									<div className="error-body" key={ind}>
										<ul>
											<li className="error-item">
												{error}
											</li>
										</ul>
									</div>
								))}
							</div>
							<div className="input">
								<label htmlFor="username">Username:</label>
								<input
									type="text"
									name="username"
									value={username}
									placeholder={user.username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
                            <div className="input">
								<label htmlFor="email">Email:</label>
								<input
									type="text"
									name="email"
									value={email}
									placeholder={user.email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
                            <div className="input">
								<label htmlFor="profile image">Profile Image:</label>
								<input
									type="text"
									name="profile image"
									value={profileImg}
									placeholder={user.profileImg}
									onChange={(e) => setProfileImg(e.target.value)}
								/>
							</div>
						</form>
					</div>

					<div className="modalActions">
						<div className="actionsContainer">
							<button
								onClick={handleSubmit}
								className="submitBtn"
							>
								Submit
							</button>
							<button
								onClick={() => setIsOpen(false)}
								className="cancelBtn"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
        </>
    )
}

export default EditUserProfileModal;