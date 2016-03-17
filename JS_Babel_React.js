var Gameboard = React.createClass({
  render: function(){
    var cols = [];
    for(var i=0; i<30; i++){
      cols.push(<Col />);
    }
    return (
      <div className="gameboard">
        {cols}
      </div>
    );
  }
});

var Col = React.createClass({
  render: function(){
    var rows = [];
    for(var i=0; i<30; i++){
      rows.push(<div className="square" />);
    }
    return (
      <div className="column">
        {rows}
      </div>
    );
  }
});

React.render(<Gameboard />, document.getElementById("container"));
