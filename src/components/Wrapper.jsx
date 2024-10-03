import { useState } from "react"

const Wrapper = ({ children }) => {
  const [welcome, showWelcome] = useState(true)

  return (
    <div id="wrapper">
      {welcome ? (
        <div id="welcome">
          <p>
            It's 1993 and you just finished installing a weird floppy disk on
            your parents' i386. You're sure they won't mind. The label reads
            "End Quest", and promises you "minutes of point and click fun!"
          </p>
          <br />
          <hr />
          <br />
          <button onClick={() => showWelcome(false)}>[OK, whatever]</button>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default Wrapper
