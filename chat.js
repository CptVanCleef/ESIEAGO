
const CLIENT_ID = 'IiCERNHxvPvtRAwR';

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getRandomName() {
  const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-room',
    message: value,
  });
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}






var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");

var boardSize = 13;
var border = canvas.width / 10;
var boardWidth = canvas.width - (border * 2);
var boardHeight = canvas.height - (border * 2);

var cellWidth = boardWidth / (boardSize - 1);
var cellHeight = boardHeight / (boardSize - 1);

var lastX;
var lastY;

drawGrid();

function drawGrid()
{	
	var backgroundColor = '#F5DEB3';
	var gridColor = '#8B4513';
	
	context.fillStyle = backgroundColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
	
    context.fillStyle = gridColor;

	for (var i = 0; i < boardSize - 1; i++)
	{
		for (var j = 0; j < boardSize - 1; j++)
		{
			context.fillRect(i * cellWidth + border, j * cellHeight + border, cellWidth - 1, cellHeight - 1);
		}
	}
	
	var quater = Math.floor((boardSize - 1) / 4);
	var markerSize = 8;
	var markerMargin = (markerSize / 2) + 0.5;
	
	context.fillStyle = backgroundColor;
	
	if (!!(boardSize % 2))
	{
		context.fillRect((((boardSize - 1) / 2) * cellWidth) + border - markerMargin, (((boardSize - 1) / 2) * cellWidth) + border - markerMargin, markerSize, markerSize);
	}
	
	context.fillRect((quater * cellWidth) + border - markerMargin, (quater * cellWidth) + border - markerMargin, markerSize, markerSize);
	context.fillRect((((boardSize - 1) - quater) * cellWidth) + border - markerMargin, (quater * cellWidth) + border - markerMargin, markerSize, markerSize);
	
	context.fillRect((((boardSize - 1) - quater) * cellWidth) + border - markerMargin, (((boardSize - 1) - quater) * cellWidth) + border - markerMargin, markerSize, markerSize);
	context.fillRect((quater * cellWidth) + border - markerMargin, (((boardSize - 1) - quater) * cellWidth) + border - markerMargin, markerSize, markerSize);
	
	var size = canvas.width / 40;
	var textSpacing = 10;
	context.fillStyle = '#000000';
    context.font = size + "px Arial";
	
	for (i = 0; i < boardSize; i++)
	{
		context.fillText((i + 1), textSpacing, ((canvas.height - border) - (i * cellHeight)) + (size / 3));
		context.fillText((i + 1), canvas.width - (size + textSpacing), ((canvas.height - border) - (i * cellHeight)) + (size / 3));	

		context.fillText((String.fromCharCode(97 + i)), (border + (i * cellHeight) + (size / 3)) - (size / 1.5), textSpacing + size);		
		context.fillText((String.fromCharCode(97 + i)), (border + (i * cellHeight) + (size / 3)) - (size / 1.5), canvas.height - (textSpacing * 2));
	}
}

canvas.addEventListener('mousemove', function(evt) 
{
	var position = getGridPoint(evt);
	
	if ((position.x != lastX) || (position.y != lastY))
	{
		drawGrid();

		if (((position.x >=0) && (position.x < boardSize)) && ((position.y >=0) && (position.y < boardSize)))
		{
					placeStone((position.x * cellWidth) + border, (position.y * cellWidth) + border, 'rgba(0, 0, 0, 0.2)');					
		}
	}
	
	lastX = position.x;
	lastY = position.y;		
});

function placeStone(x, y, color)
{
	var radius = cellWidth / 2;
	
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;	
	context.fill();
	context.lineWidth = 5;
}

function getGridPoint(evt)
{
	var rect = canvas.getBoundingClientRect();
		
	var x = Math.round((evt.clientX-border-rect.left)/(rect.right-2*border-rect.left)* boardWidth);
	var y = Math.round((evt.clientY-border-rect.top)/(rect.bottom-2*border-rect.top)* boardHeight);
	
	var roundX = Math.round(x / cellWidth);
	var roundY = Math.round(y / cellHeight);
	
	return {
	  x: roundX,
	  y: roundY
	};
}