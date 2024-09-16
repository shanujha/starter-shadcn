// src/FileUpload.tsx
import React, { PropsWithChildren, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import apiPool from "@/lib/api-pool";

type IFileUploadProps = {
  cb: Function;
  onReset: Function;
  isUploaded?: boolean;
  uploadUrl?: string;
  allowed?: string; //defaults to image pattern
};

const FileUpload: React.FC<PropsWithChildren<IFileUploadProps>> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setL] = useState(false);
  const [uploaded, setU] = useState(props.isUploaded ?? false);
  const [progress, setProgress] = useState(0);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setL(true);
    if (!file) return;

    const formData = new FormData();
    formData.append("background", file); // Ensure 'file' matches the backend field name

    try {
      const response = await axios.post(
        props.uploadUrl ??
        apiPool.baseUrl + apiPool.paths.upload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const progress = Math.round((event.loaded * 100) / event.total);
              setProgress(progress);
            }
          },
        }
      );

      setTimeout(() => {
        setUploadUrl(response.data.url);
        props.cb(response.data.url);
        toast("Upload successful!");
        setL(false);
        setU(true);
      }, 500);
    } catch (error: any) {
      toast("Upload failed!", { description: JSON.stringify(error), duration: 10000 });
      setFile(null)
      setL(false)
      setU(false)
      console.error("Upload failed:", error);
    }
  };

  const reset = () => {
    setUploadUrl(null);
    setL(false);
    setU(false);
    setProgress(0);
    setFile(null);
    toast("Upload reset");
    props.cb(null);
    props.onReset();
  };

  const ResetButton = () => {
    return (
      <Button
        type="button"
        onClick={reset}
        variant="outline"
        size="sm"
        className="h-18 mx-2 gap-1"
      >
        <X className="h-4 w-4" />
      </Button>
    );
  };

  if (props.isUploaded) {
    return (
      <div className="flex">
        {props.children}
        <ResetButton />
      </div>
    );
  }

  return (
    <div>
      {loading && !uploaded && <ButtonLoading />}
      {!loading && (
        <>
          {!file && (
            <Input type="file" onChange={handleFileChange} accept={props.allowed ?? "image/*"} />
          )}
          {file && (
            <div className="flex">
              <Button type="button" size="sm" onClick={handleUpload} disabled={!file}>
                <Upload className="h-3 w-3 mr-2" />
                Upload
              </Button>
              <ResetButton />
            </div>
          )}
        </>
      )}

      {/* {progress > 0 && <Progress value={progress} />}
      {uploadUrl && (
        <p>
          File uploaded to:{" "}
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
            {uploadUrl}
          </a>
          <img height={"100px"} width={"100px"} src={uploadUrl} />
        </p>
      )} */}
    </div>
  );
};

export default FileUpload;

export function ButtonLoading() {
  return (
    <Button size="sm" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
