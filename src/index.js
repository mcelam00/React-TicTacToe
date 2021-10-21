import React from 'react'; //importamos React
import ReactDOM from 'react-dom'; //importamos el modelo DOM
import './index.css'; //importamos el archivo css dentro de este mismo directorio

//ES UN DISEÑO POR COMPONENTES AISLADAS
/*
class Square extends React.Component { //Square es una componet class o componet type. toma parámetros que se llaman propiedades y retorna una jerarquía de vistas que se muestran a través del método render
   render() { //el método render retorna un elemento de tipo react que será una descripcion de lo que se renderiza
      en éste caso la descripcion de lo que se renderiza es un boton que pertenece a la clase css square
        return (
        <button className="square"> 
          {Aqui va el texto del boton, que será lo que venga en el parametro que se le pasa this.props.value} 
        </button>
     );
    }
  }
*/
/*  Most React developers use a special syntax called “JSX” which makes these structures easier to write. The <div /> syntax is transformed at build time to React.createElement('div')*/
/*  return React.createElement("button", {className: "square"});*/

/*Este diseño por componentes, hace que, siendo Square una componente definida por nosotros que renderiza a su vez solamente una componente del modelo DOM como es un botón, podemos referirnos ahora a <Square /> y estaremos usando nuestra componente con todo lo que tenga dentro como si fuera una del DOM. Encapsulación*/ 

/*
//Tenemos tres componentes. Ésta renderiza 9 componentes de la anterior
  class Board extends React.Component {
    renderSquare(i) { //"método" que retorna la componente anterior. Retorna un boton
      return <Square value={i} />; //le paso la propiedad value a la componente de arriba
    }
  
    render() {
      const status = 'Next player: X'; //Defino ésta constante, mejor que escribirlo directamente en el div
  
      return (//llamamos, 3 veces por fila del tablero al metodo de arriba
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  //En cada fila del tablero se cargan 3 botones por cada fila dentro de los div que conforman el tablero a los que les paso como parámetro un número que será el texto que tengan
  //Hemos pasado una propiedad desde el tablero a la hija casilla, así es como la info pasa en react de parents a childs
*/
/*
  //La última componente renderiza una anterior
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{}</div>
            <ol>{}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
*/




  /*FILL THE SQUARE WITH X WHEN CLICK*/
  class Casilla extends React.Component { 

    //Añadimos un constructor
    constructor(properties){
        super(properties) //llama al padre, a la superclase y le pasa las ppiedades (siempre debe ser así)
        this.state = {
            value: null, //inializamos el estado de la componente
        };
    }
    //en lugar del número que se pasa como parámetro, ahora vamos a poner en el texto del botón el estado de la componente, y es llamar al state y dentro al value como en un json
    //en el evento onClick tenemos que cambiar el estado, para que al pinchar el boton ya no sea null sino cambie a una X
    render() { 
        return (//añadimos un evento al boton onclick para que ejecute la funcion y se pinte por consola que estamos picando
       /* <button className="square" onClick={function(){console.log('estoy picando'); this.setState({value: 'X'})}}> Aquí da error por el ámbito del this, que no referencia a la componente y hay que usar funciones flecha*/
        /*<button className="square" onClick={() => {console.log('estoy picando'); this.setState({value: 'X'});}}>*/
        /*leemos el parametro value que nos viene que es el null del array y cuando piquemos en la casilla tenemos que leer la otra propiedad que nos viene del padre que es una funcion que tiene dentro una llamada a una funcion en el padre*/
        <button className="square" onClick={() => {console.log('estoy picando'); this.setState({value: 'X'}); this.props.actualizarVal()}}> 
        {/*this.props.value*//*this.state.value*/this.props.value} 
        </button>
      );
    }
  }

  /*Al llamar a setState, conforme picamos un boton estamos obligando a renderizar de nuevo la componente Square y las componentes hijas dentro de ella*/

  /*Notice how with onClick={() => console.log('click')}, we’re passing a function as the onClick prop. React will only call this function after a click. Forgetting () => and writing onClick={console.log('click')} is a common mistake, and would fire every time the component re-renders.*/


  class Board extends React.Component {

    constructor(properties){
        super(properties)
        this.state={
            valorCasillas: Array(9).fill(null),
            jugador1: true
        }


    }
    //We’ll set the first move to be “X” by default.
    actualizarValorCasilla(i){

        const tablero = this.state.valorCasillas
        if(this.state.jugador1 === true){ //se trata de su turno
            tablero[i] = "X"
            this.setState({jugador1: false})  //le pasamos el turno al jugador2 (dejamos el turno del 1 en falso)
        }else{ //es el turno del jugador 2
            tablero[i] = "O"
            this.setState({jugador1: true}) //le pasa el turno al 1
        }
                
        this.setState({valorCasillas:tablero})


    }

    jugador(){
        var jugador = ""

        if(this.state.jugador1 === true){
            jugador = "Jugador1"
        }else{
            jugador = "Jugador2"
        }

        return jugador
    }


    renderCasilla(i) { //"método" que retorna la componente anterior. Retorna un boton
      return <Casilla value={this.state.valorCasillas[i]} actualizarVal={()=> {this.actualizarValorCasilla(i)}} />; //pasamos el valor que cargará el botón y una función flecha que es una llamada a una función de esta componente
    }
  
    render() {
      //const status = 'Next player: X'; //Defino ésta constante, mejor que escribirlo directamente en el div
      const status = 'Next player: '+ this.jugador();

      const ganador = calculateWinner(this.state.valorCasillas); //le pasamos el tablero para que verifique y nos retorna nulo si sigue el juego (xq se ejecuta constantemente), X u O si ha ganado uno 
        console.log(ganador)
      
        let estadoDelJuego = "Sigue el Juego"

    if(ganador === "X"){

         estadoDelJuego = "Ha ganado el Jugador 1"
      }else if(ganador === "O"){

        estadoDelJuego = "Ha ganado el Jugador 2"
      }


      return (//llamamos, 3 veces por fila del tablero al metodo de arriba
        <div>
          <div className="status">{status}</div>
          <div className="status">{estadoDelJuego}</div>
          <div className="board-row">
            {this.renderCasilla(0)}
            {this.renderCasilla(1)}
            {this.renderCasilla(2)}
          </div>
          <div className="board-row">
            {this.renderCasilla(3)}
            {this.renderCasilla(4)}
            {this.renderCasilla(5)}
          </div>
          <div className="board-row">
            {this.renderCasilla(6)}
            {this.renderCasilla(7)}
            {this.renderCasilla(8)}
          </div>
        </div>
      );
    }
  }

  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  /*Todo ésto de las componentes es para no tener que poner el button varias veces, sino que se declara en una componente mas pequeña que es llamada por una mas grande que es el tablero compuesto de muchas de ellas*/
  /*Si una componente no tiene su propio estado puede escribirse de una forma mas simple, la clase casilla, que su estado ahora no se usa, podría ponerse así
  function Casilla(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}  

Instead of defining a class which extends React.Component, we can write a function that takes props as input and returns what should be rendered. Como ya no es una clase se puede quitar el this.
  */

/*FUNCION QUE CALCULA EL GANADOR*/
function calculateWinner(valorCasillas) {
    const lines = [ //teniendo en cuenta que nuestro tablero es un array de 9 posiciones, si la pos 0, 1, 2 es marcada sería un 3 en raya (la primera fila)
      [0, 1, 2],
      [3, 4, 5], //segunda fila
      [6, 7, 8], //tercera fila
      [0, 3, 6], //primera col
      [1, 4, 7], //segunda col
      [2, 5, 8], //tercera col
      [0, 4, 8], //diagonal principal
      [2, 4, 6], //diagonal segundaria
    ];
    for (let i = 0; i < lines.length; i++) { //recorremos el vector de soluciones (combinaciones ganadoras)
      const [a, b, c] = lines[i]; //cogemos una de las soluciones ej [0,1,2]
      if (valorCasillas[a] && valorCasillas[a] === valorCasillas[b] && valorCasillas[a] === valorCasillas[c]) { //si el tablero en la posicion 0 no es vacio, en la 0 hay lo mismo que en la 1 y en la 0 hay lo mismo que en la 2 -> en las tres hay lo mismo y tres en raya
        return valorCasillas[a]; //retorna lo que hay escrito -> X o bien O
      }
    }
    return null; //si no hay tres en raya pues seguimos jugando
  }


  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  