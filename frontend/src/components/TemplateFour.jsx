import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

// A helper component for creating the section titles with lines
const Section = ({ title, children, className = "" }) => (
  <section className={`mb-5 break-inside-avoid ${className}`}>
    <h2 className="text-center text-sm font-bold tracking-widest text-gray-800 uppercase mb-2">
      {title}
    </h2>
    <hr className="border-t border-gray-300 mb-3" />
    <div className="text-xs">{children}</div>
  </section>
);

const TemplateFour = ({ resumeData = {}, containerWidth }) => {
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

  // Scaling logic for preview
  const resumeRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current && containerWidth > 0) {
      const actualWidth = resumeRef.current.offsetWidth;
      if (actualWidth > 0) {
        setScale(containerWidth / actualWidth);
      }
    }
  }, [resumeData, containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-8 bg-white font-serif text-gray-800 w-[210mm] min-h-[297mm] overflow-hidden"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      {/* === Header === */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900 uppercase">
          {profileInfo.fullName || "Eleanor Fitzgerald"}
        </h1>
        <p className="text-lg font-medium text-gray-700 mt-1">
          {profileInfo.designation || "Web Developer"}
        </p>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
              {contactInfo.email}
            </a>
          )}
          {contactInfo.github && (
            <a href={contactInfo.github} className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
          {contactInfo.linkedin && (
            <a href={contactInfo.linkedin} className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* === Career Summary === */}
      {profileInfo.summary && (
        <Section title="Career Summary">
          <p className="text-xs leading-relaxed text-center">
            {profileInfo.summary}
          </p>
        </Section>
      )}

      {/* === Work Experience === */}
      {workExperience.length > 0 && workExperience[0]?.company && (
        <Section title="Work Experience">
          <div className="space-y-4">
            {workExperience.map((exp, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold">{exp.role}</h3>
                  <p className="text-xs text-gray-600">
                    {formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}
                  </p>
                </div>
                <p className="italic text-gray-700 mb-1">{exp.company}</p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.description?.split('\n').map((point, j) => (
                    point && <li key={j}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* === Relevant Projects === */}
      {projects.length > 0 && projects[0]?.title && (
        <Section title="Relevant Projects">
          <div className="space-y-4">
            {projects.map((proj, i) => (
               <div key={i} className="break-inside-avoid">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold">{proj.title}</h3>
                </div>
                <ul className="list-disc list-inside space-y-1 mb-1">
                  {proj.description?.split('\n').map((point, j) => (
                    point && <li key={j}>{point}</li>
                  ))}
                </ul>
                {(proj.github || proj.liveDemo) && (
                  <p className="text-xs mt-1">
                    <span className="font-semibold">Links:</span>
                    {proj.github && <a href={proj.github} className="text-blue-600 hover:underline ml-2">GitHub</a>}
                    {proj.liveDemo && <a href={proj.liveDemo} className="text-blue-600 hover:underline ml-2">Live Demo</a>}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* === Education === */}
      {education.length > 0 && education[0]?.institution && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold">{edu.institution}</h3>
                <p>{edu.degree}</p>
              </div>
              <div className="text-right">
                 <p className="text-xs text-gray-600">
                    {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                </p>
                {edu.percentage && <p className="font-semibold">Percentage: {edu.percentage}</p>}
              </div>
            </div>
          ))}
        </Section>
      )}
      
      {/* === Skills === */}
      {skills.length > 0 && skills[0]?.name && (
          <Section title="Skills">
  {/* Use flexbox to arrange items horizontally */}
  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
    {skills.map((skill, i) => (
      <p key={i}>
        <span className="mr-1">•</span>
        {skill.name}
      </p>
    ))}
  </div>
</Section>
        )}

        {languages.length > 0 && (
  <Section title="Languages">
    {/* Use flexbox to arrange items horizontally */}
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
      {languages.map((lang, i) => (
        <p key={i}>
          <span className="mr-1">•</span>
          {lang.name}
        </p>
      ))}
    </div>
  </Section>
)}

      {/* === Certifications === */}
      {certifications.length > 0 && certifications[0]?.title && (
          <Section title="Certifications and Achievements">
             <ul className="list-disc list-inside space-y-1">
              {certifications.map((cert, i) => <li key={i}>{cert.title} ({cert.year})</li>)}
            </ul>
          </Section>
        )}

      {/* === Interests === */}
      {interests.length > 0 && interests[0] && (
        <Section title="Interests">
           <ul className="list-disc list-inside space-y-1">
            {interests.map((interest, i) => interest && <li key={i}>{interest}</li>)}
          </ul>
        </Section>
      )}
    </div>
  );
};

export default TemplateFour;