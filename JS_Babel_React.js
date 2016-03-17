var Gameboard = React.createClass({
  click: function(col, row){
    this.props.squareClick(col, row);
  },
  render: function(){
    var cols = [];
    for(var i=0; i<30; i++){
        cols.push(<Col colNum={i} curBoard={this.props.board} squareClick={this.click} />);
    }
    return (
      <div className="gameboard">
        {cols}
      </div>
    );
  }
});

var Col = React.createClass({
  click: function(row) {
    this.props.squareClick(this.props.colNum, row);
  },
  render: function(){
    var rows = [];
    for(var i=0; i<30; i++){
      if(this.props.curBoard[this.props.colNum][i]===0){
        rows.push(<div onClick={this.click.bind(null, i)} className="square" />);
      }else{
        rows.push(<div onClick={this.click.bind(null, i)} className="square alive" />);
      }
    }
    return (
      <div className="column">
        {rows}
      </div>
    );
  }
});

var Controls = React.createClass({
  play: function(){
    this.props.playClicked();
  },
  reset: function(){
    this.props.resetClicked();
  },
  clear: function(){
    this.props.clearClicked();
  },
  render: function(){
    return (
      <div className="controls">
        <button className="play" onClick={this.play}>{this.props.playBtnText}</button>
        <button className="reset" onClick={this.reset}>Reset</button>
        <button className="clear" onClick={this.clear}>Clear</button>
        <p className="gen-count">Generations: {this.props.genNum}</p>
      </div>
    );
  }
});

var Container = React.createClass({
  getInitialState: function(){
    return {mounted: false, playing: false, playText: "Play", board: this.getEmptyBoard(), generations: 0};
  },
  componentDidMount: function(){
    this.setState({mounted: true});
    this.resetClick();
    this.playClick();
  },
  getEmptyBoard: function(){
    var board = [];
    for(var i=0; i<30; i++){
      var col = [];
      for(var j=0; j<30; j++){
        col.push(0);
      }
      board.push(col);
    }
    return board;
  },
  nextStep: function(){
    var nextBoard = [];
    for(var i=0; i<30; i++){
      var col = [];
      for(var j=0; j<30; j++){
        col.push(this.checkSquare(i,j));
      }
      nextBoard.push(col);
    }
    var gen = this.state.generations + 1;
    this.setState({board: nextBoard, generations: gen});
  },
  checkSquare: function(col, row){
    var grid = this.state.board;
    var alive = (grid[col][row] === 1);
    var counter = 0;
    for(var i=col-1; i<=col+1; i++){
      for(var j=row-1; j<=row+1; j++){
        if(i > -1 && i < 30 && j > -1 && j < 30 && !(i===col && j===row)){
          if(grid[i][j] === 1){
            counter++;
          }
        }
      }
    }
    if(alive){
      return (counter === 2 || counter === 3) ? 1 : 0;
    }else{
      return (counter === 3) ? 1 : 0;
    }
  },
  playClick: function(){
    if(this.state.playing){
      clearInterval(this.timer);
      this.setState({playText: "Play", playing: false});
    }else{
      this.timer = setInterval(this.nextStep, 500);
      this.setState({playText: "Pause", playing: true});
    }
  },
  resetClick: function(){
    var newBoard = [];
    for(var i=0; i<30; i++){
      var col = [];
      for(var j=0; j<30; j++){
        col.push(Math.round(Math.random()));
      }
      newBoard.push(col);
    }
    this.setState({board: newBoard, generations: 0});
  },
  clearClick: function(){
    this.setState({board: this.getEmptyBoard()});
  },
  markSquare: function(col, row){
    var updatedBoard = this.state.board;
    if(updatedBoard[col][row] === 0){
      updatedBoard[col][row] = 1;
    }else{
      updatedBoard[col][row] = 0;
    }
    this.setState({board: updatedBoard});
  },
  render: function(){
    return (
      <div className="conatiner">
        <Gameboard board={this.state.board} squareClick={this.markSquare} />
        <Controls playClicked={this.playClick} resetClicked={this.resetClick} clearClicked={this.clearClick} playBtnText={this.state.playText} genNum={this.state.generations} />
      </div>
    );
  }
});

React.render(<Container />, document.getElementById("container"));
