const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { setTimeout } = require("timers/promises");

const htUrl = "https://www.hattrick.org/es/World/Series/?LeagueLevelUnitID=";
const botSelector = "img[alt='El equipo está actualmente sin dueño']";
const leagueNameSelector = "h1.hasByline";

const VII1 = 38037;
const VII1024 = 39060

main()

async function main(){
    for (i = VII1; i <= VII1024; i++)
    {
        const leagueUrl = htUrl + i;
        var res = await axios.get(leagueUrl);
        printBots(res.data);

        await setTimeout(5000);
    }
}

function printBots(html) {
    // fs.writeFileSync("test.html", html);
    const $ = cheerio.load(html);
    const leagueName = $(leagueNameSelector).text().trim().replace('\n', '');
    const bots = $(botSelector).length;

    const color = msgColor[bots] ?? "cyan";
    colorLog(`${leagueName} tiene ${bots} bots!! ${'@'.repeat(bots)}`, color);
}

const msgColor = {
    "4": "white",
    "5": "white",
    "6": "green",
    "7": "green",
    "8": "yellow",
};

function colorLog(msg, color) {
    console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}
