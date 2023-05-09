import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  getEvent,
  reset,
  updateEvent,
} from "../../../features/event/eventSlice"

const EditEvent = () => {
  const [title, setTitle] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [list, setList] = useState([{ title: "", time: "" }])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const { event, isSuccess, isError, isEdited, message, isSingleEvent } =
    useSelector((state) => state.event)

  useEffect(() => {
    if (isEdited) {
      dispatch(reset())
      navigate("/admin/event")
    }
    if (isSingleEvent) {
      const i = event.find((item) => item._id === params.id)
      setTitle(i.title)
      setSelectedDate(i.date)
      setList(i.event)
    }
    dispatch(getEvent(params.id))
  }, [isSingleEvent, dispatch, isEdited])

  const handleChange = (e, i) => {
    const { name, value } = e.target

    const tempList = [...list]

    const tempObj = tempList[i]

    tempObj[name] = value
    tempList[i] = tempObj
    setList(tempList)
  }

  const addRow = () => {
    const item = {
      title: "",
      time: "",
    }
    setList((prev) => [...prev, item])
  }

  const removeRow = (i) => {
    const tempList = [...list]
    tempList.splice(i, 1)
    setList(tempList)
  }

  const dateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  const handleSubmit = () => {
    dispatch(
      updateEvent({
        id: params.id,
        title,
        date: selectedDate,
        event: list,
      })
    )
  }
  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h1 className="px-3 py-2 text-center text-xl font-semibold">
          Create Event
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="flex flex-col gap-3 items-center">
            <input
              placeholder="Event Title"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-2 py-1 border border-primary rounded-md w-52 focus-visible:outline-primary"
            />
            <input
              className="text-primary font-semibold px-3 py-2 rounded-full border border-primary w-52 focus-visible:outline-primary"
              type="date"
              id="date"
              name="date"
              value={selectedDate}
              onChange={dateChange}
            />
          </div>
          {list.map((item, i) => (
            <div
              key={i}
              className="my-2 border border-primary overflow-hidden grid grid-cols-6 rounded-md"
            >
              <input
                placeholder={`Greetings`}
                name="title"
                value={item.title}
                onChange={(e) => handleChange(e, i)}
                className="col-span-3 px-2 py-1 border-r focus-visible:outline-primary"
              />

              <input
                placeholder={`10 AM`}
                name="time"
                value={item.time}
                onChange={(e) => handleChange(e, i)}
                className="col-span-2 px-2 py-1"
              />
              <button
                className="col-span-1 text-primary hover:text-white hover:bg-red-800 px-3 py-1 rounded-md border-l border-primary focus-visible:outline-primary"
                onClick={() => removeRow(i)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-center gap-3">
            <button
              className="inline-flex items-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize m-2"
              onClick={addRow}
            >
              Add
            </button>
            <button
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 capitalize m-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditEvent
