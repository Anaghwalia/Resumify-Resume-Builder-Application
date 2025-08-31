import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

const TemplateThree = ({ resumeData = {}, containerWidth }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    workExperience = [],
    projects = [],
    skills = [],
    languages=[],
    certifications = [],
    interests = [],
  } = resumeData;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(1100);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current) {
      const actualBaseWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualBaseWidth);
      if (containerWidth > 0) {
        setScale(containerWidth / actualBaseWidth);
      }
    }
  }, [containerWidth]);

  // Group skills by category

  return (
    <div
      ref={resumeRef}
      className="bg-white font-sans a4-wrapper text-black max-w-screen-lg mx-auto"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      {/* Header Section */}
      <header className="px-8 pt-8 pb-4 mb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase mb-3">{profileInfo.fullName}</h1>

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {profileInfo.designation}
          </h2>

        </div>

        <p className="text-sm text-gray-700 leading-tight mb-4">
          {profileInfo.summary}
        </p>
      </header>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-12 gap-4 px-8 pb-8">
        {/* LEFT SIDEBAR - 5 columns */}
        <aside className="col-span-5 space-y-5 pr-4 border-r border-gray-300">
          {/* Contact */}
          <section>
            <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">CONTACT</h2>
            <ul className="text-xs text-gray-700 space-y-2 pb-2">
              <li className="flex items-start">
                <span className="font-semibold min-w-[65px]">Location:</span>
                {contactInfo.location}
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[65px]">Phone:</span>
                {contactInfo.phone}
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[65px]">Email:</span>
                <a href={`mailto:${contactInfo.email}`}
                  className="text-blue-600 hover:underline">
                  {contactInfo.email}
                </a>
              </li>
              {contactInfo.linkedin && (
                <li className="flex items-start ">
                  <span className="font-semibold min-w-[65px]">LinkedIn:</span>
                  <a href={contactInfo.linkedin}
                    className="text-blue-600 hover:underline truncate pb-1"
                    title={contactInfo.linkedin}>
                    linkedin.com/in/{contactInfo.linkedin.split('/').pop()}
                  </a>
                </li>
              )}
              {contactInfo.github && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[65px] ">GitHub:</span>
                  <a href={contactInfo.github}
                    className="text-blue-600 hover:underline pb-2 truncate"
                    title={contactInfo.github}>
                    github.com/{contactInfo.github.split('/').pop()}
                  </a>
                </li>
              )}
              {contactInfo.website && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[65px]">Portfolio:</span>
                  <a href={contactInfo.website}
                    className="text-blue-600 hover:underline pb-2 truncate"
                    title={contactInfo.website}>
                    {contactInfo.website.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                </li>
              )}
            </ul>
          </section>

          {/* Skills */}
          
            {skills.length > 0 && (
  <section>
    <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">
      SKILLS
    </h2>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span key={idx} className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
          {skill.name}
        </span>
      ))}
    </div>
  </section>
)}

{languages.length > 0 && (
  <section>
    <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">
      LANGUAGES
    </h2>
    <div className="flex flex-wrap gap-2">
      {languages.map((lang, idx) => (
        <span key={idx} className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
          {lang.name}
        </span>
      ))}
    </div>
  </section>
)}
          

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-3 tracking-wider">EDUCATION</h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="text-xs">
                    <h3 className="font-bold pb-2">{edu.institution}</h3>
                    <p className="pb-2 flex justify-between">
  <span>{edu.degree}</span>
  {/* This part will only show up if a percentage exists */}
  {edu.percentage && <span>Percentage: {edu.percentage}</span>}
</p>

                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">CERTIFICATIONS</h2>
              <ul className="text-xs text-gray-700 space-y-1">
                {certifications.map((cert, idx) => (
                  <li key={idx}>{cert.title} ({cert.year})</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">INTERESTS</h2>
              <ul className="text-xs text-gray-700 space-y-1">
                {interests.map((interest, idx) => (
                  <li key={idx}>• {interest}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* MAIN CONTENT - 7 columns */}
        <main className="col-span-7 space-y-5 pl-4">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-3 tracking-wider border-b border-gray-400 pb-1">WORK EXPERIENCE</h2>
              <div className="space-y-5">
                {workExperience.map((exp, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold pb-2">{exp.role}</h3>
                        <p className="italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                      </div>
                      {exp.startDate && exp.endDate && (
                        <div className="text-right italic">
                          {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                        </div>
                      )}
                    </div>
                    <ul className="list-disc list-inside space-y-1 mt-1 pl-1">
                      {exp.description?.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                      {!exp.description && idx === 0}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-3 tracking-wider border-b border-gray-400 pb-1">PROJECTS</h2>
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{proj.title}</h3>
                      {proj.startDate && proj.endDate && (
                        <div className="text-right italic">
                          {formatYearMonth(proj.startDate)} – {formatYearMonth(proj.endDate)}
                        </div>
                      )}
                    </div>

                    <p className="mt-1 mb-1">{proj.description}</p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {proj.github && (
                        <a href={proj.github}
                          className="text-blue-600 hover:underline flex items-center text-xs">
                          <span>GitHub</span>
                        </a>
                      )}
                      {proj.liveDemo && (
                        <a href={proj.liveDemo}
                          className="text-blue-600 hover:underline flex items-center text-xs">
                          <span>Live Demo</span>
                        </a>
                      )}
                      {proj.technologies && (
                        <span className="text-gray-600">
                          <strong>Tech:</strong> {proj.technologies.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TemplateThree;