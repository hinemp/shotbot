import React from "react"
import { Card } from "react-bootstrap";

const GameCard = ({ game }) => {
  return (
    <Card
      className="bg-dark text-white"
      style={{ width: 'fit-content', maxHeight: '100%', margin: '.5% auto', color: 'black', fontSize: '1.5rem' }}>
      <Card.Body style={{ textAlign: 'center' }}>
        <Card.Title>
          {game.kills} - {game.deaths} - {game.assists}
        </Card.Title>
        <Card.Img src={game.agent_img} style={{
          width: null,
          resizeMode: 'contain',
          height: 220
        }}></Card.Img>
        <Card.Text >
          {game.record} {game.map}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default GameCard;