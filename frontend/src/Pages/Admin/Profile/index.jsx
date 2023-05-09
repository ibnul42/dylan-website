import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { reset, update } from "../../../features/auth/authSlice"

const Profile = () => {
  const [editType, setEditType] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  const [inputValue, setInputValue] = useState({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    password: "",
    newPassword: "",
  })

  const { name, password, newPassword } = inputValue

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (isError) {
      dispatch(reset())
    }
    if (isSuccess) {
      setEditType(false)
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch, reset, navigate])

  const editProfile = (e) => {
    dispatch(update(inputValue))
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="h-full">
      <h1 className="px-3 py-2 text-center text-xl font-semibold">Profile</h1>
      <div className="h-full flex flex-col justify-center items-center">
        <div className="w-80 py-5 px-3 shadow">
          <div className="flex gap-1 flex-col">
            <label className="px-2 min-w-fit">Name: </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={editType ? name : user?.name}
              disabled={editType === true ? false : true}
              onChange={onChange}
            />
          </div>
          <div className="flex gap-1 flex-col">
            <label className="px-2 min-w-fit">User: </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={user?.email}
              //   disabled={editType === true ? false : true}
              disabled
              onChange={onChange}
            />
          </div>
          {editType && (
            <>
              <div className="flex gap-1 flex-col">
                <label className="px-2 min-w-fit">Old Password: </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="flex gap-1 flex-col">
                <label className="px-2 min-w-fit">New Password: </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="newPassword"
                  value={newPassword}
                  onChange={onChange}
                />
              </div>
            </>
          )}
          <div className="px-2 flex gap-2 justify-between">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize my-2"
              onClick={() => setEditType(!editType)}
            >
              {editType ? "Cancel" : "Edit profile"}
            </button>
            {editType && (
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize my-2"
                onClick={editProfile}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
