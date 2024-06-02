import React, { useContext } from "react";
import { FilesContext } from "../../../contexts/Files";
import AnalyticsGraph from "../components/AnalyticsGraph";

export default function Analytics() {
  const { retrievedFiles } = useContext(FilesContext);
  
  return (
    <div>
        <h2 className="text-lg font-semibold mb-2">📊 Analytics</h2>
      <AnalyticsGraph data={retrievedFiles.data.fileList} />
    </div>
  );
}
