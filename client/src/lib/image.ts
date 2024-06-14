export const convertImageToBase64 = (file: File, callback: (base64Image: string) => void) => {
  const reader = new FileReader();
  reader.onload = function (event: ProgressEvent<FileReader>) {
    if (event.target && typeof event.target.result === 'string') {
      callback(event.target.result);
    }
  };
  reader.readAsDataURL(file);
};

export const extractImageType = (dataUrl: string): string | null => {
  const match = dataUrl.match(/^data:image\/(.*?);base64/);
  return match && typeof match[1] === 'string' ? match[1] : null;
};

export const getImageResolution = (
  file: File,
  callback: (width: number, height: number) => void
) => {
  const img = new Image();
  img.onload = function () {
    callback(img.width, img.height);
  };
  img.src = URL.createObjectURL(file);
};
