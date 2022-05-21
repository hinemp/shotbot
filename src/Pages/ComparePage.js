import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useState } from "react";

import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import CompareCard from "../Cards/CompareCard"
import { getLastFive, getCompare } from "../ApiTools";

const COL_STYLE = {
  textAlign: 'center',
}

const compileListView = async (games1, games2) => {
  let obj = [];
  for (let i = 0; i < games1.length; i++) {
    const user1 = games1[i];
    const kda1 = `${user1.kills}-${user1.deaths}-${user1.assists}`;
    const user2 = games2[i];
    const kda2 = `${user2.kills}-${user2.deaths}-${user2.assists}`;
    const game = { key: user1.key, agent1: user1.agent, kda1: kda1, outcome: user1.record, kda2: kda2, agent2: user2.agent };
    obj.push(game);
  }
  return obj;
}

const Compare = () => {
  const [user1, setUser1] = useState('');
  const [tag1, setTag1] = useState('');
  const [user2, setUser2] = useState('');
  const [tag2, setTag2] = useState('');
  const [games1, setGames1] = useState({});
  const [games2, setGames2] = useState({});
  const [listObj, setListObj] = useState([]);
  const [viewCards, setViewCards] = useState(true);

  const submit = async (e) => {
    e.preventDefault();
    setGames1(null);
    setGames2(null);

    let rawGames1 = await getLastFive(user1, tag1);
    let rawGames2 = await getLastFive(user2, tag2);
    let { user1T, user2T } = await getCompare(rawGames1, rawGames2);
    setGames1(user1T);
    setGames2(user2T);
    let list = await compileListView(games1, games2);
    setListObj(list);
  }

  return (
    <Container>
      <Form onSubmit={submit}>
        <Row>
          <Col style={COL_STYLE}>
            <h1>Player 1</h1>
            <Form.Group as={Row}>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="username"
                  onChange={(e) => setUser1(e.target.value)}
                />
              </Col>
              <Col sm='4'>
                <Form.Control
                  type="text"
                  placeholder="tag"
                  onChange={(e) => setTag1(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col style={COL_STYLE}>
            <h1>Player 2</h1>
            <Form.Group as={Row}>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="username"
                  onChange={(e) => setUser2(e.target.value)}
                />
              </Col>
              <Col sm='4'>
                <Form.Control
                  type="text"
                  placeholder="tag"
                  onChange={(e) => setTag2(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <br></br>
        <Row style={COL_STYLE}>
          <Button type='submit' size='lg'>Submit</Button>
          <BootstrapSwitchButton
            size='lg'
            checked={viewCards}
            onlabel='Card'
            offlabel='List'
            onChange={(checked) => setViewCards(checked)}
          />
        </Row>
        <br />
      </Form>
      <Container>
        {
          games1?.length > 0
            ? (
              viewCards ? (
                <Container style={{ textAlign: 'center' }}>
                  <Row>
                    <Col>
                      <>
                        {games1.map((game) => (
                          <CompareCard key={game.key} game={game} />
                        ))}
                      </>
                    </Col>
                    <Col>
                      {
                        games1?.length > 0
                          ? (
                            <>
                              {games2.map((game) => (
                                <CompareCard key={game.key} game={game} />
                              ))}
                            </>
                          ) : (
                            <p>Waiting for Info...</p>
                          )
                      }
                    </Col>
                  </Row>
                </Container> // Render Card View
              ) : (
                <Container style={{ textAlign: 'center' }}>
                  <Table striped bordered hover variant='dark'>
                    <thead>
                      <tr>
                        <th>P1's Agent</th>
                        <th>P1's KDA</th>
                        <th>Outcome</th>
                        <th>P2's KDA</th>
                        <th>P2's Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listObj.map((game) => (
                        <tr key={game.key}>
                          <td>{game.agent1}</td>
                          <td>{game.kda1}</td>
                          <td>{game.outcome}</td>
                          <td>{game.kda2}</td>
                          <td>{game.agent2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container> // Render List View
              )
            ) : (
              <p style={{ textAlign: 'center' }}>Waiting for info...</p>
            )
        }
      </Container>
    </Container>
  )
}

export default Compare;