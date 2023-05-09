import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  deleteActivity,
  deleteTimeline,
  getAllActivities,
  getAllTimeline,
  reset,
} from "../../../features/home/homeSlice"

const AdminHome = () => {
  const dispatch = useDispatch()

  const {
    isAllTimelines,
    timelines,
    isAllActivities,
    activities,
    isTimelineDeleted,
    isActivityDeleted,
  } = useSelector((state) => state.home)

  useEffect(() => {
    if (isTimelineDeleted) {
      dispatch(reset())
      dispatch(getAllTimeline())
    }
    if (isActivityDeleted) {
      dispatch(reset())
      dispatch(getAllActivities())
    }
    dispatch(getAllTimeline())
    dispatch(getAllActivities())
  }, [dispatch, isTimelineDeleted, isActivityDeleted])

  const onEventCreate = () => {
    dispatch(reset())
  }

  const onEventDelete = (id) => {
    // dispatch(deleteEvent(id))
  }

  const onTimelineDelete = (id) => {
    console.log(id)
    if (confirm("Are you sure you want to delete?")) {
      dispatch(deleteTimeline(id))
    }
  }

  const onActivityDelete = (id) => {
    console.log(id)
    if (confirm("Are you sure you want to delete?")) {
      dispatch(deleteActivity(id))
    }
  }
  const onEditEvent = (id) => {
    // dispatch(reset())
  }

  return (
    <div className="h-full">
      <div>
        <div className="flex justify-between">
          <h1 className="px-3 py-2 text-center text-xl font-semibold">
            Activities
          </h1>
          <Link
            to="/admin/home/create-activity"
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
                Titile
              </th>
              <th className="px-4 py-2 col-span-2 border-r border-white">
                Desctiption
              </th>
              <th className="px-4 py-2 col-span-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {activities && activities.length > 0 ? (
              activities.map((item, index) => (
                <tr key={index} className="even:bg-rose-200 grid grid-cols-4">
                  <td className="px-4 py-2 col-span-1 border-r border-primary flex items-center justify-center">
                    <p>{item.title}</p>
                  </td>
                  <td className="px-4 py-2 col-span-2 border-r border-primary flex items-center justify-center max-h-44 overflow-y-auto">
                    {item.description}
                  </td>
                  <td className="px-4 py-2 col-span-1 flex justify-center items-center gap-3">
                    {/* <Link
                      to={`/admin/home/${item._id}`}
                      className="px-6 py-1 rounded-full border border-primary hover:bg-primary text-primary hover:text-white font-medium cursor-pointer h-max"
                      onClick={() => onEditEvent(item._id)}
                    >
                      Edit
                    </Link> */}
                    <button
                      onClick={() => onActivityDelete(item._id)}
                      className="px-4 py-1 rounded-full border border-primary hover:bg-primary text-primary hover:text-white font-medium cursor-pointer h-max"
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
      <div>
        <div className="flex justify-between">
          <h1 className="px-3 py-2 text-center text-xl font-semibold">
            Timelines
          </h1>
          <Link
            to="/admin/home/create-timeline"
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
                Title
              </th>
              <th className="px-4 py-2 col-span-2 border-r border-white">
                Description
              </th>
              <th className="px-4 py-2 col-span-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {timelines && timelines.length > 0 ? (
              timelines.map((item, index) => (
                <tr key={index} className="even:bg-rose-200 grid grid-cols-4">
                  <td className="px-4 py-2 col-span-1 border-r border-primary flex items-center justify-center">
                    <p>{item.title}</p>
                  </td>
                  <td className="px-4 py-2 col-span-2 border-r border-primary flex items-center justify-center max-h-44 overflow-y-auto">
                    {item.description}
                  </td>
                  <td className="px-4 py-2 col-span-1 flex justify-center items-center gap-3">
                    {/* <Link
                      to={`/admin/home/${item._id}`}
                      className="px-6 py-1 rounded-full border border-primary hover:bg-primary text-primary hover:text-white font-medium cursor-pointer h-max"
                      onClick={() => onEditEvent(item._id)}
                    >
                      Edit
                    </Link> */}
                    <button
                      onClick={() => onTimelineDelete(item._id)}
                      className="px-4 py-1 rounded-full border border-primary hover:bg-primary text-primary hover:text-white font-medium cursor-pointer h-max"
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
    </div>
  )
}

export default AdminHome
