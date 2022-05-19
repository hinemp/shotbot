import { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import 'bootstrap/dist/css/bootstrap.min.css'

import GameCard from "./GameCard"
import StatsCard from './StatsCard';
import { getLastFive, compileStats } from './ApiTools';


function App() {
  // State should contain username, tag, last five game lookup
  const [username, setUsername] = useState('');
  const [tag, setTag] = useState('');
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState({});
  const [viewCards, setViewCards] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    let games = await getLastFive(username, tag);
    setGames(games);
    let stats = await compileStats(games);
    setStats(stats);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Container>
          <h1>ShotBot</h1>
          <br />
          {/* Username and Tag Entry Fields */}
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
                  onChange={(checked) => {
                    setViewCards(checked)
                    console.log(checked)
                  }}
                />
              </Col>
            </Form.Group>
          </Form>
          {
            games?.length > 0
              ? (
                // Show List or Card
                viewCards ? (
                  <>
                    <StatsCard stats={stats} />
                    <Row>
                      {games.map((game) => (
                        <GameCard key={game.key} game={game} />
                      ))}
                    </Row>
                  </>
                ) : (
                  //TODO: Create a list view of the games, in a table
                  <>
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
                    <StatsCard stats={stats} />
                  </>
                )
              ) : (
                <h2>Waiting for Games</h2>
              )
          }
        </Container>
      </header>
    </div>
  );
}

export default App;
