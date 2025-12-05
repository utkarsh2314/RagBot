// hooks/useConflict.ts
import { useState } from "react";
import config from "../../config";

const BASE_URL = config.apiUrl;
const API_URL = BASE_URL + '/docs'

export function useConflict(
  oldFile: string,
  newFile: string,
  onResolved: (msg: string) => void
) {
  const [loading, setLoading] = useState(false);

  const oldFileUrl = `${API_URL}/files/${oldFile}`;

  const replaceExisting = async () => {
    setLoading(true);

    try {
      // DELETE old file
      const fdDelete = new FormData();
      fdDelete.append("filename", oldFile);

      const resDelete = await fetch(`${API_URL}/delete`, {
        method: "POST",
        body: fdDelete,
      });

      const deleteData = await resDelete.json();

      // UPLOAD new one
      const fdUpload = new FormData();
      fdUpload.append("filename", newFile);

      const resUpload = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: fdUpload,
      });

      await resUpload.json();

      onResolved(deleteData.msg || "File replaced successfully.");
    } catch (err: any) {
      onResolved(err.message || "Error replacing file.");
    } finally {
      setLoading(false);
    }
  };

  const uploadSeparate = async () => {
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("filename", newFile);

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      onResolved(data.msg || "Uploaded as new document.");
    } catch (err: any) {
      onResolved(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    oldFileUrl,
    replaceExisting,
    uploadSeparate,
  };
}
