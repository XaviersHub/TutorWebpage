import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadProfilePicture = async (file: File, userId: string) => {
  const fileKey = `profile-photos/${userId}-${file.name}`;

  try {
    // Convert file to Uint8Array (Fixes the error)
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const uploadParams = {
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: fileKey,
      Body: uint8Array, // ✅ Correct format for AWS S3
      ContentType: file.type,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // ✅ Generate a public URL
    const imageUrl = `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${fileKey}`;
    
    return imageUrl;
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    return null;
  }
};
