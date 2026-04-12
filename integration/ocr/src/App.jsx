import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:8000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(response.data.message); // Shows "Received" from backend
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload PDF</button>
        </div>
    );
};

export default FileUpload;
