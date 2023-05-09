import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  deletePrayer,
  getPrayers,
  reset,
} from "../../../features/client/clientSlice"

import { toast } from "react-toastify"

const Prayer = () => {
  const dispatch = useDispatch()

  const { prayers, isAllPrayers, isPrayerDeleted } = useSelector(
    (state) => state.client
  )

  useEffect(() => {
    if (isAllPrayers) {
      dispatch(reset())
    } else if (isPrayerDeleted) {
      toast.success("Selected data deleted")
      dispatch(reset())
    } else if (!prayers) {
      dispatch(getPrayers())
    }
  }, [dispatch, isAllPrayers, prayers])

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deletePrayer(id))
    }
  }

  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h1 className="px-3 py-2 text-center text-xl font-semibold">Prayers</h1>
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
              Prayer
            </th>
            <th className="px-4 py-2 col-span-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {prayers ? (
            prayers.map((item, index) => (
              <tr key={index} className="even:bg-rose-200 grid grid-cols-12">
                <td className="px-4 py-2 col-span-1 border-r border-primary flex items-center justify-center">
                  <p>{index + 1}</p>
                </td>
                <td className="px-4 py-2 col-span-2 border-r border-primary flex items-center justify-center">
                  <p>
                    {item.firstName} {item.lastName}
                  </p>
                </td>
                <td className="px-4 py-2 col-span-3 border-r border-primary flex items-center justify-center">
                  {item.email}
                </td>
                <td className="px-4 py-2 col-span-4 border-r border-primary flex items-center justify-center">
                  {item.message}
                </td>
                <td className="px-4 py-2 col-span-2 flex justify-center items-center gap-3">
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

export default Prayer
