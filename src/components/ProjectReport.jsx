import React from "react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ProjectReport = () => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="h-[100%] overflow-y-scroll">
      {/* <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl="/invoiceAssets/pr.pdf"
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker> */}
      <iframe
        src="/invoiceAssets/pr.pdf"
        title="PDF Viewer"
        width="100%"
        height="750px"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default ProjectReport;
