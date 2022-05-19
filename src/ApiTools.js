const API_URL = 'https://api.henrikdev.xyz/valorant/v3/matches/na/'

export const getLastFive = async (username, tag) => {
    const response = await fetch(`${API_URL}${username}/${tag}?filter=competitive`);
    const data = await response.json();
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

