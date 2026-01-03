import { useState } from "react";

import { api } from "~/lib/api";

import type { Attachment } from "../types";

export function useAttachments() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const addFile = async (newFile: File, modelId: number) => {
    setAttachments((prevAttachments) => {
      // 이름이 같은 파일이 이미 있는 경우
      if (prevAttachments.find((att) => att.file.name === newFile.name)) {
        return prevAttachments;
      }

      return [...prevAttachments, { file: newFile, fileId: newFile.name, isUploaded: false }];
    });

    try {
      // 파일 업로드
      const fileId = await uploadFile(newFile, modelId);
      setAttachments((prevAttachments) =>
        prevAttachments.map((attachment) =>
          attachment.file.name === newFile.name
            ? { ...attachment, fileId, isUploaded: true }
            : attachment
        )
      );
    } catch {
      // 업로드 실패 처리
      removeAttachment(newFile.name);
    }
  };

  const removeAttachment = (fileId: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((attachment) => attachment.fileId !== fileId)
    );
  };

  const clearAttachments = () => {
    setAttachments([]);
  };

  return {
    attachments,
    addFile,
    removeAttachment,
    clearAttachments,
  };
}

interface UploadFileResponse {
  fileId: string;
}

async function uploadFile(file: File, modelId: number) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("modelId", modelId.toString());

  const response = await api.post<UploadFileResponse>("/messages/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.fileId;
}
