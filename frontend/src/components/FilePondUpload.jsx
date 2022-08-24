import { FilePond, registerPlugin } from "react-filepond";

import { useEffect, useState } from "react";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginImageEdit
);

function FilePondUpload({ getFile }) {
    return (
        <div className="file-upload-container mb-16">
            <FilePond
                allowMultiple={true}
                maxFiles={3}
                allowReorder={true}
                allowImageResize={true}
                imagePreviewHeight={300}
                imageResizeTargetWidth={200}
                allowFileEncode={true}
                name="file"
                allowImageEdit={true}
                onaddfile={(error, file) => {
                    getFile({
                        id: file.id,
                        name: file.filename,
                        type: file.fileType,
                        size: file.fileSize,
                        // metadata: {
                        //     resize: file.getMetadata(),
                        // },

                        data: file.getFileEncodeBase64String(),
                    });
                }}
                ima
            />
        </div>
    );
}

export default FilePondUpload;
