import React from "react"

const Footer = () => {
  return (
    <div className="bg-primary text-white py-5">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex flex-col gap-3 overflow-hidden">
          <div className="flex gap-2 md:gap-5 text-[13px] md:text-base">
            <img src="/icons/fb.svg" className="h-7 w-7" alt="fb" />
            <a href="https://www.facebook.com/chabodseason" target="_blank">
              chabodseason
            </a>
          </div>
          <div className="flex gap-2 md:gap-5 text-[13px] md:text-base">
            <img src="/icons/mail.svg" className="h-6 w-6" alt="gm" />
            <a
              href="mailto:chabodprayerandgospelministry@gmail.com"
              className="break-words"
            >
              chabodprayerandgospelministry@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-white my-4"></div>
      <div className="">
        <p className="text-center">
          &copy; 2018-2022 Chabod Prayer and Gospel Ministry. All Rights
          Reserved. Website by{" "}
          <a
            className="underline"
            target="_blank"
            href="https://www.fiverr.com/creativebase8"
          >
            Creativebase8
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer