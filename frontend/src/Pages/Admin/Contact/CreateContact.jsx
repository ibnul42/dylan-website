import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createContact, reset } from "../../../features/client/clientSlice"

const CreateContact = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    address: "",
  })

  const { name, email, address } = inputValue

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isCreatedContact, isError, message } = useSelector(
    (state) => state.client
  )

  useEffect(() => {
    if (isCreatedContact) {
      navigate("/admin/contact")
    }
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isCreatedContact, isError])

  const onChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(createContact(inputValue))
  }
  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h1 className="px-3 py-2 text-center text-xl font-semibold">
          Create Contact
        </h1>
        <Link
          to="/admin/contact"
          className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize m-2"
          //   onClick={onCreate}
        >
          Back
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="w-72">
          <form onSubmit={onSubmitHandler}>
            <div className="flex gap-1 flex-col">
              <label className="px-2 min-w-fit">Name: </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="flex gap-1 flex-col">
              <label className="px-2 min-w-fit">Email: </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="flex gap-1 flex-col">
              <label className="px-2 min-w-fit">Address: </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                name="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={onChange}
              />
            </div>
            <div className="flex justify-center gap-3">
              <button className="inline-flex items-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize m-2">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateContact
