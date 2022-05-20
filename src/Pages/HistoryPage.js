import { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import 'bootstrap/dist/css/bootstrap.min.css'

import GameCard from "../Cards/GameCard"
import StatsCard from '../Cards/StatsCard';
import RankCard from '../Cards/RankCard';
import { getLastFive, compileStats, getRank } from '../ApiTools';

const History = () => {
  const [username, setUsername] = useState('');
  const [tag, setTag] = useState('');
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState({});
  const [rank, setRank] = useState({});
  const [viewCards, setViewCards] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setGames(null);

    setRank(await getRank(username, tag));
    let games = await getLastFive(username, tag);
    setGames(games);
    let stats = await compileStats(games);
    setStats(stats);
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Form.Group as={Row} className="mb-3">
          <Col sm="6">
            <Form.Control
              size="lg"
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <Col sm='3'>
            <Form.Control
              size="lg"
              type="text"
              placeholder="tag"
              onChange={(e) => setTag(e.target.value)}
            />
          </Col>
          <Col>
            <Button type='submit' size='lg'>Submit</Button>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <BootstrapSwitchButton
              size='lg'
              checked={viewCards}
              onlabel='Card'
              offlabel='List'
              onChange={(checked) => setViewCards(checked)}
            />
          </Col>
        </Form.Group>
      </Form>
      {
        games?.length > 0
          ? (
            // Show List or Card
            viewCards ? (
              <> {/* Card View */}
                <StatsCard stats={stats} />
                <Row>
                  <RankCard rank={rank}></RankCard>
                  {games.map((game) => (
                    <GameCard key={game.key} game={game} />
                  ))}
                </Row>
              </>
            ) : (
              <> {/* Table View */}
                <Table striped bordered hover variant='dark'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Agent</th>
                      <th>KDA</th>
                      <th>Outcome</th>
                      <th>Map</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games.map((game) => (
                      <tr key={game.key}>
                        <td>{game.key + 1}</td>
                        <td>{game.agent}</td>
                        <td>{game.kills}-{game.deaths}-{game.assists}</td>
                        <td>{game.record}</td>
                        <td>{game.map}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Row>
                  <StatsCard stats={stats} />
                  <RankCard rank={rank}></RankCard>
                </Row>
              </>
            )
          ) : (
            // Null Case
            // If submit has not been pressed at all, no loading wheel.
            // If submit has been pressed, display loading wheel.
            <h3>Waiting for username and tag</h3>
          )
      }
    </Container>
  )

}

export default History;