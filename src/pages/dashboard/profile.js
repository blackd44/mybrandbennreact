import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../components/context/userContext";
import Popup from "../../components/popup";

const default_profile = process.env.REACT_APP_DEFAULT_PROFILE;
const server = process.env.REACT_APP_SERVER_URL;

const Profile = () => {
  const { user, token, setUser } = useContext(UserContext);

  const updateRef = useRef();

  const updateForm = useCallback((e) => {
    e.preventDefault();
    console.log("update");
  }, []);

  // update form
  useEffect(() => {
    const form = updateRef.current;
    if (!form || form === null) form.addEventListener("submit", updateForm);

    return () => {
      if (!form || form === null)
        form.removeEventListener("submit", updateForm);
    };
  }, [updateRef, updateForm]);

  //update image
  const imageRef = useRef();
  const imageInputRef = useRef();
  const [popupVisible, setPopupVisible] = useState(false);

  const visiblity = useCallback(
    (e) => {
      e.preventDefault();
      setPopupVisible(false);
    },
    [setPopupVisible]
  );

  const change = useCallback(
    (e) => {
      e.preventDefault();
      const image = imageRef.current;
      const input = imageInputRef.current;

      let img = document.createElement("img");
      img.onload = () => {
        image.src = input.value;
      };
      img.src = input.value;
    },
    [imageRef, imageInputRef]
  );

  useEffect(() => {
    const image = imageRef.current;
    const input = imageInputRef.current;

    if (image && image !== null && input && input !== null) {
      input.addEventListener("input", change);
    }

    return () => {
      if (image && image !== null && input && input !== null) {
        input.removeEventListener("input", change);
      }
    };
  }, [imageRef, imageInputRef, change]);

  const updateImage = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .patch(
          server + "/api/users/user",
          {
            profile: imageRef.current.src,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )

        .then((res) => {
          setUser(prev => res.data.user)
          setPopupVisible(false)
        });
    },
    [token, setUser]
  );
  return (
    <>
      <div className="account">
        <div className="top">
          <div className="profile">
            <img
              name="profile"
              className="profile-image"
              alt="username"
              src={user?.profile || default_profile}
            />
            <div
              className="change"
              onClick={() => {
                setPopupVisible(true);
              }}
            >
              <svg
                fill="inherit"
                width="64px"
                height="64px"
                viewBox="-4.8 -4.8 33.60 33.60"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                strokeWidth="0.00024000000000000003"
                transform="rotate(0)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.096"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    d="M19,6 L19,4 L21,4 L21,6 L23,6 L23,8 L21,8 L21,10 L19,10 L19,8 L17,8 L17,6 L19,6 Z M6.93701956,5.8453758 C7.00786802,5.74688188 7.08655595,5.62630624 7.18689462,5.46372136 C7.24312129,5.37261385 7.44826978,5.03326386 7.48180256,4.97841198 C8.31078556,3.62238733 8.91339479,3 10,3 L15,3 L15,5 L10,5 C9.91327186,5 9.64050202,5.28172235 9.18819752,6.02158802 C9.15916322,6.06908141 8.95096113,6.41348258 8.88887147,6.51409025 C8.76591846,6.71331853 8.66374696,6.86987867 8.56061313,7.0132559 C8.1123689,7.63640757 7.66434207,8 7.0000003,8 L4,8 C3.44771525,8 3,8.44771525 3,9 L3,18 C3,18.5522847 3.44771525,19 4,19 L20,19 C20.5522847,19 21,18.5522847 21,18 L21,12 L23,12 L23,18 C23,19.6568542 21.6568542,21 20,21 L4,21 C2.34314575,21 1,19.6568542 1,18 L1,9 C1,7.34314575 2.34314575,6 4,6 L6.81619668,6 C6.84948949,5.96193949 6.89029794,5.91032846 6.93701956,5.8453758 Z M12,18 C9.23857625,18 7,15.7614237 7,13 C7,10.2385763 9.23857625,8 12,8 C14.7614237,8 17,10.2385763 17,13 C17,15.7614237 14.7614237,18 12,18 Z M12,16 C13.6568542,16 15,14.6568542 15,13 C15,11.3431458 13.6568542,10 12,10 C10.3431458,10 9,11.3431458 9,13 C9,14.6568542 10.3431458,16 12,16 Z"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          <aside>
            <form method="post" name="updateProfile" ref={updateRef}>
              <input
                type="text"
                name="name"
                defaultValue={user?.username || "username"}
                placeholder="Change name"
              />
              <p name="email">{user?.email || "name@email.com"}</p>
              <label>
                <b>
                  <i>Gender</i>:{" "}
                </b>
                <select name="gender" defaultValue={user?.gender}>
                  <option defaultValue="male">Male</option>
                  <option defaultValue="female">Female</option>
                  <option defaultValue="none">don't mind</option>
                </select>
                <button type="submit">update</button>
              </label>
            </form>
            <div>
              <span>10 blogs</span>
            </div>
          </aside>
        </div>
      </div>
      {popupVisible && (
        <Popup setVisibility={setPopupVisible}>
          <form onSubmit={updateImage}>
            <img
              ref={imageRef}
              alt={user?.username}
              src={user?.profile || default_profile}
            />
            <input
              type="text"
              name="profile"
              placeholder="Profile-url"
              ref={imageInputRef}
              onInput={change}
            />
            <div>
              <button type="reset" onClick={visiblity}>
                Cancel
              </button>
              <button type="submit">Change</button>
            </div>
          </form>
        </Popup>
      )}
    </>
  );
};

export default Profile;
