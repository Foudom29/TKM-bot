const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0tBZVBWUHh2SFBSVUVnTHFiamtHeFcwUWhuamQ2V3U5TEd4d3NYMVJudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDV6dFREL0RIYU5OU0xWcFk2MWNGWFpGQk42QmdWaERGTU1OTUJvb29tZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TzhwNUVGQ2I4TzczMWJuUy8xc3lpMmxhTjJONnY0d0tGRWwyRWw2cFhrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOOHpiYjZqTUhoNFhHSTUrcXptdEdqbnZObGwxZDBoWWNHaWhjdHBnV0ZNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVKVnNvWGVxaEZFQXJ5d0pDZ0VsUmNmNzh3ZHhrZFIxWDNSaTVVM3JtRWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imk1QU9EMHhvL2ZsKzFpSG1SNjdDbmFVRzkyS1hUMTBsaE5yYjloQmZlRms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0ZTQXBsTlZKYXI2ckw5aWpSMzFBN1pCcGZWV09ENkNibDRiSWhxTG9GVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGlrVU9EODBwV1hyeDdGMXpqL1hZcFR2V1VZc0d1QTVDUndBUmVBMHNpVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1kMkd6a0t2bE5sNVF2aklMbkdVeG10TXFnN00xQWhSRnVTZ3lqbTJZK0ljS25RR1ZGellHQXNQa2o2MFF2d0QzVWhxeC9XM0RiTkpJaXJIbWVHMmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiJyOHlNdEZ4MnpIVkZlWjM3Z0FXQ2FYeEFGZzBzemFsWm5PSkhxR2hQUEwwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI0b0hta25iblMtMnNFZmU5ZUZ1SmZRIiwicGhvbmVJZCI6IjM5YTg4YTVhLWFmY2EtNDc1MC05M2M5LTBhMjUwMzRmOGZlMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLMWRSRFZ4UU0vT3JCYXgxTksvZFdUcDRzMjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmtObXRoY1pISVNIOUEyQ0Y5UitzejVzcm80PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRFM0RWS0syIiwibWUiOnsiaWQiOiIyMzc2OTg0NTkxMTc6NDVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tDYzJNY0VFTHZROHJRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldrWnpHT3N2bUV2UXBENW16T0JwQW91N0xpK3lTekdJN080QmNaRzZtd3M9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjR5U29WVHB4cHllS0ZYS05SaEJNL3kxanlHdGl4SWdMUm1XOE9Sa3QvUGdlWTdpSWliVFlVaUJaU3lqU2NMMnh6V3haTVdkc3FnYzkrSVYrOThBTkRnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYelVuNFB1cExhRmNwQ1FjaVhTMDN5Slo2SlI1OFU2ejNzaW1iZURZRHBacEpOM0VNcVd6ZjJJZjg1ODhyMUhhMEVSdjdmWWtsSHRyMGdNWDJ5bDhoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY5ODQ1OTExNzo0NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWcEdjeGpyTDVoTDBLUStac3pnYVFLTHV5NHZza3N4aU96dUFYR1J1cHNMIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNTQyNzI4fQ==',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "◥꧁ⓘⓣⓐⓒⓗⓘ ⓤⓒⓗⓘⓗⓐ◥꧁",
    NUMERO_OWNER : process.env.OWNER_NUM || "237698459117",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '◥꧁ⓘⓣⓐⓒⓗⓘ ⓤⓒⓗⓘⓗⓐ◥꧁',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/cd80a3edacc1b1f56537b.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
