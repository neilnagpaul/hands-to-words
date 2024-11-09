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
});

document.querySelector("form").onsubmit = async function (e) {
    e.preventDefault()
    let data = new FormData(this),
        file = data.get("file"),
        src = URL.createObjectURL(file),
        img = Object.assign(new Image(), { src }),
        canvas = document.createElement("canvas")

    await new Promise(_ => img.onload = _)
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext("2d").drawImage(img, 0, 0)
    hands.send({ image: canvas })

    let results = await new Promise(_ => hands.onResults(_)),
        input = Object.assign(document.createElement("input"), {
            type: "hidden",
            name: "json",
            value: JSON.stringify({
                results: {
                    ...results,
                    image: undefined
                },
                chereme: data.get("chereme")
            })
        })
    this.append(input)
    this.onsubmit = null
    this.submit()
}
