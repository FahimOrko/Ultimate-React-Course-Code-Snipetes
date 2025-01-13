import React from "react";
import Skills from "./Skills";

const ProfileContent = () => {
  return (
    <div className="data">
      <h1>Fahim Orko</h1>
      <p>Full Stack Web Dev, Entusiast Tech programer</p>
      <ol className="skill-list">
        <li>
          <Skills skillName="HTML+CSS" bgColor="orange" />
        </li>
        <li>
          <Skills skillName="JS" bgColor="yellow" />
        </li>
        <li>
          <Skills skillName="React" bgColor="lightgreen" />
        </li>
        <li>
          <Skills skillName="BackEnd" bgColor="skyblue" />
        </li>
        <li>
          <Skills skillName="FrontEnd" bgColor="pink" />
        </li>
      </ol>
    </div>
  );
};

export default ProfileContent;
