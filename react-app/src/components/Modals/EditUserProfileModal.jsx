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
            profile_img: profileImg
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
        <div onClick={() => setIsOpen(false)} />
			<div>
				<div>
					<div>
						<h5>Edit User Profile</h5>
					</div>
					<button
						onClick={() => setIsOpen(false)}
					>
					</button>
					<div>
						<form onSubmit={handleSubmit}>
							<div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
							<div>
								<label htmlFor="username">Username:</label>
								<input
									type="text"
									name="username"
									value={username}
									placeholder={user.username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
                            <div>
								<label htmlFor="email">Email:</label>
								<input
									type="text"
									name="email"
									value={email}
									placeholder={user.email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
                            <div>
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

					<div>
						<div>
							<button
								onClick={handleSubmit}
							>
								Submit
							</button>
							<button
								onClick={() => setIsOpen(false)}
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