import React from "react";

const Skills = (props) => {
  const style = { backgroundColor: props.bgColor };
  return (
    <div className="skill" style={style}>
      {props.skillName}
    </div>
  );
};

export default Skills;
