import React from "react";

function Header(){
  return <header className="header"><h1>About : Wonders Tour</h1></header>;
}

function Section(){
  return (
    <section className="section">
    <p><strong><em>Wonders Tour</em></strong> is a fictional tour coumpany created to learn various aspect of web development.This includes : </p>
    <ol>
      <li> Front end Tech such as :
        <ol>
          <li>JavaScript</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>React</li>
        </ol>
      </li>
    </ol>
    </section>
  );
}

function About(){
  return <main className="main">
            <Header />
            <Section />
        </main>;
}

export default About;
