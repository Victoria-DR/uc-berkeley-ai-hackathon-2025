"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'; // Import rehype-raw

function Analysis() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  return (
    <div className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Analysis</h1>
      {/* Render Markdown content */}
      <div className="prose max-w-none"> {/* Add 'prose' class for basic styling */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]} // Add rehypeRaw to process raw HTML
          components={{
            // Example: Map h1 markdown to render as h2 HTML
            h1: 'h2',
            // Example: Customize emphasis to be red and italic
            em: ({node, ...props}) => <i style={{color: 'red'}} {...props} />,            
          }}
        >
          {data}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden flex items-center justify-center">
      {/* Background decorative elements (optional) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl p-4">
        <Suspense>
          <Analysis />
        </Suspense>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

// "use client";

// import { useSearchParams } from "next/navigation";
// import { Suspense } from "react";
// import ReactMarkdown from 'react-markdown'; 
// import remarkGfm from 'remark-gfm'; 

// function Analysis() {
//   const searchParams = useSearchParams();
//   const data = searchParams.get("data");

//   return (
//     <div className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl space-y-4">
//       <h1 className="text-2xl font-bold text-gray-900 mb-4">Analysis</h1>
//       {/* Render Markdown content */}
//       <div className="prose max-w-none"> {/* Add 'prose' class for basic styling */}
//         <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
//       </div>
//     </div>
//   );
// }

// export default function AnalysisPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden flex items-center justify-center">
//       {/* Background decorative elements (optional) */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-5xl p-4">
//         <Suspense>
//           <Analysis />
//         </Suspense>
//       </div>

//       <style jsx>{`
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }
