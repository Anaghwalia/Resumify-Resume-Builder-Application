import React, { useEffect, useRef, useState } from "react";
import { LuMail, LuPhone, LuGithub, LuGlobe, LuMapPin } from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import { formatYearMonth } from "../utils/helper";

// A reusable Title component for section headers
const SectionTitle = ({ text }) => (
  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2 pb-1 border-b-2 border-gray-300">
    {text}
  </h2>
);

const TemplateFive = ({ resumeData = {}, containerWidth }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [], // Achievements
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
      className="bg-white font-serif text-black w-[210mm] min-h-[297mm] p-8 overflow-hidden"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      {/* --- Full-Width Header --- */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-wide text-gray-900">
          {profileInfo.fullName}
        </h1>
        <p className="text-xl font-medium text-gray-600 mt-1">
          {profileInfo.designation}
        </p>
      </header>

      {/* --- Two-Column Layout --- */}
      <div className="flex gap-8">
        {/* --- Left Column (Sidebar) --- */}
        {/* Added border-r and pr-8 for the vertical line and padding */}
        <aside className="w-1/3 space-y-4 pr-8 border-r border-gray-300"> 
          
          {(contactInfo.phone || contactInfo.email) && (
            <section className="break-inside-avoid">
              <SectionTitle text="Contact" />
              <div className="space-y-2 text-xs">
                {contactInfo.phone && <div className="flex items-center gap-2"><LuPhone size={12} /><span>{contactInfo.phone}</span></div>}
                {contactInfo.email && <div className="flex items-center gap-2"><LuMail size={12} /><span>{contactInfo.email}</span></div>}
                {contactInfo.location && <div className="flex items-center gap-2"><LuMapPin size={12} /><span>{contactInfo.location}</span></div>}
                {contactInfo.linkedin && <div className="flex items-center gap-2"><RiLinkedinLine size={12} /><span><a href={contactInfo.linkedin} className="text-blue-600">LinkedIn</a></span></div>}
                {contactInfo.github && <div className="flex items-center gap-2"><LuGithub size={12} /><span><a href={contactInfo.github} className="text-blue-600">GitHub</a></span></div>}
              </div>
            </section>
          )}

          {education.length > 0 && education[0]?.institution && (
            <section className="break-inside-avoid">
              <SectionTitle text="Education" />
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className="text-xs">
                    <h3 className="font-bold">{edu.institution}</h3>
                    <p>{edu.degree}</p>
                    <p className="text-gray-600">{formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}</p>
                    {edu.percentage && <p>GPA: {edu.percentage/10}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && skills[0]?.name && (
            <section className="break-inside-avoid">
              <SectionTitle text="Skills" />
              <ul className="list-disc list-inside text-xs space-y-1">
                {skills.map((skill, i) => <li key={i}>{skill.name}</li>)}
              </ul>
            </section>
          )}
          
          {certifications.length > 0 && certifications[0]?.title && (
            <section className="break-inside-avoid">
              <SectionTitle text="Achievements" />
              <ul className="list-disc list-inside text-xs space-y-1">
                {certifications.map((cert, i) => <li key={i}>{cert.title} ({cert.year})</li>)}
              </ul>
            </section>
          )}

          {interests.length > 0 && interests[0] && (
            <section className="break-inside-avoid">
              <SectionTitle text="Interests" />
              <ul className="list-disc list-inside text-xs space-y-1">
                {interests.map((int, i) => int && <li key={i}>{int}</li>)}
              </ul>
            </section>
          )}
        </aside>

        {/* --- Right Column (Main Content) --- */}
        <main className="w-2/3 space-y-4">
          {profileInfo.summary && (
            <section className="break-inside-avoid">
              <SectionTitle text="Profile Summary" />
              <p className="text-xs leading-relaxed text-gray-700">{profileInfo.summary}</p>
            </section>
          )}

          {workExperience.length > 0 && workExperience[0]?.company && (
            <section className="break-inside-avoid">
              <SectionTitle text="Work Experience" />
              <div className="space-y-4">
                {workExperience.map((exp, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm">{exp.company}</h3>
                      <p className="text-xs text-gray-600">{formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}</p>
                    </div>
                    <p className="italic">{exp.role}</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {exp.description?.split('\n').map((point, j) => point && <li key={j}>{point}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && projects[0]?.title && (
  <section className="break-inside-avoid">
    <SectionTitle text="Projects" />
    <div className="space-y-4">
      {projects.map((proj, i) => (
        <div key={i} className="text-xs">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-sm">{proj.title}</h3>
            <p className="text-xs text-gray-600">{formatYearMonth(proj.startDate)} - {formatYearMonth(proj.endDate)}</p>
          </div>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {proj.description?.split('\n').map((point, j) => point && <li key={j}>{point}</li>)}
          </ul>
          
          {/* --- ADDED THIS BLOCK --- */}
          {(proj.github || proj.liveDemo) && (
            <div className="flex flex-wrap items-center gap-4 mt-2">
              {proj.github && (
                <a href={proj.github} className="text-blue-600 hover:underline">
                  GitHub
                </a>
              )}
              {proj.liveDemo && (
                <a href={proj.liveDemo} className="text-blue-600 hover:underline">
                  Live Demo
                </a>
              )}
            </div>
          )}
          
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

export default TemplateFive;