import { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    reportType: "",
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    urgency: "medium",

    photos: [],

    questions: [],

    contactMethod: "chat",
  });
  return (
    <ReportContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
export const useReport = () => useContext(ReportContext);