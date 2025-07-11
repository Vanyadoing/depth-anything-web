import { pipeline } from '@xenova/transformers';

let estimator = await pipeline('depth-estimation', 'Xenova/depth-anything-v2-base');

document.getElementById('upload').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  const image = new Image();
  image.src = imageUrl;
  await image.decode();

  const { depth } = await estimator(image);

  // Draw output on canvas
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const bitmap = await createImageBitmap(depth);
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  ctx.drawImage(bitmap, 0, 0);
});
