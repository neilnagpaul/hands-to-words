import "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
import "https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js"
import "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
import "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"

const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
})
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
})

await new Promise(_ => input.onchange = _)
let src = URL.createObjectURL(...input.files), results
hands.send({ image: Object.assign(new Image, { src }) })
results = await new Promise(_ => hands.onResults(_))
results.image = prompt("Chereme")
await fetch(`/api?${new URLSearchParams({ json: JSON.stringify(results) })}`)
