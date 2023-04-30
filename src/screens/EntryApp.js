import Button from "../components/Button/Button";
import "../styles/entryApp/entryApp.css";
import { Component } from "react";
import Input from "../components/Input/Input";
import { Player } from "@lottiefiles/react-lottie-player";
import plane from "../assets/animations/plane.json";
import planeChoice from "../assets/animations/planeChoice.json";
import helicopter from "../assets/animations/helicopter.json";
import cloud from "../assets/animations/cloud.json";
import { motion, AnimatePresence } from "framer-motion";
import leaderboard from "../render/leaderboard";

class EntryApp extends Component {
  constructor(props) {
    super(props);

    this.matrix = [
      [0, -1, 1],
      [1, 0, -1],
      [-1, 1, 0],
    ];

    //carta = 0
    //forbice = 1
    //sasso = 2
    this.userInput = null;
    this.cpuInput = null;
    this.turnResults = [];

    this.userName = null;

    this.cpuWinsCount = 0;
    this.userWinsCount = 0;
    this.tieCount = 0;
    this.userScore = 0;

    this.storageObj = {
      games: [],
    };

    if (!JSON.parse(localStorage.getItem("games"))) {
      localStorage.setItem("games", JSON.stringify(this.storageObj));
    } else {
      this.storageObj = JSON.parse(localStorage.getItem("games"));
    }

    this.state = {
      userWinsCount: this.userWinsCount,
      cpuWinsCount: this.cpuWinsCount,
      winner: "tie",
      userPlane: false,
      userCloud: false,
      userHelicopter: false,
      cpuPlane: false,
      cpuCloud: false,
      cpuHelicopter: false,
      toggle: false,
      result: null,
      gameResult: false,
      leaderboard: structuredClone(this.storageObj),
      toggleTurnResult: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    console.log(this.storageObj);
  }

  componentWillUnmount() {}

  updateInput = (e) => {
    this.userName = e.target.value;
  };

  userLogin = () => {
    if (!this.userName) return;
    if (!this.storageObj.games.find((item) => item.name === this.userName)) {
      this.storageObj.games.push({ name: this.userName, score: 0 });
    }
    console.log(this.storageObj);
    this.setState({
      toggle: true,
    });
  };

  calcResult = () => {
    this.turnResults.push(this.matrix[this.userInput][this.cpuInput]);
  };

  storeResult() {
    localStorage.setItem("games", JSON.stringify(this.storageObj));
    //this.setState({ leaderboard: structuredClone(this.storageObj) });
  }

  handleTurn = (e) => {
    let userChoiceObj = {
      userCloud: false,
      userPlane: false,
      userHelicopter: false,
    };
    let cpuChoiceObj = {
      cpuCloud: false,
      cpuPlane: false,
      cpuHelicopter: false,
    };
    let scoreToggle = false;
    let winner = this.state.winner;

    this.userInput = parseInt(e.target.dataset.buttonInput);
    this.cpuInput = Math.floor(Math.random() * 3);

    switch (this.userInput) {
      case 0:
        userChoiceObj.userCloud = true;
        break;
      case 1:
        userChoiceObj.userHelicopter = true;
        break;
      case 2:
        userChoiceObj.userPlane = true;
        break;

      default:
        console.log("error");
        break;
    }

    switch (this.cpuInput) {
      case 0:
        cpuChoiceObj.cpuCloud = true;
        break;
      case 1:
        cpuChoiceObj.cpuHelicopter = true;
        break;
      case 2:
        cpuChoiceObj.cpuPlane = true;
        break;

      default:
        console.log("error");
        break;
    }

    this.calcResult();

    console.log(this.userInput, this.cpuInput, this.turnResults);

    if (this.turnResults[this.turnResults.length - 1] === 1)
      this.userWinsCount++;
    if (this.turnResults[this.turnResults.length - 1] === -1)
      this.cpuWinsCount++;
    if (this.turnResults[this.turnResults.length - 1] === 0) this.tieCount++;

    if (this.turnResults.length === 3) {
      if (this.userWinsCount > this.cpuWinsCount) {
        console.log("user wins");
        this.userScore += 150;
        winner = this.userName + " wins, +150";
      } else if (this.userWinsCount < this.cpuWinsCount) {
        this.userScore -= 50;
        console.log("cpu wins");
        winner = "CPU wins, -50";
      } else {
        console.log("tie");
        winner = "Tie";
      }

      let index = null;
      for (let i = 0; i < this.storageObj.games.length; i++) {
        if (this.storageObj.games[i].name === this.userName) {
          index = i;
          break;
        }
      }
      scoreToggle = true;

      this.storageObj.games[index].score += this.userScore;
      //console.log(this.storageObj.games[index].score);
      this.storageObj.games.sort(({ score: a }, { score: b }) => b - a);
      this.storeResult();

      this.cpuWinsCount = 0;
      this.userWinsCount = 0;
      this.tieCount = 0;
      this.userScore = 0;
      this.turnResults = [];
    }

    this.setState({
      cpuWinsCount: this.cpuWinsCount,
      userWinsCount: this.userWinsCount,
      winner: winner,
      userHelicopter: userChoiceObj.userHelicopter,
      userCloud: userChoiceObj.userCloud,
      userPlane: userChoiceObj.userPlane,
      cpuHelicopter: cpuChoiceObj.cpuHelicopter,
      cpuCloud: cpuChoiceObj.cpuCloud,
      cpuPlane: cpuChoiceObj.cpuPlane,
      leaderboard: structuredClone(this.storageObj),
      toggleTurnResult: scoreToggle,
    });
  };

  render() {
    return (
      <>
        <AnimatePresence>
          {!this.state.toggle && (
            <motion.div
              className="game-container"
              initial={{ opacity: 0.01 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeIn",
              }}
              exit={{ opacity: 0 }}
            >
              <Player autoplay={true} loop={true} src={plane} />
              <Input
                containerStyle="login-container"
                inputType="text"
                placeHolder="username"
                inputStyle="input-text-style"
                handleInputTask={this.updateInput}
                handleBtnTask={this.userLogin}
                required="required"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {this.state.toggle && (
            <motion.div
              className="game-container"
              initial={{ opacity: 0.01 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeIn",
                delay: 0.4,
              }}
            >
              <div className="main-screen">
                <div className="turn-counter">
                  {!this.state.toggleTurnResult && (
                    <>
                      <div className="turn-cpu-counter">
                        <p>{this.userName}: </p>
                        <p className="cpu-counter-text">
                          {this.state.userWinsCount}
                        </p>
                      </div>
                      <div className="turn-user-counter">
                        <p>CPU: </p>
                        <p className="user-counter-text">
                          {this.state.cpuWinsCount}
                        </p>
                      </div>
                    </>
                  )}
                  {this.state.toggleTurnResult && (
                    <>
                      <div className="turn-winner">
                        <p className="winner-display-text">
                          {this.state.winner}{" "}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="choice cpu-choice">
                  {this.state.cpuPlane && (
                    <Player
                      className="item-choose"
                      src={planeChoice}
                      autoplay={true}
                      loop={true}
                    />
                  )}
                  {this.state.cpuCloud && (
                    <Player
                      className="item-choose"
                      src={cloud}
                      autoplay={true}
                      loop={true}
                    />
                  )}
                  {this.state.cpuHelicopter && (
                    <Player
                      className="item-choose"
                      src={helicopter}
                      autoplay={true}
                      loop={true}
                    />
                  )}
                </div>
                <div className="choice user-choice">
                  {this.state.userPlane && (
                    <Player
                      className="item-choose"
                      src={planeChoice}
                      autoplay={true}
                      loop={true}
                    />
                  )}
                  {this.state.userCloud && (
                    <Player
                      className="item-choose"
                      src={cloud}
                      autoplay={true}
                      loop={true}
                    />
                  )}
                  {this.state.userHelicopter && (
                    <Player
                      className="item-choose"
                      src={helicopter}
                      autoplay={true}
                      loop={true}
                    />
                  )}
                </div>
              </div>
              <div className="button-container">
                <Button
                  isAnimated={true}
                  label="Cloud"
                  buttonType="game-button"
                  buttonInput="0"
                  handleTask={this.handleTurn}
                />
                <Button
                  isAnimated={true}
                  label="Helic"
                  buttonType="game-button"
                  buttonInput="1"
                  handleTask={this.handleTurn}
                />
                <Button
                  isAnimated={true}
                  label="Plane"
                  buttonType="game-button"
                  buttonInput="2"
                  handleTask={this.handleTurn}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {leaderboard(this.state)}
      </>
    );
  }
}

export default EntryApp;
