"use client";

const Upload = () => {
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            alert('File uploaded successfully');
        } else {
            alert('File upload failed');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Import Numbers</h1>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default Upload;
