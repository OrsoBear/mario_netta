let capture
let detector
let mario

async function setup() {
  	createCanvas(1440, 700)

	capture = createCapture(VIDEO)
	capture.size(640, 480)
	capture.hide()
	mariogambe = loadImage("src/parts/mariogambe.png")
	marioeyel = loadImage("src/parts/marioeyel.png")
	marioeyer = loadImage("src/parts/marioeyer.png")
	luigigambe = loadImage("src/parts/luigigambe.png")
	luigieyel = loadImage("src/parts/luigieyel.png")
	luigieyer = loadImage("src/parts/luigieyer.png")
	detector = await createDetector()
}
async function draw() {
	background(0)
	if (detector && capture.loadedmetadata) {
		const hands = await detector.estimateHands(capture.elt, { flipHorizontal: true })
		for (let j=0; j<hands.length; j++) {
			const hand = hands[j]
			const handedness = hand.handedness
			noStroke()
			fill(255,0,0) 
			for (let i=0; i<5; i++) {
				const k = hand.keypoints[9]
				const l = hand.keypoints[6]
				const r = hand.keypoints[10]
				//punti sulle dita
				
				if (l.x - r.x > -50){
					image(luigieyel, l.x - 80, l.y - 170, 817/6, 1103/6)
					image(luigieyer, r.x, r.y - 150, 817/6, 1103/6)
					image(luigigambe, k.x - (1209/6)/2, k.y - (1275/6)/2, 1209/6, 1275/6)
				}
				else{

					image(marioeyel, l.x - 80, l.y - 170, 817/6, 1103/6)
					image(marioeyer, r.x, r.y - 150, 817/6, 1103/6)
					image(mariogambe, k.x - (1209/6)/2, k.y - (1275/6)/2, 1209/6, 1275/6)
					}
			}

		}
	}
}
async function createDetector() {
	const mediaPipeConfig = {
		runtime: "mediapipe",
		modelType: "full",
		maxHands: 2,
		solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
	}
	return window.handPoseDetection.createDetector( window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig )
}
