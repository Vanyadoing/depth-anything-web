import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.11.0/+esm';

const depthCanvas = document.getElementById("depthCanvas");
const inputCanvas = document.getElementById("inputCanvas");
const upload = document.getElementById("upload");

const pipe = await pipeline("depth-estimation", "onnx-community/depth-anything-v2-small");

upload.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const image = new Image();
  image.src = URL.createObjectURL(file);

  image.onload = async () => {
    inputCanvas.width = depthCanvas.width = image.width;
    inputCanvas.height = depthCanvas.height = image.height;
    const ctx = inputCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const { depth } = await pipe(image);
    const depthImg = await depth.toImage();
    const depthCtx = depthCanvas.getContext("2d");
    depthCtx.drawImage(depthImg, 0, 0);
  };
});
