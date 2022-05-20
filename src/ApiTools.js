const API_URL = 'https://api.henrikdev.xyz/valorant/'

export const getLastFive = async (username, tag) => {
  const response = await fetch(`${API_URL}v3/matches/na/${username}/${tag}?filter=competitive`);
  const data = await response.json();
  console.log(data.data[0]);
  // Data is now the games object like from the discord bot
  let games = [];
  for (let i = 0; i < 5; i++) {
    let game_data = data.data[i]
    let user_stats = game_data.players.all_players.find(({ name }) => name === username).stats;  // Pull all player info
    let agent = game_data.players.all_players.find(({ name }) => name === username).character;
    let agent_img = game_data.players.all_players.find(({ name }) => name === username).assets.agent.full;
    let team_name = game_data.players.all_players.find(({ name }) => name === username).team;   // Get user team name
    let user_team;
    team_name === 'Blue' ? (user_team = game_data.teams.blue) : (user_team = game_data.teams.red);
    let record;
    if (user_team.rounds_won > user_team.rounds_lost) {
      record = `W (${user_team.rounds_won}-${user_team.rounds_lost})`;
    } else if (user_team.rounds_won < user_team.rounds_lost) {
      record = `L (${user_team.rounds_won}-${user_team.rounds_lost})`;
    } else {
      record = `D (${user_team.rounds_won}-${user_team.rounds_lost})`;
    }
    games.push({
      key: i,
      agent: agent,
      agent_img: agent_img,
      kills: user_stats.kills,
      deaths: user_stats.deaths,
      assists: user_stats.assists,
      map: game_data.metadata.map,
      record: record
    });
  }
  return games;
}

export const compileStats = async (games) => {
  const obj = {};
  const kills = games.reduce((accumulator, game) => { return accumulator + game.kills; }, 0);
  const deaths = games.reduce((accumulator, game) => { return accumulator + game.deaths; }, 0);
  const assists = games.reduce((accumulator, game) => { return accumulator + game.assists; }, 0);
  obj.kills = kills
  obj.deaths = deaths
  obj.assists = assists;

  return obj;
}

function buildImgMap() {
  let names =
    ['Iron-1', 'Iron-2', 'Iron-3', 'Bronze-1', 'Bronze-2', 'Bronze-3',
      'Silver-1', 'Silver-2', 'Silver-3', 'Gold-1', 'Gold-2', 'Gold-3',
      'Platinum-1', 'Platinum-2', 'Platinum-3', 'Diamond-1', 'Diamond-2', 'Diamond-3',
      'Immortal-1', 'Immortal-2', 'Immortal-3', 'Radiant'];
  let map = new Map();
  for (var i = 3; i <= 24; i++) {
    let nameIndex = i - 3;
    map.set(names[nameIndex], `https://img.rankedboost.com/wp-content/uploads/2020/04/${names[nameIndex]}-Valorant-Rank.png`);
  }
  return map;
}

export const getRank = async (username, tag) => {
  const imgMap = buildImgMap();
  const response = await fetch(`${API_URL}v1/mmr/na/${username}/${tag}`);
  const data = await response.json();
  const obj = {};
  obj.rank = data.data.currenttierpatched;
  obj.mmr = data.data.ranking_in_tier;
  obj.img = imgMap.get(obj.rank.replace(' ', '-'));

  return obj;
}
