import React from "react"

const Footer = () => {
  return (
    <div className="bg-primary text-white py-3">
      <div className="max-w-7xl mx-auto px-2 flex flex-col md:flex-row justify-between">
        <p className="md:py-2">With Love'22</p>
        <div className="flex justify-between md:justify-end gap-3 text-gray-400 py-2">
          <a href="mailto:dylanluper@tutanota.com" className="underline underline-offset-4 hover:decoration-dotted">Email</a>
          <a href="https://www.flickr.com/photos/desecrated/" target="_blank" className="underline underline-offset-4 hover:decoration-dotted">Flickr</a>
          <a href="https://uploads-ssl.webflow.com/62a28391ee8e66812644ce22/62d629095f63b76916b64e5b_Dylan_Ray%20Luper_Resume_18-07-2022-23-44-22.pdf" className="underline underline-offset-4 hover:decoration-dotted">Resume</a>
        </div>
      </div>
    </div>
  )
}

export default Footer