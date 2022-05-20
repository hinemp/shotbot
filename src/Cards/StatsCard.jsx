import React from "react"
import { Card } from "react-bootstrap";

const StatsCard = ({ stats }) => {
    return (
      <Card
        className="bg-dark text-white" 
        style={{ maxHeight: '55px', maxWidth:'fit-content', margin: '1% auto', color: 'black', fontSize: '1.5rem'}}>
        <Card.Body>
          <Card.Title 
            style={{ fontSize: '1rem', textAlign: 'justify' }}>
            Average KD: {(stats.kills/stats.deaths).toFixed(2)}
          </Card.Title>
        </Card.Body>
      </Card>
    )
}

export default StatsCard;