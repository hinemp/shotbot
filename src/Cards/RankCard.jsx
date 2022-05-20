import React from "react"
import { Alert, Card, ProgressBar } from "react-bootstrap";

const RankCard = ({ rank }) => {
  return (
    <Card
      className="bg-dark text-white"
      style={{ maxWidth: 'fit-content', margin: 'auto', color: 'black', fontSize: '1.5rem' }}>
      <Card.Body>
        <Card.Title
          style={{ fontSize: '2rem', textAlign: 'center' }}>
          {rank.rank}
        </Card.Title>
        <Card.Img src={rank.img} style={{
          width: null,
          resizeMode: 'contain',
          height: 150
        }}></Card.Img>
        <Card.Text as="div" style={{textAlign: 'center'}}>
          <br></br>
          <ProgressBar variant='success' now={rank.mmr}></ProgressBar>
          {rank.mmr}/100
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default RankCard;