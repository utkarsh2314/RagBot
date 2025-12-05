// import axios from "axios";
// import config from "../../config";

// const BASE_URL = config.apiUrl;
// const API_URL = BASE_URL + '/docs'

// export async function UploadFile(file: File) {
//   try {
//     // const res = await axios.post(API_URL, {
//     //   ques: question,
//     //   context: context,
//     // });
//     const res = await axios.post(API_URL, {
//         file : file
//       });
//     return {
//       ok: true,
//       answer: res.data?.response ?? "I could not find an answer in the policies.",
//     };
//   } catch (err: unknown) {
//     const message =
//       err instanceof Error ? err.message : "Request failed unexpectedly";

//     return {
//       ok: false,
//       answer: `Error: ${message}`,
//     };
//   }
// }


// hooks/useUpload.ts
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import config from "../../config";

const BASE_URL = config.apiUrl;
const API_URL = BASE_URL + '/docs/'


export function useUpload(onClose: () => void) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [conflict, setConflict] = useState<{ oldFile: string; newFile: string } | null>(null);

  // Handle toast messages
  useEffect(() => {
    if (!status) return;

    status.ok ? toast.success(status.msg) : toast.error(status.msg);
    onClose();
  }, [status]);

  const reset = () => {
    setFile(null);
    setStatus(null);
    setUploading(false);
    setConflict(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus({ ok: false, msg: "Please choose a file" });
      return;
    }

    setUploading(true);
    setStatus(null);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(API_URL, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      const expected = file.name + " added successfully";

      if (data.msg === expected) {
        setStatus({ ok: true, msg: "File uploaded successfully" });
      } else if (data.conflict) {
        setConflict({ oldFile: data.conflict, newFile: data.current });
      }
    } catch (err: any) {
      setStatus({ ok: false, msg: err.message || "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  return {
    file,
    setFile,
    status,
    uploading,
    conflict,
    setConflict,
    setStatus,
    handleUpload,
    reset,
  };
}
