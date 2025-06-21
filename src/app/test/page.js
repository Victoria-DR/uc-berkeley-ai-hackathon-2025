"use client";

export default function TestPage() {
  return (
    <div className="">
      <h1>Test Page</h1>
      <p>This is a test page for the Google GenAI integration.</p>
      <button
        onClick={() => alert("This button will trigger the AI function.")}
      >
        Test AI Function
      </button>
    </div>
  );
}
