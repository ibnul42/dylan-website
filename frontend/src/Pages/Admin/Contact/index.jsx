import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  deleteContact,
  getContacts,
  reset,
} from "../../../features/client/clientSlice"

const AdminContact = () => {
  const dispatch = useDispatch()

  const {
    isSuccess,
    isError,
    isDeleted,
    isAllEvents,
    contacts,
    isAllContacts,
    isDeletedContact,
  } = useSelector((state) => state.client)

  useEffect(() => {
    if (isAllContacts || isDeletedContact) {
      dispatch(reset())
    } else if (!contacts) {
      dispatch(getContacts())
    }
  }, [dispatch, isAllContacts, contacts, isDeletedContact])

  const onCreate = () => {
    dispatch(reset())
  }

  const onDelete = (id) => {
    dispatch(deleteContact(id))
  }
  const onEditEvent = (id) => {
    dispatch(reset())
  }

  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h1 className="px-3 py-2 text-center text-xl font-semibold">
          Contacts
        </h1>
        <Link
          to="/admin/create-contact"
          className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize m-2"
          onClick={onCreate}
        >
          Create
        </Link>
      </div>
      <table
        className="table-auto border my-5 border-primary mx-2 px-2"
        style={{
          width: "-webkit-fill-available",
        }}
      >
        <thead className="">
          <tr className="bg-primary text-white grid grid-cols-12">
            <th className="px-4 py-2 col-span-1 border-r border-white">Sl.</th>
            <th className="px-4 py-2 col-span-2 border-r border-white">Name</th>
            <th className="px-4 py-2 col-span-3 border-r border-white">
              Email
            </th>
            <th className="px-4 py-2 col-span-4 border-r border-white">
              Address
            </th>
            <th className="px-4 py-2 col-span-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts ? (
            contacts.map((item, index) => (
              <tr key={index} className="even:bg-rose-200 grid grid-cols-12">
                <td className="px-4 py-2 col-span-1 border-r border-primary flex items-center justify-center">
                  <p>{index + 1}</p>
                </td>
                <td className="px-4 py-2 col-span-2 border-r border-primary flex items-center justify-center">
                  <p>{item.name}</p>
                </td>
                <td className="px-4 py-2 col-span-3 border-r border-primary flex items-center justify-center">
                  {item.email}
                </td>
                <td className="px-4 py-2 col-span-4 border-r border-primary flex items-center justify-center">
                  {item.address}
                </td>
                <td className="px-4 py-2 col-span-2 flex justify-center gap-3">
                  {/* <Link
                    to={`/admin/edit-event/${item._id}`}
                    className="px-6 py-1 rounded-full border border-primary hover:bg-primary text-primary hover:text-white font-medium cursor-pointer"
                    onClick={() => onEditEvent(item._id)}
                  >
                    Edit
                  </Link> */}
                  <button
                    onClick={() => onDelete(item._id)}
                    className="px-4 py-1 rounded-full border border-primary hover:bg-primary text-primary hover:text-white font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="odd:bg-gray-100 grid grid-cols-3">
              <td className="px-4 py-2 col-span-3 border-r border-primary text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AdminContact
