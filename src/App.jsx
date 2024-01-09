import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);

  const [numberAllowed, setNumberAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  //useRef hook variable for copy logic
  const passwordRef = useRef(null);

  //Generating the password -> Logic
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_-+=[]{}~`";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  }, [length, numberAllowed, charAllowed, setPassword]);

  //copy to clipboard logic
  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className=" outline outline-black w-full max-w-lg mx-auto shadow-md rounded-lg px-10 my-20 py-10 text-orange-500 bg-gray-900">
        <h1 className=" text-3xl font-serif italic text-white text-center my-3">
          "Password Generator"
        </h1>
        <div className=" flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className=" outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipBoard}
            className=" transition-all ease-in-out hover:text-black outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className=" flex text-sm gap-x-2">
          <div className=" flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
          </div>
          <label>Numbers</label>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
          </div>
          <label>Characters</label>
        </div>
      </div>
      <div className=" text-center font-extralight">
        <h5 className=" text-[10px] italic">@Divyam</h5>
      </div>
      <div className=" flex text-xs font-mono gap-5 justify-center my-5">
        <a
          className=" outline p-1 rounded"
          href="https://github.com/Divyamsirswal"
        >
          GitHub
        </a>
        <a
          className=" outline p-1 rounded"
          href="https://codeforces.com/profile/divyam_sirswal"
        >
          Codeforces
        </a>
      </div>
    </>
  );
}

export default App;
