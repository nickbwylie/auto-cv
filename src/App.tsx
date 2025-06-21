import { useState } from "react";

const AutoCVApp: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!resumeFile || !jobDescription.trim()) return;
    setIsLoading(true);
    setResult(null);

    // Placeholder logic — replace with real backend integration
    setTimeout(() => {
      setResult(
        "✅ Tailored resume generated and match score: 82%\n\nSuggested edits: Highlight your TypeScript and AWS experience more prominently."
      );
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        AutoCV: Smart Resume Tailoring
      </h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">Upload Your Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-indigo-600 file:text-white rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Paste Job Description</label>
        <textarea
          className="w-full h-40 p-2 border rounded-md"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || !resumeFile || !jobDescription.trim()}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Tailor My Resume"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-stone-100">
      {/* <h1>Hi</h1> */}
      {/* <MapView /> */}
      <div className="min-w-96 h-96">
        <AutoCVApp />
      </div>
    </div>
  );
}

export default App;
