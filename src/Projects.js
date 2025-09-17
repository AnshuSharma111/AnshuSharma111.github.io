import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Personal Portfolio',
    description: 'A modern portfolio website built with React.',
    link: '#',
  },
  {
    title: 'E-commerce App',
    description: 'A full-featured e-commerce application using MERN stack.',
    link: '#',
  },
  {
    title: 'Blog Platform',
    description: 'A blogging platform with user authentication and markdown support.',
    link: '#',
  },
];

const Projects = () => (
  <section className="projects" id="projects">
    <h2>Projects</h2>
    <div className="project-list">
      {projects.map((project, idx) => (
        <div className="project-card" key={idx}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.link} className="btn" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
