import { useState } from "react"
import useSound from "use-sound"
import soundBoop from "../sounds/boop.wav"

const Wrapper = ({ children }) => {
  const [welcome, setShowWelcome] = useState(true)
  const [boop] = useSound(soundBoop)

  const acknowledge = () => {
    boop()
    setShowWelcome(false)
  }

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
          <button onClick={acknowledge}>[OK, whatever]</button>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default Wrapper
