require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
//const { isUndefined } = require('util');
const client = new Discord.Client();
const token = process.env.TOKEN;

var i;
var chnl;
var xDat;
var yDat;

var cUserID;
var cStats;
var statsArray = [0,1,2,3,4,5,6];
var statsKey = ['Name', 'Race', 'Class', 'Status', 'HP', 'AC', 'Movement Speed', 'Proficiency Bonus', 'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma', 'mhp'/*14*/, 'str', 'dex', 'con', 'int', 'wis', 'cha', 'profSkills'/*21*/, 'maxMov'];
var tStats = ['zero', 'one', 'two', 'three', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'twentyOne', 22];
var stats0 = ['zero', 'one', 'two', 'three', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'twentyOne', 22];
var stats1 = ['zero', 'one', 'two', 'three', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'twentyOne', 22];
var stats2 = ['zero', 'one', 'two', 'three', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'twentyOne', 22];
var stats3 = ['zero', 'one', 'two', 'three', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'twentyOne', 22];
var stats4 = ['zero', 'one', 'two', 'three', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'twentyOne', 22];
var stats5 = ['zero', 'one', 'two', 'three', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'twentyOne', 22];
var stats6 = ['zero', 'one', 'two', 'three', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'twentyOne', 22];
var skills = ['Athletics'/*0 Str*/, 'Acrobatics', 'Sleight of Hand', 'Stealth'/*3 Dex*/, 'Arcana', 'History', 'Investigation', 'Nature', 'Religion'/*8 Int*/, 'Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'/*13 Wis*/, 'Deception', 'Intimidation', 'Performance', 'Persuasion'/*17 Cha*/];
var skillsShort = ['ath', 'acro', 'slight', 'sleight', 'slight of hand', 'hand', 'stel', 'stelth'/*7*/, 'arc', 'hist', 'inv', 'invest'/*11*/, 'nat', 'relig', 'rel', 'reli'/*15*/, 'animal', 'anima', 'ins', 'med', 'percep', 'perc'/*21*/, 'surv', 'decep', 'intim'/*24*/, 'perform', 'perf'/*26*/, 'pers'/*27*/];
var showSkills = ['Athletics', 'Acrobatics', 'Sleight of Hand', 'Stealth', 'Arcana', 'History', 'Nature', 'Religion', 'Animal Handling', 'Medicine', 'Survival', 'Performance'];
client.on('ready', () => {
    console.info(`${client.user.tag} is logged in.`);
  });
 
  client.on('message', msg => {
    if (msg.content === '!test') {
      //console.info('Command recieved.');
      msg.channel.send('Hello World!');
    }
    else if (msg.content === '!end'){
      process.exit();
    }
    else if (msg.content.includes('!roll') && msg.content.includes('d')){
      chnl = msg.channel.id;
      var indx = msg.content.indexOf('d');
      //console.info('numof slice1: ' + msg.content.slice(indx - 1, indx));
      //console.info('numof slice2: ' + msg.content.slice(indx - 2, indx));
      if (msg.content.charAt(indx - 1) == ' '){
        //console.info('Using Slice 1');
        printArray(roll(1, Number(msg.content.slice(indx + 1))));
      }
      else if (msg.content.charAt(indx - 2) == ' '){
        //console.info('Using Slice 2');
        printArray(roll(Number(msg.content.slice(indx - 1, indx)), Number(msg.content.slice(indx + 1))));
      }
      else{
        //console.info('Using Slice 3');
        printArray(roll(Number(msg.content.slice(indx - 2, indx)), Number(msg.content.slice(indx + 1))));
      }
    }
    else if (msg.content.includes('!getStats')){
      console.info('Getting stats....');
      if (msg.content == '!getStats'){
        cUserID = msg.author.id;
      }
      else if (msg.content.includes('!getStatsFor')){
        cUserID = msg.mentions.users.first().id;
      }
      getStats(cUserID);
      
    }
    else if (msg.content === '!heldStats'){
        msg.channel.send(cStats);
    }
    else if (msg.content === '!setStats'){
      console.info('Setting stats....');
      setUser(cUserID);
    }
    else if (msg.content === '!getPartyStats'){
      cUserID = 'HARDCODED_DISCORD_ID_FROM_CLIENT';//player2
      fs.readFile(`./PlayerStats/${cUserID}.txt`, (error, txt_conts) => {
        if(error) {
          throw error;
        }
        statsArray[1] = txt_conts.toString();
      });
      cUserID = 'HARDCODED_DISCORD_ID_FROM_CLIENT';//player3
      fs.readFile(`./PlayerStats/${cUserID}.txt`, (error, txt_conts) => {
        if(error) {
          throw error;
        }
        statsArray[2] = txt_conts.toString();
      });
      cUserID = 'HARDCODED_DISCORD_ID_FROM_CLIENT';//player4
      fs.readFile(`./PlayerStats/${cUserID}.txt`, (error, txt_conts) => {
        if(error) {
          throw error;
        }
        statsArray[3] = txt_conts.toString();
      });
      cUserID = 'HARDCODED_DISCORD_ID_FROM_CLIENT';//player5
      fs.readFile(`./PlayerStats/${cUserID}.txt`, (error, txt_conts) => {
        if(error) {
          throw error;
        }
        statsArray[4] = txt_conts.toString();
      });
    }
    else if (msg.content === '!setPartyStats'){
      for(i=1; i<4; i+=1){
        xDat = statsArray[i];
        tStats = xDat.split('\n');
        if (i == 1){
          stats1 = tStats;
        }
        else if (i == 2){
          stats2 = tStats;
        }
        else if (i == 3){
          stats3 = tStats;
        }
        else if (i == 4){
          stats4 = tStats;
        }
      }
    }
    else if (msg.content.includes('!stats')){
      chnl = msg.channel.id;
      if (msg.content == '!stats'){
        cUserID = msg.author.id;
      }
      else if (msg.content.includes('!statsFor')){
        cUserID = msg.mentions.users.first().id;
      }
      if (msg.content == '!stats' || msg.content.includes('!statsFor')){
        client.channels.cache.get(chnl).send(returnStats(cUserID, 'player', 'display'));
      }

    }
    else if (msg.content.includes('!fullStats')){
      chnl = msg.channel.id;
      if (msg.content == '!fullStats'){
        cUserID = msg.author.id;
      }
      else if (msg.content.includes('!fullStatsFor')){
        cUserID = msg.mentions.users.first().id;
      }
      if (msg.content == '!fullStats' || msg.content.includes('!fullStatsFor')){
        client.channels.cache.get(chnl).send(returnStats(cUserID, 'full', 'display'));
      }
    }
    else if (msg.content.startsWith('!') || (msg.content.startsWith('!') && msg.content.includes('For')) && (msg.content.toLowerCase().includes(skills.toLowerCase()) || msg.content.toLowerCase().includes(skillsShort))){
      if(msg.content.includes('For')){
        cUserID = msg.mentions.users.first().id;
        if(showSkills.includes(determineSkill(msg.content.slice(1, msg.content.indexOf('For'))))){
          chnl = msg.channel.id;
        }
        else{
          chnl = 'HARDCODED_DISCORD_ID_FROM_CLIENT';
          msg.channel.send(`${returnStats(cUserID, 'Name', 'use')} rolled for ${determineSkill(msg.content.slice(1, msg.content.indexOf('For')))}`);
        }
        printArray(skillCheck(determineSkill(msg.content.slice(1, msg.content.indexOf('For')))));
      }
      else{
        cUserID = msg.author.id;
        if(showSkills.includes(determineSkill(msg.content.slice(1, msg.content.length+1)))){
          chnl = msg.channel.id;
        }
        else{
          chnl = 'HARDCODED_DISCORD_ID_FROM_CLIENT';
          msg.channel.send(`${returnStats(cUserID, 'Name', 'use')} rolled for ${determineSkill(msg.content.slice(1, msg.content.length+1))}`);
        }
        printArray(skillCheck(determineSkill(msg.content.slice(1, msg.content.length+1))));
      }
    }
  });

  function printArray(list){
    for (i=0; i<list.length; i += 1){
      client.channels.cache.get(chnl).send(list[i]);
    }
  }

  function roll(numOf, dice){
    //console.info(`numOf: ${numOf}`);
    //console.info(`dice: ${dice}`);
    var list =[];
    yDat = 0;
    for (i = 0, xDat = 0; i < numOf; i += 1) {
      xDat = Math.floor((Math.random() * dice) + 1);
      //client.channels.cache.get(chnl).send(xDat);
      list.push(xDat);
      yDat += xDat;
    }
    //client.channels.cache.get(chnl).send('Rolled: ' + yDat);
    list.push('Rolled: ' + yDat);
    yDat = 0;
    return list;
    
  }

  function determineSkill(str){
    //console.info(`String: ${str}`);
    var skill;
    if (skillsShort.indexOf(str.toLowerCase()) >= 0){
      var indx1 = skillsShort.indexOf(str.toLowerCase());
      if (indx1 == 0){
        skill = skills[0];//athletics
      }
      else if (indx1 == 1){
        skill = skills[1];//acro
      }
      else if (indx1 <= 5){
        skill = skills[2];//sleight of hand
      }
      else if (indx1 <= 7){
        skill = skills[3];//stealth
      }
      else if (indx1 <= 8){
        skill = skills[4];//arcana
      }
      else if (indx1 <= 9){
        skill = skills[5];//hist
      }
      else if (indx1 <= 11){
        skill = skills[6];//invest
      }
      else if (indx1 <= 12){
        skill = skills[7];//nature
      }
      else if (indx1 <= 15){
        skill = skills[8];//religion
      }
      else if (indx1 <= 17){
        skill = skills[9];//animal handling
      }
      else if (indx1 <= 18){
        skill = skills[10];//insight
      }
      else if (indx1 <= 19){
        skill = skills[11];//player1dicine
      }
      else if (indx1 <= 21){
        skill = skills[12];//perception
      }
      else if (indx1 <= 22){
        skill = skills[13];//survival
      }
      else if (indx1 <= 23){
        skill = skills[14];//deception
      }
      else if (indx1 <= 24){
        skill = skills[15];//intimidation
      }
      else if (indx1 <= 26){
        skill = skills[16];//performance
      }
      else if (indx1 <= 27){
        skill = skills[17];//pers
      }
    }
    else{
      for (i=0; i<skills.length; i += 1){
        if(str.toLowerCase() == skills[i].toLowerCase()){
          skill = skills[i];
          break;
        }
      }
    }
    if (skill == undefined){
      console.info(`${str} skill not found`);
      skill = 'N/A';
    }
    //console.info(`Skill: ${skill}`);
    return skill;
  }

  function skillCheck(skill){
    var list = [returnStats(cUserID, 'Name', 'use'), skill];
    var die = Number(roll(1, 20)[0]);
    var indx1 = skills.indexOf(skill);
    var mod;
    if (indx1 == 0){
      mod = returnStats(cUserID, 'str', 'use');
    }
    else if(indx1 <= 3){
      mod = returnStats(cUserID, 'dex', 'use');
    }
    else if(indx1 <= 8){
      mod = returnStats(cUserID, 'int', 'use');
    }
    else if(indx1 <= 13){
      mod = returnStats(cUserID, 'wis', 'use');
    }
    else if(indx1 <= 17){
      mod = returnStats(cUserID, 'cha', 'use');
    }
    var profs = returnStats(cUserID, 'profSkills', 'use');
    if(profs.includes(skill.toLowerCase())){
      list.push(die.toString() + ' + ' + mod + ' + ' + returnStats(cUserID, 'Proficiency Bonus', 'use').toString());
      list.push(Number(die) + Number(mod) + Number(returnStats(cUserID, 'Proficiency Bonus', 'use')));
    }
    else{
      list.push(die.toString() + ' + ' + mod);
      list.push(Number(die) + Number(mod));
    }
    return list;
  }

  function getStats(playerID){
    console.info(`./PlayerStats/${playerID}.txt`);
    fs.readFile(`./PlayerStats/${playerID}.txt`, (error, txt_conts) => {
      if(error) {
        throw error;
      }
      cStats = txt_conts.toString();
      console.info(txt_conts.toString());
      
    });

  }

  function setUser(id){
    var userNum;
    if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player1
      userNum = 0;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player2
      userNum = 1;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player3
      userNum = 2;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player4
      userNum = 3;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player5
      userNum = 4;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player6
      userNum = 5;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player7/dm
      userNum = 6;
    }
    //return userNum;
    statsArray[userNum] = cStats;
    var dat = statsArray[userNum];
    tStats = dat.split('\n');
    for (i = 0; i < 22; i += 1){
      if (i > 3 && i != 21){
        tStats[i] = Number(tStats[i]);
      }
    }
    if (userNum == 0){
      stats0 = tStats;
    }
    else if (userNum == 1){
      stats1 = tStats;
    }
    else if (userNum == 2){
      stats2 = tStats;
    }
    else if (userNum == 3){
      stats3 = tStats;
    }
    else if (userNum == 4){
      stats4 = tStats;
    }
    else if (userNum == 5){
      stats5 = tStats;
    }
    else if (userNum == 6){
      stats6 = tStats;
    }

  }

  function returnStats(id, which, purpose){
    var useStats;
    if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player1
      useStats = stats0;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player2
      useStats = stats1;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player3
      useStats = stats2;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player4
      useStats = stats3;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player5
      useStats = stats4;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player6
      useStats = stats5;
    }
    else if (id == 'HARDCODED_DISCORD_ID_FROM_CLIENT'){//player7/dm
      useStats = stats6;
    }
    var list = [];
    var item;
    if (which == 'player'){
      for (i=0; i < 14; i += 1){
        if (i > 2){
          list.push(statsKey[i] + ': ' + useStats[i].toString());
        }
        else{
          list.push(useStats[i].toString());
        }
      }
      return list;
    }
    else if (which == 'full'){
      for (i=0; i<statsKey.length; i += 1){
        if (i > 2){
          list.push(statsKey[i] + ': ' + useStats[i].toString());
        }
        else{
          list.push(useStats[i].toString());
        }
      }
      return list;
    }
    else{
      console.info(which);
      for (i=0; i<statsKey.length; i += 1){
        if(which.toLowerCase() == statsKey[i].toLowerCase()){
          if(purpose == 'display'){
            item = statsKey[i] + ': ' + useStats[i].toString();
          }
          else{
            item = useStats[i];
          }
          break;
        }
      }
      if (item == undefined){
        item = 'Stat not found';
        console.info('Stat not found');
      }
      return item;
    }
  }

  client.login(token);