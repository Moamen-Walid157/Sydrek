declare module "onnxruntime-web" {
  const ort: {
    env: { logLevel: string };
  };
  export default ort;
}

declare module "onnxruntime-web/webgpu" {
  const ort: {
    env: { logLevel: string };
  };
  export default ort;
}
