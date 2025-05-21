import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll,
  UploadResult,
  StorageReference
} from 'firebase/storage';
import { storage } from './config';

// Upload a file to Firebase Storage
export const uploadFile = async (
  path: string, 
  file: File
): Promise<{ url: string; ref: string }> => {
  const storageRef = ref(storage, path);
  const result = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(result.ref);
  
  return {
    url,
    ref: path
  };
};

// Get download URL for a file
export const getFileUrl = async (path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
};

// Delete a file from Firebase Storage
export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
};

// List all files in a directory
export const listFiles = async (
  path: string
): Promise<{ name: string; path: string; url: string }[]> => {
  const storageRef = ref(storage, path);
  const result = await listAll(storageRef);
  
  const files = await Promise.all(
    result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return {
        name: itemRef.name,
        path: itemRef.fullPath,
        url
      };
    })
  );
  
  return files;
};

// Generate a unique file path for upload
export const generateFilePath = (
  userId: string, 
  folder: string, 
  fileName: string
): string => {
  const timestamp = Date.now();
  const extension = fileName.split('.').pop();
  const sanitizedName = fileName
    .split('.')[0]
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase();
    
  return `users/${userId}/${folder}/${sanitizedName}_${timestamp}.${extension}`;
};
