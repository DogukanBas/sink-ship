let firstFieldArray =[]
let secondFieldArray = [];
let inventory = [];
let gameObject = {};
let serverUrl = 'https://www2.hs-esslingen.de/~melcher/internet-technologien/sinkship/?request=';


class SinkShip {
  constructor() {
    
    
    window.addEventListener('load', () => {
      this.initMethod();
    });
  }
  
   initMethod() {
    document.body.appendChild(this.makeHeader());
    document.body.appendChild(this.makeMain());
    document.body.appendChild(this.makeFooter());
    this.buildInventory();
    this.updateScreen();
  }

   makeHeader() {
    
    const header = document.createElement('header');
    
    
    const limiter = this.createLimiter();
    header.appendChild(limiter);

    const headLine = document.createElement('h1');
    headLine.textContent = 'Sink Ship';
    limiter.appendChild(headLine);
    
    const paragraph = document.createElement('p');
    
    paragraph.textContent = 'Doğukan Baş';
    
    
    limiter.appendChild(paragraph);

    return header;
  }

   makeMain() {
    
    const main = document.createElement('main');
    
    const limiter = this.createLimiter();
    
    main.appendChild(limiter);
    
    const controls = this.makeControls();
    
    const fields = this.createDiv('fields');
    
    
    
    limiter.appendChild(controls);
    limiter.appendChild(fields);
    const { field: firstField, array: innerTempArr } =this.createField('player-field');
    fields.appendChild(firstField);
    const { field: secondField, array: innerTempArr2 } = this.makebuildMenu();
    secondFieldArray = innerTempArr2;
    firstFieldArray = innerTempArr;
    fields.appendChild(secondField);
    this.placeFieldsHandler();
    return main;
  }

   createDiv(className) {
    const div = document.createElement('div');
    div.classList.add(className);
    return div;
  }

   makeFooter() {
    const footer = document.createElement('footer');
    const limiter = this.createLimiter();
    footer.appendChild(limiter);
    
    const paragraph = document.createElement('p');
    
    paragraph.innerHTML = '&copy; By Doğukan Baş';
    limiter.appendChild(paragraph);
    return footer;
  }

   createLimiter() {
    const limiter = document.createElement('div');
    limiter.classList.add('limiter');
    return limiter;
  }

   createField(id) {
    const benimTemp=[0];

    for (let x = 0; x < 10; x++) {
      benimTemp[x] = [];
      for (let y = 0; y < 10; y++) {
        benimTemp[x][y] = 0;
      }
    }

    const field = this.createDiv('field');
    field.setAttribute('id', id);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = this.createDiv('cell');
        benimTemp[i][j] = cell;
        field.appendChild(cell);
      }
    }

    return { field: field, array: benimTemp };
  }

   launch() {
    firstFieldArray[1][1].classList.add('left');
    firstFieldArray[1][2].classList.add('horizontal');
    firstFieldArray[1][3].classList.add('horizontal');

    firstFieldArray[1][4].classList.add('right');
  }

   makeControls() {
    const controls = this.createDiv('controls');
    const buildButtonVar = this.makeButton('Build', 'btn-build');
    const myDebug = this.createDiv('debug-info');
    const myParagraph = document.createElement('p');
    myDebug.appendChild(myParagraph);
    
    buildButtonVar.addEventListener('click', () => {this.buildButtonHandler();});

    const playButtonVar = this.makeButton('Play', 'btn-play');
    
    playButtonVar.addEventListener('click', () => {
      this.playButtonHandler();
    });
    playButtonVar.disabled = true;

    const autoPlaceButtonVar = this.makeButton('Auto Place', 'btn-controlplace');
    autoPlaceButtonVar.addEventListener('click', () => {
      this.controlButtonHandler();
    });

    controls.appendChild(buildButtonVar);
    controls.appendChild(autoPlaceButtonVar);
    controls.appendChild(playButtonVar);
    controls.appendChild(myDebug);
    return controls;
  }

   makeButton(label, id) {
    const button = document.createElement('button');
    button.setAttribute('id', id);
    button.innerText = label;
    return button;
  }

   makebuildMenu() {
    const bosArray=[];
    const field = this.createDiv('field');
    field.setAttribute('id', 'server-field');
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tabelRow = document.createElement('tr');
    tabelRow.appendChild(this.maketableHeader('Number'));
    tabelRow.appendChild(this.maketableHeader(' '));
    tabelRow.appendChild(this.maketableHeader(' '));
    tabelRow.appendChild(this.maketableHeader('Type'));
    tabelRow.appendChild(this.maketableHeader('Size'));

    tableHead.appendChild(tabelRow);
    table.appendChild(tableHead);

    const tableBody = document.createElement('tbody');
    tableBody.appendChild(
    this.makeTableRow('1',['battleship', 'battleship-h', 'selectable', 'myImage'],['battleship', 'battleship-v', 'selectable', 'myImage'],'battleship',5));
    tableBody.appendChild(this.makeTableRow('2',['cruiser', 'cruiser-h', 'selectable', 'myImage'],['cruiser', 'cruiser-v', 'selectable', 'myImage'],'cruiser',4));
    tableBody.appendChild(
    this.makeTableRow('3',['destroyer', 'destroyer-h', 'selectable', 'myImage'],['destroyer', 'destroyer-v', 'selectable', 'myImage'],'destroyer',3));
    tableBody.appendChild(
    this.makeTableRow('4',['submarine', 'submarine-h', 'selectable', 'myImage'],['submarine', 'submarine-v', 'selectable', 'myImage'],'submarine',2));
    table.appendChild(tableBody);
    field.appendChild(table);
  
    return { field: field, array: bosArray };
  }

   maketableHeader(x) {
    const tableHeader = document.createElement('th');
    tableHeader.innerHTML = x;
    return tableHeader;
  }

   makeTableData(x) {
    const tableHeader = document.createElement('td');
    tableHeader.innerHTML = x;
    
    return tableHeader;
  }

   makeTableRow(number, classes1, classes2, name, size) {
    const tableRow = document.createElement('tr');
    const tableCol2 = document.createElement('td');
    const tableCol3 = document.createElement('td');
    for (let class1 of classes1) {
      tableCol2.classList.add(class1);
    }for (let class2 of classes2) {
      tableCol3.classList.add(class2);
    }
    tableCol2.addEventListener('click', () => {
      this.handleBuildClick(name, size, 'h');
    });
    tableCol3.addEventListener('click', () => {
      this.handleBuildClick(name, size, 'v');
    });
    tableRow.appendChild(this.makeTableData(number));
    tableRow.appendChild(tableCol2);
    tableRow.appendChild(tableCol3);
    tableRow.appendChild(this.makeTableData(name));
    tableRow.appendChild(this.makeTableData(size));

    return tableRow;
  }

   handleBuildClick(type, size, direction) {
    const ship = this.getNextFreeShip(type, size);
    if (ship !== null) {
      gameObject.direction = direction;

    this.showUsablePosition(size, direction);

    }
    
    else{
      this.disablePositions();
      return false
    }
  }

   showUsablePosition(size, direction) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        firstFieldArray[x][y].classList.remove('usable');
        firstFieldArray[x][y].classList.remove('disabled');
        
        if (this.isPlaceable(x, y, size, direction)) {
          firstFieldArray[x][y].classList.add('usable');
        } else {
          firstFieldArray[x][y].classList.add('disabled');
        }
      }
    }  this.relaxField();
  }

   isPlaceable(x, y, size, direction) {
    if (direction === 'h') {
      if (y + size > 10) {
        return false;
      }
      for (let i = 0; i < size; i++) {
        if (
          this.checkCssClass(firstFieldArray[x][y + i], [
            'left',
            'right',
            'top',
            'bottom',
            'horizontal',
            'vertical',
            'disabled',
          ])
        ) {
          return false;
        }
      }
    } else {
      if (x + size > 10) {
        return false;
      }
      for (let i = 0; i < size; i++) {
        if (
          this.checkCssClass(firstFieldArray[x + i][y], [
            'left',
            'right',
            'top',
            'bottom',
            'horizontal',
            'vertical',
            'disabled',
          ])
        ) {
          return false;
        }
      }
    }

    return true;
  }

   placeFieldsHandler() {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        firstFieldArray[x][y].addEventListener('click', () => {
          this.placeShip(x, y);
        });
      }
    }
  }

   placeShip(x, y) {
    if (firstFieldArray[x][y].classList.contains('disabled')) {
      return false;
    }
    if (this.isEmpty(gameObject)) {
      
      const removedShip = this.findShipEdge(x, y);
      if (removedShip !== null) {
        this.removeShip(x, y, removedShip);
        this.updateScreen();
        return false;
      }
    }
    if (!this.isEmpty(gameObject)) {
      this.drawShip(x, y);
    }
    this.updateScreen();
  }

   buildInventory() {
    inventory = [];
    inventory.push({
      type: 'battleship',
      size: 5,
      placed: false,
      
    });

    inventory.push({
      type: 'cruiser',
      size: 4,
      placed: false,
      
    });
    inventory.push({
      type: 'cruiser',
      size: 4,
      placed: false,
      
    });

    inventory.push({
      type: 'destroyer',
      size: 3,
      placed: false,
    
    });
    inventory.push({
      type: 'destroyer',
      size: 3,
      placed: false,
    
    });
    inventory.push({
      type: 'destroyer',
      size: 3,
      placed: false,
    
    });

    inventory.push({
      type: 'submarine',
      size: 2,
      placed: false,

    });
    inventory.push({
      type: 'submarine',
      size: 2,
      placed: false,

    });
    inventory.push({
      type: 'submarine',
      size: 2,
      placed: false,

    });
    inventory.push({
      type: 'submarine',
      size: 2,
      placed: false,

    });
  }

   getNextFreeShip(type, size) {
    for (let ship of inventory) {
      if (ship.placed === false && ship.type === type && ship.size === size) {
        

        gameObject.ship = ship;
        return ship;
      }
    }

    return null;
  }

   disablePositions() {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        firstFieldArray[x][y].classList.remove('usable');
        firstFieldArray[x][y].classList.add('disabled');
      }
    }
  }

   drawShip(x, y) {
    const tmpArray = [];

    if (gameObject.direction === 'h') {
      firstFieldArray[x][y].classList.add('left');
      firstFieldArray[x][y].classList.remove('disabled');
      firstFieldArray[x][y + gameObject.ship.size - 1].classList.add('right');
      firstFieldArray[x][y + gameObject.ship.size - 1].classList.remove(
        'disabled'
      );
      tmpArray.push({ x: x, y: y, isHit: false });
      tmpArray.push({ x: x, y: y + gameObject.ship.size - 1, isHit: false });
      for (let i = 1; i < gameObject.ship.size - 1; i++) {
        firstFieldArray[x][y + i].classList.add('horizontal');
        firstFieldArray[x][y + i].classList.remove('disabled');
        tmpArray.push({ x: x, y: y + i, isHit: false });
      }
    } else {
      firstFieldArray[x][y].classList.add('top');
      firstFieldArray[x][y].classList.remove('disabled');

      firstFieldArray[x + gameObject.ship.size - 1][y].classList.add('bottom');
      firstFieldArray[x + gameObject.ship.size - 1][y].classList.remove(
        'disabled'
      );
      tmpArray.push({ x: x, y: y, isHit: false });
      tmpArray.push({ x: x + gameObject.ship.size - 1, y: y, isHit: false });
      for (let i = 1; i < gameObject.ship.size - 1; i++) {
        firstFieldArray[x + i][y].classList.add('vertical');
        firstFieldArray[x + i][y].classList.remove('disabled');
        tmpArray.push({ x: x + i, y: y, isHit: false });
      }
    }
    gameObject.ship.placed = true;
    gameObject.ship.dimensions = tmpArray;

    gameObject = {};

    this.updateScreen();
  }

   isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

   checkCssClass(element, classes) {
    for (let class1 of classes) {
      if (element.classList.contains(class1)) {
        return true;
      }
    }
    return false;
  }
   updateScreen() {
  
    this.fillWater();
    this.clearFields();
    this.remainingShips();
    this.updatePlayButton();
  }

   remainingShips() {
    for (let aBattleShip of inventory) {
      const battleshipMarkers = document.querySelectorAll(
        '#server-field ' + '.' + aBattleShip.type
      );
      if (!this.countShip(aBattleShip.size)) {
        for (let marker of battleshipMarkers) {
          marker.classList.remove('selectable');
          marker.classList.add('disabled');
        }
      } else {
        for (let marker of battleshipMarkers) {
          marker.classList.remove('disabled');
          marker.classList.add('selectable');
        }
      }
    }
  }

   countShip(size) {
    for (let ship of inventory) {
      if (ship.size === size && ship.placed === false) {
        return true;
      }
    }
    return false;
  }

   clearFields() {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        firstFieldArray[x][y].classList.remove('disabled');
        firstFieldArray[x][y].classList.remove('usable');
      }
    }
  }

   findShipEdge(x, y) {
    for (let aShip of inventory) {
      if (aShip.placed) {
        for (let aDimension of aShip.dimensions) {
          if (aDimension.x === x && aDimension.y === y) {
            return aShip;
          }
        }
      }
    }
    return null;
  }

   removeShip(x, y, ship) {
    for (let aDimension of ship.dimensions) {
      firstFieldArray[aDimension.x][aDimension.y].classList.remove('left');
      firstFieldArray[aDimension.x][aDimension.y].classList.remove('right');
      firstFieldArray[aDimension.x][aDimension.y].classList.remove('top');
      firstFieldArray[aDimension.x][aDimension.y].classList.remove('bottom');
      firstFieldArray[aDimension.x][aDimension.y].classList.remove('horizontal');
      firstFieldArray[aDimension.x][aDimension.y].classList.remove('vertical');
    }
    ship.placed = false;
    ship.dimenstions = [];
    
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        firstFieldArray[x][y].classList.remove('water');
      }
    }

    
    this.updateScreen();
  }
   updatePlayButton() {
    for (let ship of inventory) {
      if (ship.placed === false) {
        document.getElementById('btn-play').disabled = true;
        return;
      }
    }
    document.getElementById('btn-play').disabled = false;
  }

  async  playButtonHandler() {
    const secondField = this.createField('server-field');
    secondFieldArray = secondField.array;
    document.getElementById('server-field').replaceWith(secondField.field);
  
    this.ableBattleField(false);


    const token = await this.sendStart();



    await this.battleFieldPlacementHandler(token);
  }

   buildButtonHandler() {
    const secondField = this.makebuildMenu();
    secondFieldArray = secondField.array;
    document.getElementById('server-field').replaceWith(secondField.field);

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        firstFieldArray[x][y].classList = ['cell'];
      }
    }
    this.buildInventory();
    gameObject = {};
    this.updateScreen();
  }

   controlButtonHandler() {
    const secondField = this.makebuildMenu();
    secondFieldArray = secondField.array;
    document.getElementById('server-field').replaceWith(secondField.field);

    this.clearInventory();
    this.routinePlaceNextShips();
  }

   nextAnyship() {
    for (let aShip of inventory) {
      if (aShip.placed === false) {
        return aShip;
      }
    }
    return null;
  }

   routinePlaceNextShips() {
    
    const nextShip = this.nextAnyship();

    if (nextShip === null) {
      this.disablePositions();
      return true;
    }
   

    const x = Math.floor(Math.random() * 10);

    const y = Math.floor(Math.random() * 10);

    const directioncalc = Math.floor(Math.random() * 2);
    if (directioncalc === 0) {
      var direction = 'h';
    } 
    else {
      var direction = 'v';
    }

    this.relaxField();
    if (!this.isPlaceable(x, y, nextShip.size, direction)) {
      return this.routinePlaceNextShips();
    }

    gameObject.ship = nextShip;

    gameObject.direction = direction;
    gameObject.x = x;
    gameObject.y = y;
    gameObject.ship.placed = true;

    this.placeShip(x, y);
    return this.routinePlaceNextShips();
  }

   clearInventory() {
    this.buildButtonHandler();
  }

   fillWater() {
      if (this.nextAnyship() !== null) {
      return false;
    }
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (firstFieldArray[x][y].classList.length === 1) {
          firstFieldArray[x][y].classList.add('water');
        }
      }
    }
  }


   ableBattleField(booleanValue) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (!booleanValue) {
          secondFieldArray[x][y].classList.add('disabled');
        } else {
          secondFieldArray[x][y].classList.remove('disabled');
        }
      }
    }
  }

  
 
  async  sendStart() {
    

    const response = await fetch(serverUrl + 'start&userid=dobait01', {
      method: 'GET',
    });

    this.ableBattleField(true);

    

    const responseData = await response.json();
    this.debugWriter(responseData.statusText);
    const accessToken = responseData.token;

    return accessToken;
  }

  async  battleFieldPlacementHandler(token) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        secondFieldArray[x][y].addEventListener('click', async () => {
          await this.handleShoot(x, y, token);
        });
      }
    }
  }
  async  handleShoot(x, y, token) {
    if (secondFieldArray[x][y].classList.contains('disabled')) {
      return;
    }
    this.ableBattleField(false);
    await this.sendShoot(x, y, token);
    this.ableBattleField(true);
  }

  async  sendShoot(x, y, token) {
    secondFieldArray[x][y].classList.add('shotat');
    const query = serverUrl + 'shoot&x=' + x + '&y=' + y + '&token=' + token;
    const response = await fetch(query, {
      method: 'POST',
    });
    const responseData = await response.json();
    this.debugWriter(responseData.statusText);

    secondFieldArray[x][y].classList.remove('shotat');
    const state = responseData.state;
    if (state === 1) {
      secondFieldArray[x][y].classList.add('ship-part');
    } else {
      secondFieldArray[x][y].classList.add('definite-water');
    }
    if (responseData.result === 2) {

      this.markIt(secondFieldArray, x, y, responseData.result);
    }

    if (state === 2) {
      const [x, y] = await this.sendGetShotCoordinates(token);
      const resultoffindHit = await this.findHit(x, y);
      this.markIt(firstFieldArray, x, y, resultoffindHit);
      await this.sendResult(resultoffindHit, token);
    } else if (state === 4) {
      await this.showWinner(responseData.winner);
    }
  }

   markIt(field, x, y, result) {
    if (result === 0) {
      field[x][y].classList.add('hit-water');
    } else if (result === 1) {
      field[x][y].classList.add('hit-ship');
    } else if (result === 2) {
      field[x][y].classList.add('sunk-ship');
    }
  }

  async  sendResult(result, token) {
    const query =
      serverUrl + 'sendingresult&result=' + result + '&token=' + token;
    const response = await fetch(query, {
      method: 'POST',
    });
    const responseData = await response.json();
    this.debugWriter(responseData.statusText);

    const state = responseData.state;

    if (state === 2) {
      const [x, y] = await this.sendGetShotCoordinates(token);
      const resultoffindHit = await this.findHit(x, y);
      this.markIt(firstFieldArray, x, y, resultoffindHit);
      await this.sendResult(resultoffindHit, token);
    } else if (state === 4) {
      await this.showWinner(responseData.winner);
    }
  }
  replayButtonHandler() {
    location.reload();
    this.initMethod();
  }
  async  showWinner(winner) {
    
    const winnerDiv = document.createElement('div');
    const centeredInsideDiv = document.createElement('div');
    const winnerText = document.createElement('h1');
    const replayButton = this.makeButton('button');
    replayButton.classList.add('replay-button');
    replayButton.textContent = 'Replay';
    replayButton.addEventListener('click', () => {
      this.replayButtonHandler();
    });
    

    winnerText.textContent = winner + ' WINS!';

    centeredInsideDiv.appendChild(winnerText);
    centeredInsideDiv.appendChild(replayButton);
    winnerDiv.appendChild(centeredInsideDiv);

    document.body.appendChild(winnerDiv);

    winnerDiv.classList.add('winner-overlay');

    centeredInsideDiv.classList.add('winner-box');

    winnerText.classList.add('winner-text');

    document.body.classList.add('winner-body');
  }

  async  findHit(xShot, yShot) {
    if (this.findShipEdge(xShot, yShot) === null) return 0;
  
    let control = 1;
    for (let ship of inventory) {
      for (let dimension of ship.dimensions) {
        if (dimension.x === xShot && dimension.y === yShot) {
  
          dimension.isHit = true;
          control = 0;
          break;
        }
      }
      if (control === 0) {
        for (let dimension of ship.dimensions) {
          if (dimension.isHit === false) {
            return 1;
          }
        }
        return 2;
  
      }
    }
  }

  async sendGetShotCoordinates(token) {
    const query = serverUrl + 'getshotcoordinates' + '&token=' + token;

    const response = await fetch(query, {
      method: 'GET',
    });
    const responseData = await response.json();
    this.debugWriter(responseData.statusText);
    
    return [responseData.x, responseData.y];
  }

   relaxField() {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (firstFieldArray[x][y].classList.contains('left')) {
          if (y !== 0) {
            firstFieldArray[x][y - 1].classList.add('disabled');
          }
          if (x !== 0) {
            firstFieldArray[x - 1][y].classList.add('disabled');
          }
          if (x !== 9) {
            firstFieldArray[x + 1][y].classList.add('disabled');
        
        
        
          }
        }
        if (firstFieldArray[x][y].classList.contains('right')) {
        
          if (y !== 9) {
        
            firstFieldArray[x][y + 1].classList.add('disabled');
        
          }
          if (x !== 0) {
            firstFieldArray[x - 1][y].classList.add('disabled');
          }
          if (x !== 9) {
            firstFieldArray[x + 1][y].classList.add('disabled');
          }
        }
        if (firstFieldArray[x][y].classList.contains('top')) {
          if (x !== 0) {
            firstFieldArray[x - 1][y].classList.add('disabled');
          }
        
          if (y !== 0) {
            firstFieldArray[x][y - 1].classList.add('disabled');
          }
          if (y !== 9) {
            firstFieldArray[x][y + 1].classList.add('disabled');
          }
        }
        if (firstFieldArray[x][y].classList.contains('bottom')) {
          if (x !== 9) {
            firstFieldArray[x + 1][y].classList.add('disabled');
          }
          if (y !== 0) {
            firstFieldArray[x][y - 1].classList.add('disabled');
          }
          if (y !== 9) {
            firstFieldArray[x][y + 1].classList.add('disabled');
          }
        }
        if (firstFieldArray[x][y].classList.contains('horizontal') && x !== 0) {
          firstFieldArray[x - 1][y].classList.add('disabled');
        }
        if (firstFieldArray[x][y].classList.contains('horizontal') && x !== 9) {
          firstFieldArray[x + 1][y].classList.add('disabled');
        }
        if (firstFieldArray[x][y].classList.contains('vertical') && y !== 0) {
          firstFieldArray[x][y - 1].classList.add('disabled');
        }
        if (firstFieldArray[x][y].classList.contains('vertical') && y !== 9) {
          firstFieldArray[x][y + 1].classList.add('disabled');
        }
      }
    }
  }

   debugWriter(string) {
    var debugInfoElement = document.querySelector('.debug-info');
    var paragraphTag = debugInfoElement.querySelector('p');
    paragraphTag.innerHTML = string;
  }

 }


 const game = new SinkShip();
  //game.this.initMethod();
