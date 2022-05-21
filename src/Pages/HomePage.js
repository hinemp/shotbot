import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <h1>Welcome to Shotbot!</h1>
      <p>
        Shotbot is a basic Valorant Information site. I'm using <a href="https://docs.henrikdev.xyz/valorant.html">this third party API</a>,
         as obtaining access to the Riot API was too difficult of a process for the scope of what I hoped to achieve here.
        I'm hosting this project on Netlify, so if you're reading this it means it's working (I think?).
      </p>
      <p>
        As of right now, I only look up competitive history.
      </p>
      <p>
        This project started as a discord bot, which you can find on my <a href="https://github.com/hinemp?tab=repositories">Github</a>.
        If you'd like to see the initial creation of this app, the commit history is in Personal Projects, as I hadn't initially planned to give this it's own repo.
        I decided to move beyond the scope of a simple Discord bot, as the Discord.js library was limiting me.
        <br /><br />
        This project is meant to display some of my React skills, as well as my ability to consume third party APIs.
        This is why I chose to use Bootstrap, as for right now, the style of this app does not matter to me very much, but I still want it to look decent.
      </p>
      <h2>Roadmap</h2>
      <p>
        At the very least with this project, I want to implement the full functionality of my discord bot, which includes: rank lookup, the ability to compare two players in games they played together, as well as other features.
        After that I hope to add a general information page, which can retrieve the latest patch notes, shop items, etc.
      </p>
    </Container>
  )
}

export default Home;