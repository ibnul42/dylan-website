import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import {
  allEvent,
  deleteEvent,
  reset,
} from "../../../features/event/eventSlice"

const AdminEvent = () => {
  const dispatch = useDispatch()

  const { event, isSuccess, isError, isDeleted, isAllEvents } = useSelector(
    (state) => state.event
  )

  useEffect(() => {
    if (isDeleted) {
      toast.success("Event Deleted")
      dispatch(reset())
    }
    dispatch(allEvent())
  }, [dispatch, isDeleted])

  const onEventCreate = () => {
    dispatch(reset())
  }

  const onEventDelete = (id) => {
    dispatch(deleteEvent(id))
  }
  const onEditEvent = (id) => {
    dispatch(reset())
  }

  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h1 className="px-3 py-2 text-center text-xl font-semibold">Event</h1>
        <Link
          to="/admin/create-event"
          className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize m-2"
          onClick={onEventCreate}
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
          <tr className="bg-primary text-white grid grid-cols-4">
            <th className="px-4 py-2 col-span-1 border-r border-white">
              Event Date
            </th>
            <th className="px-4 py-2 col-span-2 border-r border-white">
              Title
            </th>
            <th className="px-4 py-2 col-span-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {event && event.events && event.events.length > 0 ? (
            event.events.map((item, index) => (
              <tr key={index} className="even:bg-rose-200 grid grid-cols-4">
                <td className="px-4 py-2 col-span-1 border-r border-primary flex items-center justify-center">
                  <p>{item.date}</p>
                </td>
                <td className="px-4 py-2 col-span-2 border-r border-primary flex items-center justify-center">
                  {item.title}
                </td>
                <td className="px-4 py-2 col-span-1 flex justify-center gap-3">
                  <Link
                    to={`/admin/edit-event/${item._id}`}
                    className="px-6 py-1 rounded-full border border-primary hover:bg-primary text-primary hover:text-white font-medium cursor-pointer"
                    onClick={() => onEditEvent(item._id)}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onEventDelete(item._id)}
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

export default AdminEvent
