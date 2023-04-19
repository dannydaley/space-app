import React, { useRef, useState } from "react";
import "./App.css";
import { Suspense } from "react";
import AnimationCanvas from "./components/AnimationCanvas";

// sets all shapes to wireframes if true

// suspense component allows a fallback while it loads
const App = () => {
    const [pointsKey, setPointsKey] = useState(1);
    const [wireframes, setWireframes] = useState(false);
    // const [waveSpeed, setWaveSpeed] = useState(5);

    const changeWireframes = () => {
        setWireframes(!wireframes);
        setPointsKey(pointsKey + 1);
    };

    const waveSpeed = useRef(40);
    const changeWaveSpeed = () => {
        console.log(waveSpeed);
        waveSpeed.current = document.getElementById("waveSpeedSlider").value;
        // setWaveSpeed(document.getElementById("waveSpeedSlider").value);
        // setPointsKey(pointsKey + 1);
    };
    return (
        <div className="anim" style={{ height: "100vh" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <AnimationCanvas
                    pointsKey={pointsKey}
                    waveSpeed={waveSpeed.current}
                    width={15}
                    height={15}
                    wireframes={wireframes}
                ></AnimationCanvas>
            </Suspense>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button
                    style={{ width: "100px", height: "50px" }}
                    onClick={() => changeWireframes()}
                >
                    Wireframes
                </button>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {" "}
                    <label for="waveSpeedSlider" style={{ color: "white" }}>
                        Wave Speed
                    </label>
                    <input
                        id="waveSpeedSlider"
                        type="range"
                        min="1"
                        max="80"
                        onChange={() => changeWaveSpeed()}
                    ></input>
                </div>
            </div>
        </div>
    );
};

export default App;
