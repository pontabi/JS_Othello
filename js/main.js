'use strict';

{
  class Board {
    constructor() {
      this.board = document.getElementById('board');
      this.cellsProps = this.setInitialEl();
      this.setState();
    }
    
    createEl() {
      const div = document.createElement('div');
      div.classList.add('cell');
      return div;
    }

    setInitialEl() {
      const arr = [];
      for(let i=0; i<8; i++) {
        arr[i] = [];
        for(let j=0; j<8; j++) {
          arr[i][j] = {};
          const el = this.createEl();
          arr[i][j].el = el;
        }
      }
      return arr;
    }

    setState() {
      for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
          this.cellsProps[i][j].state = 'vacant';
        }
      }
    }

    setProp(row, col, color) {
      this.cellsProps[row][col].el.textContent = '●';
      this.cellsProps[row][col].el.classList.add(color);
      this.cellsProps[row][col].state = color;
    }

    render() {
      for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
          this.board.appendChild(this.cellsProps[i][j].el);
        }
      }
    }

    resetPuttableCells() {
      for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
          this.cellsProps[i][j].el.classList.remove('puttable');
        }
      }
    }

    setPuttableCells(x, y) {
      this.cellsProps[y][x].el.classList.add('puttable');
    }

    isOutside(x, y) {
      if(x<0 || y<0 || x>7 || y>7){
        return true;
      }else {
        return false;
      }
    }

    getEl(x, y) {
      return this.cellsProps[y][x].el;
    }

    getState(x, y) {
      if(this.isOutside(x,y)){
        return '';
      }
      return this.cellsProps[y][x].state;
    }

    getIsPuttable(x, y) {
      return this.cellsProps[y][x].isPuttable;
    }

    putOthello(x, y, playerColor) {
      this.cellsProps[y][x].el.textContent = '●';
      this.cellsProps[y][x].state = playerColor;
      this.cellsProps[y][x].el.classList.add(playerColor);
    }

    setIsPuttable(puttableCells) {
      this.cellsProps.forEach(rowCells => {
        rowCells.forEach(cell => {
          cell.isPuttable = false;
        });
      });
      puttableCells.forEach(cell => {
        this.cellsProps[cell.y][cell.x].isPuttable = true;
      }); 
    }

    reversi(x, y, playerColor, players) {
      if(players.judegeUpperLeft(x, y, playerColor)) {
        this.turnUpperLeft(x, y, playerColor, players);
      }
      if(players.judegeUpper(x, y, playerColor)) {
        this.turnUpper(x, y, playerColor, players);
      }
      if(players.judegeUpperRight(x, y, playerColor)) {
        this.turnUpperRight(x, y, playerColor, players);
      }
      if(players.judegeRight(x, y, playerColor)) {
        this.turnRight(x, y, playerColor, players);
      }
      if(players.judegeLowerRight(x, y, playerColor)) {
        this.turnLowerRight(x, y, playerColor, players);
      }
      if(players.judegeLower(x, y, playerColor)) {
        this.turnLower(x, y, playerColor, players);
      }
      if(players.judegeLowerLeft(x, y, playerColor)) {
        this.turnLowerLeft(x, y, playerColor, players);
      }
      if(players.judegeLeft(x, y, playerColor)) {
        this.turnLeft(x, y, playerColor, players);
      }
    }

    turnUpperLeft(x, y, playerColor, players) {
      x--;
      y--;
      const opponentColor = players.toggleColor(playerColor);
      while(this.cellsProps[y][x].state === opponentColor) {
        this.cellsProps[y][x].state = playerColor;
        this.cellsProps[y][x].el.classList.remove(opponentColor);
        this.cellsProps[y][x].el.classList.add(playerColor);
        x--;
        y--;
      }
    }

    turnUpper(x, y, playerColor, players) {
      y--;
      const opponentColor = players.toggleColor(playerColor);
      while(this.cellsProps[y][x].state === opponentColor) {
        this.cellsProps[y][x].state = playerColor;
        this.cellsProps[y][x].el.classList.remove(opponentColor);
        this.cellsProps[y][x].el.classList.add(playerColor);
        y--;
      }
    }

    turnUpperRight(x, y, playerColor, players) {
      x++;
      y--;
      const opponentColor = players.toggleColor(playerColor);
      while(this.cellsProps[y][x].state === opponentColor) {
        this.cellsProps[y][x].state = playerColor;
        this.cellsProps[y][x].el.classList.remove(opponentColor);
        this.cellsProps[y][x].el.classList.add(playerColor);
        x++;
        y--;
      }
    }

    turnRight(x, y, playerColor, players) {
      x++;
      const opponentColor = players.toggleColor(playerColor);
      while(this.cellsProps[y][x].state === opponentColor) {
        this.cellsProps[y][x].state = playerColor;
        this.cellsProps[y][x].el.classList.remove(opponentColor);
        this.cellsProps[y][x].el.classList.add(playerColor);
        x++;
      }
    }

    turnLowerRight(x, y, playerColor, players) {
      x++;
      y++;
      const opponentColor = players.toggleColor(playerColor);
      while(this.cellsProps[y][x].state === opponentColor) {
        this.cellsProps[y][x].state = playerColor;
        this.cellsProps[y][x].el.classList.remove(opponentColor);
        this.cellsProps[y][x].el.classList.add(playerColor);
        x++;
        y++;
      }
    }

    turnLower(x, y, playerColor, players) {
      y++;
      const opponentColor = players.toggleColor(playerColor);
      while(this.cellsProps[y][x].state === opponentColor) {
        this.cellsProps[y][x].state = playerColor;
        this.cellsProps[y][x].el.classList.remove(opponentColor);
        this.cellsProps[y][x].el.classList.add(playerColor);
        y++;
      }
    }

    turnLowerLeft(x, y, playerColor, players) {
      x--;
      y++;
      const opponentColor = players.toggleColor(playerColor);
      while(this.cellsProps[y][x].state === opponentColor) {
        this.cellsProps[y][x].state = playerColor;
        this.cellsProps[y][x].el.classList.remove(opponentColor);
        this.cellsProps[y][x].el.classList.add(playerColor);
        x--;
        y++;
      }
    }

    turnLeft(x, y, playerColor, players) {
      x--;
      const opponentColor = players.toggleColor(playerColor);
      while(this.cellsProps[y][x].state === opponentColor) {
        this.cellsProps[y][x].state = playerColor;
        this.cellsProps[y][x].el.classList.remove(opponentColor);
        this.cellsProps[y][x].el.classList.add(playerColor);
        x--;
      }
    }

  }

  class Players {
    constructor(board) {
      this.board = board;
      this.p1 = {
        // isPuttable: [],
        color: 'white',
        tatalPoint: 2,
      };
      this.p2 = {
        // isPuttable: [],
        color: 'black',
        tatalPoint: 2,
      };
      
    }

    getPuttableCells(playerColor) {
      const puttableCells = [];
      let count = 0;
      for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
          if(this.isPuttable(j, i, playerColor)){
            puttableCells[count] = {x:j, y:i};
            count++;
          }
        }
      }
      return puttableCells;
    }

    isPuttable(x, y, playerColor) {
      if(this.board.getState(x,y) !== 'vacant') {
        return false;
      }
      if(this.judegeUpperLeft(x, y, playerColor)) {
        return true;
      }else if(this.judegeUpper(x, y, playerColor)) {
        return true;
      }else if(this.judegeUpperRight(x, y, playerColor)) {
        return true;
      }else if(this.judegeRight(x, y, playerColor)) {
        return true;
      }else if(this.judegeLowerRight(x, y, playerColor)) {
        return true;
      }else if(this.judegeLower(x, y, playerColor)) {
        return true;
      }else if(this.judegeLowerLeft(x, y, playerColor)) {
        return true;
      }else if(this.judegeLeft(x, y, playerColor)) {
        return true;
      }
      return false;
    }

    toggleColor(color) {
      if(color === 'white') {
        return 'black';
      }else {
        return 'white';
      }
    }
    
    // 左上方向の判定
    judegeUpperLeft(x, y, playerColor) {
      const opponentColor = this.toggleColor(playerColor);
      let upperLeftX = x - 1;
      let upperLeftY = y - 1;
      if(!(this.board.isOutside(upperLeftX, upperLeftY) || this.board.getState(upperLeftX, upperLeftY) === playerColor)) {
        while(this.board.getState(upperLeftX, upperLeftY) === opponentColor) {
          if(this.board.isOutside(upperLeftX, upperLeftY)) {
            break;
          }

          upperLeftX--;
          upperLeftY--;
        }
        if(this.board.getState(upperLeftX, upperLeftY) === playerColor){
          return true;
        }
      }
      return false;
    }
    
    // 上方向の判定
    judegeUpper(x, y, playerColor) {
      const opponentColor = this.toggleColor(playerColor);
      let upperX = x;
      let upperY = y - 1;
      if(!(this.board.isOutside(upperX, upperY) || this.board.getState(upperX, upperY) === playerColor)) {
        while(this.board.getState(upperX, upperY) === opponentColor) {
          if(this.board.isOutside(upperX, upperY)) {
            break;
          }

          upperY--;
        }
        if(this.board.getState(upperX, upperY) === playerColor){
          return true;
        }
      }
      return false;
    }

    // 右上方向の判定
    judegeUpperRight(x, y, playerColor) {
      const opponentColor = this.toggleColor(playerColor);
      let upperRightX = x + 1;
      let upperRightY = y - 1;
      if(!(this.board.isOutside(upperRightX, upperRightY) || this.board.getState(upperRightX, upperRightY) === playerColor)) {
        while(this.board.getState(upperRightX, upperRightY) === opponentColor) {
          if(this.board.isOutside(upperRightX, upperRightY)) {
            break;
          }

          upperRightX++;
          upperRightY--;
        }
        if(this.board.getState(upperRightX, upperRightY) === playerColor){
          return true;
        }
      }
      return false;
    }

    // 右方向の判定
    judegeRight(x, y, playerColor) {
      const opponentColor = this.toggleColor(playerColor);
      let rightX = x + 1;
      let rightY = y;
      if(!(this.board.isOutside(rightX, rightY) || this.board.getState(rightX, rightY) === playerColor)) {
        while(this.board.getState(rightX, rightY) === opponentColor) {
          if(this.board.isOutside(rightX, rightY)) {
            break;
          }

          rightX++;
        }
        if(this.board.getState(rightX, rightY) === playerColor){
          return true;
        }
      }
      return false;
    }

    // 右下方向の判定
    judegeLowerRight(x, y, playerColor) {
      const opponentColor = this.toggleColor(playerColor);
      let lowerRightX = x + 1;
      let lowerRightY = y + 1;
      if(!(this.board.isOutside(lowerRightX, lowerRightY) || this.board.getState(lowerRightX, lowerRightY) === playerColor)) {
        while(this.board.getState(lowerRightX, lowerRightY) === opponentColor) {
          if(this.board.isOutside(lowerRightX, lowerRightY)) {
            break;
          }

          lowerRightX++;
          lowerRightY++;
        }
        if(this.board.getState(lowerRightX, lowerRightY) === playerColor){
          return true;
        }
      }
      return false;
    }
    // 下方向の判定
    judegeLower(x, y, playerColor) {
      const opponentColor = this.toggleColor(playerColor);
      let lowerX = x;
      let lowerY = y + 1;
      if(!(this.board.isOutside(lowerX, lowerY) || this.board.getState(lowerX, lowerY) === playerColor)) {
        while(this.board.getState(lowerX, lowerY) === opponentColor) {
          if(this.board.isOutside(lowerX, lowerY)) {
            break;
          }

          lowerY++;
        }
        if(this.board.getState(lowerX, lowerY) === playerColor){
          return true;
        }
      }
      return false;
    }

    // 左下方向の判定
    judegeLowerLeft(x, y, playerColor) {
      const opponentColor = this.toggleColor(playerColor);
      let lowerLeftX = x - 1;
      let lowerLeftY = y + 1;
      if(!(this.board.isOutside(lowerLeftX, lowerLeftY) || this.board.getState(lowerLeftX, lowerLeftY) === playerColor)) {
        while(this.board.getState(lowerLeftX, lowerLeftY) === opponentColor) {
          if(this.board.isOutside(lowerLeftX, lowerLeftY)) {
            break;
          }

          lowerLeftX--;
          lowerLeftY++;
        }
        if(this.board.getState(lowerLeftX, lowerLeftY) === playerColor){
          return true;
        }
      }
      return false;
    }

    // 左方向の判定
    judegeLeft(x, y, playerColor) {
      const opponentColor = this.toggleColor(playerColor);
      let leftX = x - 1;
      let leftY = y;
      if(!(this.board.isOutside(leftX, leftY) || this.board.getState(leftX, leftY) === playerColor)) {
        while(this.board.getState(leftX, leftY) === opponentColor) {
          if(this.board.isOutside(leftX, leftY)) {
            break;
          }

          leftX--;
        }
        if(this.board.getState(leftX, leftY) === playerColor){
          return true;
        }
      }
      return false;
    }


  }
  
  class Game {
    constructor(board, players) {
      this.players = players;
      this.board = board;
      this.currentPlayer = 'white';
      this.f = [];
      this.setGame();
      this.setPuttableCells(this.currentPlayer);
    }

    setGame() {
      this.board.setProp(3, 3, 'white');
      this.board.setProp(4, 4, 'white');
      this.board.setProp(3, 4, 'black');
      this.board.setProp(4, 3, 'black');
      this.board.render();
    }

    setPuttableCells(playerColor) {
      const puttablelCells = this.players.getPuttableCells(playerColor);
      this.board.setIsPuttable(puttablelCells);
      this.board.resetPuttableCells();
      puttablelCells.forEach(cell => {
        this.board.setPuttableCells(cell.x, cell.y);
      });
      this.activateClickEvent(playerColor);
    }

    activateClickEvent(playerColor) {
      
      for(let i=0; i<8; i++) {
        this.f[i] = [];
        for(let j=0; j<8; j++) {
          this.f[i][j] = () => {
            if(this.board.getIsPuttable(j, i)) {
              this.removeListenerAll();
              this.board.putOthello(j, i, playerColor);
              this.board.reversi(j, i, playerColor, this.players);
              this.changePlayer();
              this.showCurrentPlayer();
              this.showScores();
              console.log(this.board.cellsProps);
              this.setPuttableCells(this.currentPlayer);
            }
          }
          this.board.getEl(j, i).addEventListener('click', this.f[i][j]);
        }
      }
    }

    changePlayer() {
      this.currentPlayer = this.players.toggleColor(this.currentPlayer);
    }

    removeListenerAll() {
      for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
          this.board.getEl(j, i).removeEventListener('click', this.f[i][j]);
        }
      }
    }
    
    showCurrentPlayer() {
      document.getElementById('currentPlayerSpan').textContent = this.currentPlayer.toUpperCase();
      const color = this.currentPlayer;
      document.getElementById('currentPlayer').style.color = color;
    }

    showScores() {
      let whiteScore = 0;
      let blackScore = 0;
      for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
          const color = this.board.getState(j, i);
          if(color === 'white') {
            whiteScore++;
          }else if(color === 'black') {
            blackScore++;
          }
        }
      }
      document.getElementById('whiteScore').textContent = String(whiteScore);
      document.getElementById('blackScore').textContent = String(blackScore);
    }
  }

  const board = new Board();
  const players = new Players(board);
  new Game(board, players);

}